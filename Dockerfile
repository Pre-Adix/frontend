# Etapa 1: Construcción (build stage)
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalamos pnpm de manera global
RUN npm install -g pnpm

# Instalar las dependencias con pnpm
RUN pnpm install --frozen-lockfile

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN pnpm build

# Etapa 2: Producción (production stage)
FROM node:18-alpine AS production

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiar el package.json y pnpm-lock.yaml del contenedor de construcción
COPY package.json pnpm-lock.yaml ./

# Instalamos pnpm globalmente también en la etapa de producción
RUN npm install -g pnpm

# Instalar solo las dependencias de producción
RUN pnpm install --frozen-lockfile --prod

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exponer el puerto en el que la app se ejecutará
EXPOSE 3000

# Comando para iniciar la app
CMD ["pnpm", "start"]
