# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY server/package*.json ./
COPY server/prisma ./prisma
COPY server/tsconfig.json ./
COPY server/src ./src

# Install dependencies and build
RUN npm ci --omit=dev
RUN npx prisma generate
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy .env if needed for runtime
ENV NODE_ENV=production

# Copy built application and dependencies from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY server/package*.json ./

# Generate Prisma client in production
RUN npx prisma generate

EXPOSE 3001

CMD ["node", "dist/index.js"]
