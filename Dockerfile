# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY server/package*.json ./
COPY server/prisma ./prisma
COPY server/tsconfig.json ./
COPY server/src ./src

# Install dependencies (including dev) for TypeScript compilation
RUN npm ci
RUN npx prisma generate
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Create persistent data directory for SQLite
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL="file:/app/data/dev.db"

# Copy package files for production install
COPY server/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client in production
RUN npx prisma generate

EXPOSE 3001

# Run migrations then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
