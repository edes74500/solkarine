FROM node:22-alpine as builder
RUN apk add --no-cache python3 make g++ git
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /repo

# Copier tout le projet
COPY . .

ENV NODE_ENV=development
# Installer toutes les dépendances
RUN pnpm install

# Build le backend avec turbo
RUN pnpm turbo build --filter=backend

FROM node:22-alpine as runner
RUN apk add --no-cache chromium nss freetype harfbuzz ttf-freefont
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier la structure du workspace pour la production
COPY --from=builder /repo/pnpm-workspace.yaml ./
COPY --from=builder /repo/package.json ./
COPY --from=builder /repo/pnpm-lock.yaml ./

# Copier les packages buildés avec leurs package.json
COPY --from=builder /repo/packages ./packages

# Copier l'app backend buildée
COPY --from=builder /repo/apps/backend/dist ./apps/backend/dist
COPY --from=builder /repo/apps/backend/package.json ./apps/backend/

# Installer SEULEMENT les dépendances de production du workspace
ENV NODE_ENV=production
RUN pnpm install --prod --frozen-lockfile

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PORT=5000 

EXPOSE 5000

# Lancer depuis le dossier backend
WORKDIR /app/apps/backend
CMD ["node", "dist/index.js"]