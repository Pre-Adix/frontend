# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar el archivo de configuración de dependencias
COPY pnpm-lock.yaml ./

# Instalar dependencias con pnpm (más rápido y eficiente)
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN pnpm run build

# Etapa 2: Producción
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Instalar pnpm globalmente (en la etapa de producción)
RUN npm install -g pnpm

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/.next /app/public /app/node_modules /app/

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["pnpm", "start"]
