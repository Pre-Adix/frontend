# Use official Node.js image as the base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install the dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port on which the app will run
EXPOSE 3000

# Command to start the Next.js app
CMD ["pnpm", "start"]
