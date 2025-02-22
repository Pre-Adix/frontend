# Etapa 1: Construcción (Build Stage)
FROM node:18-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (o pnpm-lock.yaml si usas pnpm) 
# para instalar las dependencias antes de copiar el resto del código, 
# aprovechando el cache de Docker para acelerar la reconstrucción en futuros builds.
COPY package*.json ./

# Instala las dependencias en la fase de construcción
RUN npm install --legacy-peer-deps --frozen-lockfile 

# Copia el resto del código fuente
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Etapa 2: Producción (Production Stage)
FROM node:18-alpine AS production

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos relevantes de la etapa de construcción
COPY --from=build /app/package*.json ./

# Copia la carpeta .next generada y los otros archivos necesarios para la producción
COPY --from=build /app/.next ./

# Instala solo las dependencias de producción
RUN npm install --only=production --frozen-lockfile

# Exponer el puerto en el que Next.js ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "start"]
