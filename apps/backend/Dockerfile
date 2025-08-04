# ----------------------------
# 1) STAGE “builder”
# ----------------------------
FROM node:22-alpine AS builder

# 1.1 Déps de build (TS natif, compilations C/C++, git pour turborepo)
RUN apk add --no-cache python3 make g++ git

# 1.2 Corepack + pnpm
RUN corepack enable \
 && corepack prepare pnpm@latest --activate

WORKDIR /repo

# 1.3 Copier les manifests pour le cache de layer
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

# 1.4 Installer toutes les dépendances du monorepo
RUN pnpm install --frozen-lockfile

# 1.5 Copier le code source complet
COPY . .

# 1.6 Compiler le backend (ou tout le repo si tu préfères)
WORKDIR /repo
RUN pnpm --filter backend run build
# ou, pour ne builder que backend :
# RUN pnpm --filter backend run build



# 2) STAGE “runner”
# ----------------------------
FROM node:22-alpine AS runner

# 2.1 Chromium + libs système pour Puppeteer
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ttf-freefont

# 2.2 Corepack + pnpm (pour installer les deps prod)
RUN corepack enable \
 && corepack prepare pnpm@latest --activate

WORKDIR /app

# 2.3 Copier les manifests pour installer prod seulement
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

# 2.4 Copier le build de votre backend
COPY --from=builder /repo/apps/backend/dist ./dist

# 2.5 Installer uniquement les dépendances de prod du package "backend"
RUN pnpm install --prod --frozen-lockfile --filter backend

# 2.6 Variables d’environnement pour Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PORT=5000

EXPOSE 5000

# 2.7 Démarrage de l’app
CMD ["node", "dist/index.js"]
