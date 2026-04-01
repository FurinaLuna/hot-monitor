# 🔥 Hot Monitor

> 一款自动发现热点、智能识别真假内容、实时推送通知的 AI 工具

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-19.2-61dafb.svg)](https://reactjs.org)

## 📸 项目截图

> _赛博朋克风格的现代化 UI，支持暗色主题，实时热点追踪_

## ✨ 核心功能

### 🎯 关键词监控
- 添加自定义关键词进行实时监控
- 当关键词相关内容出现时，利用 AI 自动识别真假内容
- 第一时间发送通知提醒

### 📡 热点收集
- 每 30 分钟自动抓取指定范围内的热点信息
- 多数据源聚合（网页搜索 + Twitter/X）
- AI 分析热点价值和可信度

### 🔔 通知系统
- 浏览器实时推送（WebSocket）
- 邮件通知（SMTP）

### 🤖 AI 分析
- 基于大语言模型的真假内容识别
- 热点相关性评估（0-100分）
- 重要程度分级（低/中/高/紧急）
- 自动生成内容摘要

## 🛠️ 技术栈

### 前端
| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.2 | 现代化 UI 框架 |
| Vite | 7.2 | 极速构建工具 |
| TailwindCSS | 4.x | 原子化 CSS 框架 |
| Framer Motion | 12.x | 动画库 |
| Socket.io Client | 4.8 | 实时通信 |
| Lucide React | 0.563 | 图标库 |

### 后端
| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | 18+ | 运行环境 |
| Express | 5.2 | Web 框架 |
| Prisma | 6.19 | ORM |
| SQLite | - | 轻量级数据库 |
| Socket.io | 4.8 | WebSocket 服务 |
| node-cron | 4.2 | 定时任务 |
| OpenRouter SDK | 0.5 | AI 服务 |
| Nodemailer | 8.0 | 邮件发送 |

## 📁 项目结构

```
hot-monitor/
├── client/                     # 前端应用
│   ├── src/
│   │   ├── components/        # UI 组件
│   │   │   └── ui/            # 通用 UI 组件
│   │   ├── services/          # API 调用 & Socket
│   │   ├── utils/             # 工具函数
│   │   └── lib/               # 工具库
│   └── package.json
├── server/                     # 后端服务
│   ├── src/
│   │   ├── routes/            # API 路由
│   │   │   ├── keywords.ts    # 关键词管理
│   │   │   ├── hotspots.ts    # 热点数据
│   │   │   ├── settings.ts    # 系统设置
│   │   │   └── notifications.ts # 通知管理
│   │   ├── services/          # 业务逻辑
│   │   │   ├── ai.ts          # AI 分析服务
│   │   │   ├── search.ts      # 网页搜索
│   │   │   ├── chinaSearch.ts # 国内搜索源
│   │   │   ├── twitter.ts     # Twitter 服务
│   │   │   └── email.ts       # 邮件服务
│   │   ├── jobs/              # 定时任务
│   │   │   └── hotspotChecker.ts
│   │   └── __tests__/         # 测试文件
│   ├── prisma/                # 数据库 Schema
│   └── package.json
├── docs/                       # 文档
│   ├── README.md              # 项目说明
│   ├── REQUIREMENTS.md        # 需求文档
│   └── LOCAL_SETUP.md         # 本地部署
└── skills/                     # Agent Skills
    └── hot-monitor/
        ├── scripts/           # Python 脚本
        └── references/        # 参考文档
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/FurinaLuna/hot-monitor.git
cd hot-monitor

# 2. 安装后端依赖
cd server
npm install

# 3. 安装前端依赖
cd ../client
npm install

# 4. 配置环境变量
cd ../server
cp .env.example .env
# 编辑 .env 文件填入你的配置

# 5. 初始化数据库
npx prisma migrate dev

# 6. 启动后端服务
npm run dev

# 7. 启动前端（新终端）
cd ../client
npm run dev
```

### 访问地址
- 前端：http://localhost:5173
- 后端 API：http://localhost:3001
- 健康检查：http://localhost:3001/api/health

## ⚙️ 配置说明

创建 `server/.env` 文件：

```env
# 服务配置
PORT=3001
CLIENT_URL=http://localhost:5173

# 数据库
DATABASE_URL="file:./dev.db"

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_key

# Twitter API (twitterapi.io)
TWITTER_API_KEY=your_twitter_api_key

# 邮件通知 (可选)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
NOTIFY_EMAIL=receive@example.com

# 监控配置
MONITOR_INTERVAL=1800000  # 30分钟
```

## 📊 数据模型

### Keyword（关键词）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| text | String | 关键词内容 |
| category | String | 分类 |
| isActive | Boolean | 是否启用 |

### Hotspot（热点）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | String | 标题 |
| content | String | 内容 |
| url | String | 原文链接 |
| source | String | 来源 |
| isReal | Boolean | AI 识别真假 |
| relevance | Int | 相关性评分 |
| importance | String | 重要程度 |
| summary | String | AI 摘要 |

## 🔌 API 接口

### 关键词管理
```
GET    /api/keywords         # 获取所有关键词
POST   /api/keywords         # 添加关键词
PUT    /api/keywords/:id     # 更新关键词
DELETE /api/keywords/:id     # 删除关键词
```

### 热点数据
```
GET    /api/hotspots         # 获取热点列表
GET    /api/hotspots/:id     # 获取热点详情
POST   /api/hotspots/search  # 手动搜索
```

### WebSocket 事件
```
# 客户端 -> 服务端
subscribe      # 订阅关键词
unsubscribe    # 取消订阅

# 服务端 -> 客户端
hotspot:new    # 新热点发现
notification   # 通知消息
```

## 📈 开发进度

- [x] 项目架构设计
- [x] 后端 API 开发
- [x] 数据库设计
- [x] AI 服务集成
- [x] 前端页面开发
- [x] WebSocket 实时推送
- [x] 定时任务调度
- [ ] 邮件通知完善
- [ ] 单元测试覆盖
- [ ] 部署文档

## 📝 开发日志

### 2026-02
- 完成项目初始化
- 实现后端 API 框架
- 集成 OpenRouter AI 服务
- 完成前端赛博朋克风格 UI

### 2026-03
- 优化热点排序算法
- 添加多数据源支持
- 完善 WebSocket 实时推送

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [OpenRouter](https://openrouter.ai/) - AI 服务
- [twitterapi.io](https://twitterapi.io/) - Twitter 数据
- [Prisma](https://www.prisma.io/) - 数据库 ORM

---

**作者**: [FurinaLuna](https://github.com/FurinaLuna)

**项目地址**: [https://github.com/FurinaLuna/hot-monitor](https://github.com/FurinaLuna/hot-monitor)