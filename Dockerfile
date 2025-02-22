# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Instalar PNPM globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos necesarios
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN pnpm build

# Eliminar dependencias de desarrollo
RUN pnpm prune --prod

# Etapa 2: Producción
FROM node:18-alpine

# Establecer un usuario no root por seguridad
RUN addgroup --system app && adduser --system --group app
USER app

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos desde la etapa de construcción
COPY --from=builder --chown=app:app /app/package.json ./
COPY --from=builder --chown=app:app /app/.next .next
COPY --from=builder --chown=app:app /app/public public
COPY --from=builder --chown=app:app /app/node_modules node_modules

# Exponer el puerto que usa Railway
EXPOSE 3000

# Comando para iniciar la app
CMD ["pnpm", "start"]
