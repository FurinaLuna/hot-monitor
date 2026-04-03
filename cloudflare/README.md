部署 Cloudflare Worker（反向代理）说明

概览
- 使用 `cloudflare/worker.js` 作为 Worker 源码，支持 CORS、OPTIONS 与 API 转发。

你需要在 Cloudflare 控制台完成的步骤（3 分钟内完成）
1. 登录 Cloudflare 控制台 → Workers & Pages → Workers。
2. 创建或打开你的 Worker（例如 `hot-monitor-api-proxy`）。
3. 将 `cloudflare/worker.js` 的全部内容粘贴到编辑器中，**替换**现有代码。
4. 在 Worker Variables 中添加：
   - `FRONTEND_ORIGIN=https://frontend.your-domain.com`
   - `RAILWAY_BACKEND_URL=https://your-service.up.railway.app`
5. 点击 **Save / Deploy**（或 Save & Deploy），等待部署成功。
6. 绑定自定义域名：在 Worker -> Triggers -> Custom domains（或域和路由）添加 `api.your-domain.com` 并保存。

在 Vercel 中更新前端环境变量（以连接代理）
1. 登录 Vercel 控制台 → 选择项目 → Settings → Environment Variables。
2. 将或创建变量：
   - `VITE_API_BASE_URL = https://api.your-domain.com`
   - `VITE_SOCKET_URL = https://api.your-domain.com`
3. 保存，Vercel 会触发一次部署。

快速验证（在本地终端运行）
```bash
# Railway 直连
curl -i https://your-service.up.railway.app/api/health

# Worker 预览（替换为你的 preview host）
curl -i https://your-worker-name.your-subdomain.workers.dev/api/health

# 自定义域名（Cloudflare）
curl -i https://api.your-domain.com/api/health
```
期望返回：HTTP/1.1 200 和 JSON：`{"status":"ok","timestamp":"..."}`

常见问题
- 如果自定义域名返回 404：检查 Worker 的 Custom Domain 是否已绑定并启用（另外等待 DNS 生效 5-15 分钟）。
- 如果返回 502：检查 Railway 是否在线与 `DATABASE_URL` 等变量是否正确。

如果你希望，我可以把 `cloudflare/worker.js` 的内容直接粘到你当前打开的 Cloudflare 编辑器页面（你只需在控制台点击粘贴并部署）。

文件位置：
- `cloudflare/worker.js`（Worker 源码）
- `cloudflare/README.md`（本文件）
- `cloudflare/check_endpoints.sh`（辅助检测脚本）
