# 🔥 Hot Monitor

> AI 热点监控系统：多源抓取、智能判真、实时推送、可视化追踪

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-19.2-61dafb.svg)](https://reactjs.org)

## 在线地址
- 在线查看地址：[https://hotmonitorfrontend.furinaluna.top](https://hotmonitorfrontend.furinaluna.top)
- 在线演示：请查看仓库主页的 About 链接或项目发布说明
- API 示例：`https://api.your-domain.com/api/health`

## 项目亮点

- 多数据源聚合抓取：Twitter/X、Bing、Hacker News、搜狗、微博、Bilibili
- AI 内容分析：真假识别、相关性评分、关键词提及判断、摘要生成
- 实时消息推送：Socket.IO 通知新热点和站内提醒
- 关键词订阅监控：按关键词维度聚合热点并实时追踪
- 赛博朋克风 UI：暗色主题、动效卡片、可视化热度指标

## 技术栈

### 前端

- React 19 + Vite + TypeScript
- TailwindCSS + Framer Motion
- Socket.IO Client

### 后端

- Node.js + Express 5 + TypeScript
- Prisma + SQLite
- Socket.IO + node-cron
- OpenRouter SDK + Nodemailer

## 部署方式（2 种）

### 方式 A：云端分离部署（推荐）

```text
Vercel (Frontend)
  └─ 调用 API / WebSocket
     ↓
Cloudflare Worker (反向代理)
  └─ 转发到
     ↓
Railway (Backend API + Socket.IO)
  └─ Prisma + SQLite
```

适用场景：快速上线、自动 CI/CD、低运维成本。  
当前线上即采用该方式。

### 方式 B：Docker 自托管部署

```bash
# 在仓库根目录
docker build -t hot-monitor-server .
docker run -d \
  --name hot-monitor-server \
  -p 3001:3001 \
  -e CLIENT_URL=http://localhost:5173 \
  -e OPENROUTER_API_KEY=your_openrouter_api_key_here \
  -e TWITTER_API_KEY=your_twitter_api_key_here \
  -e DATABASE_URL='file:/app/data/dev.db' \
  -v hot_monitor_sqlite:/app/data \
  hot-monitor-server
```

适用场景：私有化部署、内网部署、单机快速验证后端服务。

## 仓库结构

```text
.
├─ client/        # 前端应用（Vite + React）
├─ server/        # 后端服务（Express + Prisma + Socket.IO）
├─ cloudflare/    # Cloudflare Worker 反向代理脚本
├─ docs/          # 设计与部署文档
└─ skills/        # 辅助脚本与调研能力
```

## 本地开发

### 1) 环境要求

- Node.js >= 18
- npm >= 9

### 2) 安装依赖

```bash
cd server && npm install
cd ../client && npm install
```

### 3) 配置后端环境变量

复制并编辑 `server/.env`：

```env
DATABASE_URL="file:./dev.db"
PORT=3001
CLIENT_URL=http://localhost:5173

OPENROUTER_API_KEY=your_openrouter_api_key_here
TWITTER_API_KEY=your_twitter_api_key_here

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
NOTIFY_EMAIL=notify_to@example.com
```

### 4) 初始化数据库

```bash
cd server
npx prisma generate
npx prisma migrate deploy
```

### 5) 启动服务

```bash
# 终端 1
cd server
npm run dev

# 终端 2
cd client
npm run dev
```

默认访问：

- 前端：http://localhost:5173
- 后端健康检查：http://localhost:3001/api/health

## 生产环境变量建议

### Vercel（前端）

```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_SOCKET_URL=https://api.your-domain.com
```

### Railway（后端）

```env
CLIENT_URL=https://frontend.your-domain.com
```

如有多个前端来源可逗号分隔：

```env
CLIENT_URL=https://frontend.your-domain.com,https://admin.your-domain.com
```

### Cloudflare Worker 反向代理配置步骤

1. 打开 Cloudflare 控制台，进入 Workers & Pages，创建一个 Worker（例如 `hot-monitor-api-proxy`）。
2. 将 [worker.js](file:///d:/项目/zcw-hot-monitor/cloudflare/worker.js) 部署到 Worker。
3. 在 Worker Settings → Variables 添加：
   - `FRONTEND_ORIGIN=https://frontend.your-domain.com`
   - `RAILWAY_BACKEND_URL=https://your-service.up.railway.app`
4. 在 Worker Triggers 绑定自定义域名（例如 `api.your-domain.com`）。
5. 在 Vercel 前端变量中将 `VITE_API_BASE_URL` 与 `VITE_SOCKET_URL` 指向 `https://api.your-domain.com`，然后重新部署。
6. 用以下地址验证：
   - `https://api.your-domain.com/api/health`
   - `https://api.your-domain.com/socket.io/?EIO=4&transport=polling`

## 常见问题

### 1) `Cannot GET /` 是不是后端坏了？

不是。后端只提供 `/api/*` 路由，根路径 `/` 返回 `Cannot GET /` 属于正常现象。  
请用 `/api/health` 验证服务是否存活。

### 2) 浏览器报 WebSocket 404

通常是前端 Socket 地址连到了前端域名，而不是 API 域名。  
请确认前端已配置：

- `VITE_SOCKET_URL=https://api.your-domain.com`
- 重新部署 Vercel

### 3) CORS 报错

请确认后端 `CLIENT_URL` 与真实前端域名一致。

## 路线图

- [x] 多源热点抓取
- [x] AI 相关性与真实性分析
- [x] WebSocket 实时通知
- [x] 生产部署（Vercel + Railway + Cloudflare）
- [ ] 邮件通知策略优化
- [ ] 测试覆盖率提升

## 许可证

MIT License
