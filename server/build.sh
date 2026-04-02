#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm install

echo "📦 Generating Prisma Client..."
npx prisma generate

echo "🔨 Building TypeScript..."
npm run build

echo "✅ Build complete!"