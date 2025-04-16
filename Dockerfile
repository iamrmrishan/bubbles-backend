# Use specific Node.js version
FROM node:22.13.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy and install only production dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the application
COPY . .

# Build the NestJS app
RUN npm run prebuild && npm run build

# Use a smaller image for production
FROM node:22.13.0-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose app port
EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]

