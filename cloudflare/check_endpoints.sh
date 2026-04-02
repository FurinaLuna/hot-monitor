#!/usr/bin/env bash
set -e

echo "# Railway direct (primary)"
curl -i https://hot-monitor-production.up.railway.app/api/health || true

echo "\n# Railway alternate (old)"
curl -i https://zcw-hot-monitor-prod.up.railway.app/api/health || true

echo "\n# Worker preview"
curl -i https://odd-dew-ed94.2517523791.workers.dev/api/health || true

echo "\n# Custom domain (Cloudflare)"
curl -i https://hotmonitorapi.furinaluna.top/api/health || true
