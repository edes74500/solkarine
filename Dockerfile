# ---------- 1) PRUNE : extraire uniquement ce que le backend utilise ----------
FROM node:22-alpine AS pruner
RUN apk add --no-cache git
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo prune --scope=backend --docker

# ---------- 2) BUILD ----------
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++ git
ENV PNPM_HOME=/root/.local/share/pnpm
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /repo

# Manifests prunés -> maximise le cache d'install
COPY --from=pruner /repo/out/json/ ./
ENV NODE_ENV=development

# Cache du store pnpm (BuildKit)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

# Code pruné + build (avec cache turbo)
COPY --from=pruner /repo/out/full/ ./
RUN --mount=type=cache,target=/root/.cache/turbo \
    pnpm turbo build --filter=backend

# Bundle minimal prod-only pour le backend
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

# user non-root (Puppeteer OK avec sandbox)
RUN useradd -m appuser
USER appuser

EXPOSE 5000
CMD ["node", "dist/index.js"]
