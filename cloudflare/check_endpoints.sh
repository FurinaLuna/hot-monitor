#!/usr/bin/env bash
set -e

echo "# Railway direct (primary)"
curl -i https://your-service.up.railway.app/api/health || true

echo "\n# Worker preview"
curl -i https://your-worker-name.your-subdomain.workers.dev/api/health || true

echo "\n# Custom domain (Cloudflare)"
curl -i https://api.your-domain.com/api/health || true
