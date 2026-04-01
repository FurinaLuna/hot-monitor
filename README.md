# 🔥 Hot Monitor - AI 热点监控系统

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

一个基于 AI 的实时热点监控与趋势发现系统，支持多数据源采集、智能分析与实时推送

</div>

## 📖 项目简介

**Hot Monitor** 是一个专为 AI 编程博主和科技爱好者设计的实时热点监控系统。它能够自动从 Twitter、Bing 搜索、微博、Bilibili 等 8+ 个数据源采集信息，利用 AI 进行真伪识别和重要性分析，并通过 WebSocket 实时推送和邮件通知，帮助用户第一时间掌握领域内的最新动态。

**实习项目背景**：本项目作为毕业实习项目，完整实现了从前端 UI 到后端服务、从数据采集到 AI 分析的完整技术栈，涵盖了现代 Web 开发的多个关键技术领域。

## ✨ 核心功能

### 🔍 智能监控
- **多关键词管理**：支持添加、编辑、删除监控关键词
- **自动定时抓取**：每 30 分钟自动从多个数据源采集最新信息
- **多数据源支持**：Twitter、Bing、Google、DuckDuckGo、HackerNews、搜狗、Bilibili、微博

### 🤖 AI 智能分析
- **真伪识别**：利用 OpenRouter API (Claude/GPT-4) 识别标题党、假新闻
- **相关性评估**：0-100 分制评估热点与指定领域的相关性
- **重要性分级**：低/中/高/紧急四级重要性评估
- **智能摘要**：自动生成 50 字以内热点摘要

### 📡 实时通知
- **WebSocket 实时推送**：新热点发现时立即推送到前端
- **邮件通知**：通过 SMTP 发送热点通知邮件
- **浏览器推送**：桌面通知提醒
- **通知历史**：查看所有通知记录

### 🎨 现代化界面
- **赛博朋克风格**：霓虹渐变色彩、动态粒子背景
- **响应式设计**：完美适配桌面端和移动端
- **实时数据仪表盘**：直观展示热点统计和趋势
- **暗色主题**：护眼设计，长时间使用不疲劳

## 🛠️ 技术栈

### 前端 (Client)
- **React 19** + **TypeScript**：现代前端开发
- **Vite**：快速的构建工具和开发服务器
- **Tailwind CSS 4**：原子化 CSS 框架
- **Framer Motion**：流畅的动画效果
- **Socket.io Client**：实时通信
- **Lucide React**：现代化图标库

### 后端 (Server)
- **Node.js** + **Express 5**：高性能后端框架
- **TypeScript**：类型安全的服务器端开发
- **Prisma** + **SQLite**：现代化 ORM 和数据库
- **Socket.io**：WebSocket 实时通信
- **OpenRouter SDK**：多模型 AI 服务集成
- **Nodemailer**：邮件发送服务
- **Node-cron**：定时任务调度

### 数据采集 & AI 技能
- **Python 爬虫脚本**：多数据源网页抓取
- **Twitter API 集成**：官方 API 数据获取
- **自定义 AI 技能**：Claude Code Agent Skill 集成
- **多语言支持**：中英文混合内容处理

## 🏗️ 项目结构

```
hot-monitor/
├── client/                    # React 前端应用
│   ├── src/
│   │   ├── components/       # React 组件
│   │   │   ├── ui/          # 可复用 UI 组件（赛博朋克风格）
│   │   │   └── FilterSortBar.tsx
│   │   ├── services/        # API 服务层
│   │   ├── utils/           # 工具函数
│   │   ├── App.tsx          # 主应用组件
│   │   └── main.tsx         # 应用入口
│   ├── public/              # 静态资源
│   └── package.json
│
├── server/                   # Node.js 后端服务
│   ├── src/
│   │   ├── routes/          # Express 路由
│   │   ├── services/        # 业务逻辑服务
│   │   ├── jobs/            # 定时任务
│   │   ├── __tests__/       # 单元测试
│   │   └── index.ts         # 服务器入口
│   ├── prisma/              # 数据库 Schema
│   └── package.json
│
├── skills/                   # Claude Agent 技能
│   └── hot-monitor/
│       ├── scripts/         # Python 数据采集脚本
│       ├── references/      # 参考文档
│       └── SKILL.md         # 技能定义文件
│
├── docs/                    # 项目文档
│   ├── REQUIREMENTS.md      # 需求文档
│   └── API_INTEGRATION.md   # API 集成文档
│
└── README.md               # 项目说明（本文件）
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 或 20+
- Python 3.8+（仅技能脚本需要）
- SQLite（内置，无需额外安装）

### 1. 克隆项目
```bash
git clone https://github.com/FurinaLuna/hot-monitor.git
cd hot-monitor
```

### 2. 后端服务设置
```bash
# 进入 server 目录
cd server

# 安装依赖
npm install

# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，填入必要的 API Key
# OPENROUTER_API_KEY=your_key
# TWITTER_API_KEY=your_key
# SMTP 配置等

# 初始化数据库
npm run db:migrate
npm run db:generate

# 启动开发服务器
npm run dev
```

### 3. 前端应用设置
```bash
# 进入 client 目录（新终端）
cd client

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 4. 访问应用
- 前端：http://localhost:5173
- 后端 API：http://localhost:3001
- Prisma Studio：http://localhost:5555（运行 `npm run db:studio`）

### 5. AI 技能使用（可选）
```bash
# 安装 Python 依赖
pip install requests beautifulsoup4

# 设置环境变量
export TWITTER_API_KEY=your_key

# 运行搜索脚本
python skills/hot-monitor/scripts/search_web.py "AI programming"
```

## ⚙️ 环境变量配置

### 后端环境变量 (.env)
```env
# 服务器配置
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# 数据库
DATABASE_URL="file:./dev.db"

# AI 服务
OPENROUTER_API_KEY=your_openrouter_key

# 数据源 API
TWITTER_API_KEY=your_twitter_api_key

# 邮件通知
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFY_EMAIL=recipient@example.com
```

## 📡 API 文档

### RESTful API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/keywords` | GET | 获取所有监控关键词 |
| `/api/keywords` | POST | 添加新关键词 |
| `/api/keywords/:id` | PUT | 更新关键词 |
| `/api/keywords/:id` | DELETE | 删除关键词 |
| `/api/hotspots` | GET | 获取热点列表（支持分页、过滤、排序） |
| `/api/hotspots/:id` | GET | 获取热点详情 |
| `/api/hotspots/search` | POST | 手动触发热点搜索 |
| `/api/settings` | GET | 获取系统设置 |
| `/api/settings` | PUT | 更新系统设置 |
| `/api/notifications` | GET | 获取通知历史 |
| `/api/health` | GET | 健康检查 |
| `/api/check-hotspots` | POST | 手动触发热点检查 |

### WebSocket 事件

#### 客户端订阅事件
- `subscribe`：订阅关键词通知
- `unsubscribe`：取消订阅关键词

#### 服务端推送事件
- `hotspot:new`：新热点发现
- `hotspot:update`：热点信息更新
- `notification`：通用通知消息

### 数据库 Schema

```prisma
model Keyword {
  id        String    @id @default(uuid())
  text      String    @unique
  category  String?
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  hotspots  Hotspot[]
}

model Hotspot {
  id          String   @id @default(uuid())
  title       String
  content     String
  url         String
  source      String   // twitter, bing, google, etc.
  sourceId    String?
  isReal      Boolean  @default(true)
  relevance   Int      @default(0)
  importance  String   @default("low")
  summary     String?
  viewCount   Int?
  likeCount   Int?
  retweetCount Int?
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  keywordId   String?
  keyword     Keyword? @relation(fields: [keywordId], references: [id])

  @@unique([url, source])
}
```

## 🎯 项目亮点

### 1. 全栈技术实践
- **前后端分离架构**：React + Express 现代化架构
- **类型安全**：TypeScript 全栈覆盖，减少运行时错误
- **实时通信**：WebSocket 双向实时数据推送
- **自动化任务**：Node-cron 定时调度系统

### 2. AI 深度集成
- **多模型支持**：通过 OpenRouter 集成 Claude、GPT-4、Gemini 等模型
- **智能分析流水线**：自动化的内容真伪识别、相关性评估、重要性分级
- **Prompt 工程**：精心设计的系统提示词，确保分析准确性

### 3. 多数据源融合
- **国际+国内覆盖**：Twitter、Bing、微博、Bilibili 等 8+ 数据源
- **智能去重**：基于 URL 和内容的重复检测
- **频率控制**：自适应请求频率，避免被封禁

### 4. 现代化 UI/UX
- **赛博朋克设计语言**：独特的视觉风格和交互体验
- **响应式布局**：完美适配各种屏幕尺寸
- **流畅动画**：Framer Motion 实现的细腻交互动效
- **暗色主题**：符合开发者使用习惯

### 5. 实习成果展示
- **完整项目生命周期**：从需求分析到部署上线的完整实践
- **文档齐全**：详细的需求文档、API 文档、部署指南
- **代码规范**：遵循现代前端和后端开发最佳实践
- **可扩展架构**：模块化设计，易于功能扩展和维护

## 🔧 开发指南

### 运行测试
```bash
# 后端测试
cd server
npm test

# 测试特定文件
npm test -- aiRelevance.test.ts
```

### 数据库操作
```bash
# 生成 Prisma Client
npm run db:generate

# 创建新的迁移
npm run db:migrate

# 应用迁移到数据库
npm run db:push

# 打开 Prisma Studio
npm run db:studio
```

### 生产环境构建
```bash
# 构建前端
cd client
npm run build

# 构建后端
cd server
npm run build
```

## 📊 性能优化

- **前端代码分割**：Vite 自动代码分割和懒加载
- **API 响应缓存**：热点数据缓存策略
- **数据库索引优化**：关键字段索引提升查询性能
- **请求合并**：批量处理数据采集请求
- **错误重试机制**：网络请求自动重试

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！在提交之前，请确保：

1. 代码符合项目的代码规范
2. 添加或更新相应的测试
3. 更新相关文档
4. 提交信息清晰明确

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- **OpenRouter**：提供多模型 AI API 服务
- **Twitter API**：社交媒体数据源
- **Prisma**：现代化的数据库 ORM
- **Tailwind CSS**：高效的前端样式解决方案
- **React 社区**：丰富的组件和工具生态

## 📞 联系与支持

如有问题或建议，请通过以下方式联系：

- GitHub Issues：[项目 Issues 页面](https://github.com/FurinaLuna/hot-monitor/issues)
- 邮箱：[2517523791@qq.com](mailto:2517523791@qq.com)

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给个 Star 支持一下！**

</div>

## 🎨 设计系统

本项目采用完整的现代化设计系统，包括：

### 📐 视觉系统
- **色彩系统**：基于紧急程度分级的4级色彩系统（紧急/高/中/低），以及数据可视化专用色系
- **排版系统**：清晰的字体层次（h1-h6、正文、辅助），基于8px网格的完美比例
- **间距系统**：基于8px网格的动态间距公式，创造有机不对称布局

### 🎭 组件系统
- **热点卡片**：三种差异化卡片样式
  - 🔴 紧急热点：红色渐变 + 脉冲动画
  - 🟠 高优先级：橙色渐变 + 轻微浮动动画
  - 🟢 标准卡片：悬停扩展效果
- **动画统计**：实时数字滚动 + 迷你趋势图表
- **雷达布局**：按重要性和时间动态排布的雷达扫描布局

### ✨ 动效系统
- **情境化动效**：动画与用户操作、数据状态相关联
- **微交互**：按钮点击、卡片悬停、拖拽排序等微交互
- **品牌动效**：火焰脉冲、雷达扫描等品牌专属动效

### 📂 目录结构
```
client/src/
├── design-system/          # 设计系统
│   ├── colors.ts           # 色彩系统
│   ├── typography.ts       # 字体系统
│   ├── spacing.ts          # 间距系统
│   ├── animations.ts       # 动效系统
│   └── index.ts            # 设计系统导出
├── components/
│   ├── hotspots/           # 热点组件
│   │   ├── HotspotCard/    # 热点卡片
│   │   └── HotspotRadar/   # 雷达布局
│   ├── stats/              # 统计组件
│   │   └── AnimatedStatCard.tsx
│   ├── ui/                 # UI基础组件
│   └── FilterSortBar.tsx   # 筛选排序栏
```

## 🚀 快速开始

### 前置要求
- Node.js 18+
- PostgreSQL 数据库
- SMTP 邮件服务（可选）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/FurinaLuna/hot-monitor.git
cd zcw-hot-monitor
```

2. **安装依赖**
```bash
# 后端
cd server
npm install

# 前端
cd ../client
npm install
```

3. **配置环境变量**

创建 `server/.env`：
```env
DATABASE_URL=postgresql://user:password@localhost:5432/hot_monitor
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
OPENROUTER_API_KEY=your-api-key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

创建 `client/.env`：
```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

4. **数据库初始化**
```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

5. **启动服务**
```bash
# 启动后端
cd server
npm run dev

# 启动前端（新终端）
cd client
npm run dev
```

访问 http://localhost:5173 查看应用