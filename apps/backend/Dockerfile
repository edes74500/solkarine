FROM node:22-alpine as builder
RUN apk add --no-cache python3 make g++ git
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

# 👇 Ajoute l'installation des deps locales du backend
RUN cd apps/backend && pnpm install --frozen-lockfile

RUN pnpm turbo build --filter=backend

FROM node:22-alpine as runner
RUN apk add --no-cache chromium nss freetype harfbuzz ttf-freefont
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./
COPY --from=builder /repo/apps/backend/dist ./dist
COPY --from=builder /repo/packages ./packages
COPY --from=builder /repo/node_modules ./node_modules
COPY --from=builder /repo/apps/backend ./apps/backend

ENV NODE_ENV=production

RUN pnpm install --prod --frozen-lockfile

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PORT=5000

EXPOSE 5000

CMD ["node", "dist/index.js"]
