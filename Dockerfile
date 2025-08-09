# ---------- 1) PRUNE : extraire uniquement ce que le backend utilise ----------
FROM node:22-alpine AS pruner
RUN apk add --no-cache git
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo prune --scope=backend --docker

# ---------- 2) BUILD ----------
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++ git
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /repo
COPY --from=pruner /repo/out/json/ ./
ENV NODE_ENV=development
RUN pnpm install
COPY --from=pruner /repo/out/full/ ./
RUN pnpm turbo build --filter=backend
RUN pnpm deploy --filter=backend --prod /out

# ---------- 3) RUNNER (prod) ----------
FROM node:22-bookworm-slim AS runner
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-freefont-ttf \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PORT=5000
WORKDIR /app
COPY --from=builder /out/ ./
# user non-root
RUN useradd -m appuser
USER appuser
EXPOSE 5000
CMD ["node", "dist/index.js"]
