# Etapa 1: Builder com dependências completas
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./
RUN npm ci

# Copia o restante da aplicação
COPY . .

# Executa o build com Vite
RUN npm run build


# Etapa 2: Runner com dependências de produção
FROM node:18-alpine AS runner

WORKDIR /app

# Copia apenas os artefatos de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/attached_assets ./attached_assets

# Copia apenas os arquivos de dependência novamente para instalar só as deps de produção
COPY package*.json ./
RUN npm ci --only=production

# Define variáveis de ambiente padrão (opcional)
ENV NODE_ENV=production

# Comando de inicialização
CMD ["node", "dist/index.js"]
