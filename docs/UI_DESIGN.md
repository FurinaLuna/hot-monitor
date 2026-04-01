# Hot Monitor UI 美化设计文档

> 版本: 1.0 | 日期: 2026-04-01 | 作者: Claude Code

---

## 1. 项目分析

### 1.1 产品定位

| 属性 | 描述 |
|------|------|
| **产品类型** | Tool - AI 热点监控仪表盘 |
| **目标用户** | AI 编程博主、技术从业者 |
| **使用场景** | 桌面端为主，移动端查看 |
| **核心价值** | 实时监控、AI 分析、信息聚合 |

### 1.2 当前状态评估

**优点：**
- 已有暗色主题基础（#050510 背景）
- 使用 Framer Motion 动画库
- 有 Spotlight、Meteors 等视觉效果
- 组件结构清晰（FilterSortBar 分离）

**问题：**
- 信息密度过高，视觉层次不够清晰
- 热点卡片样式较为单调
- 统计数据展示缺乏视觉冲击力
- 缺少品牌化的独特视觉语言
- 部分交互反馈不明显

---

## 2. 设计系统

### 2.1 设计风格定位

**推荐风格：** **Neo-Cyberpunk Dashboard**

融合赛博朋克美学与现代数据仪表盘的专业感：

| 特征 | 说明 |
|------|------|
| **氛围** | 深邃太空感 + 科技荧光点缀 |
| **质感** | 磨砂玻璃 + 微光边框 + 渐变光晕 |
| **动态** | 流动光效 + 数据脉动 + 交互涟漪 |
| **层次** | 多层叠加 + 景深模糊 + 浮动卡片 |

**Anti-Patterns 避免：**
- ❌ 过度使用 emoji 作为图标
- ❌ 随意的阴影值（需统一 elevation scale）
- ❌ 纯装饰性动画（需有意义）
- ❌ 高对比度霓虹色大面积使用（仅作点缀）

---

### 2.2 色彩系统

#### 主色板（Dark Mode 优化）

```
┌─────────────────────────────────────────────────────────────┐
│  BASE COLORS                                                │
├─────────────────────────────────────────────────────────────┤
│  Background                                                 │
│  • bg-deep:      #030308   (最深背景，空间感)               │
│  • bg-base:      #050510   (主背景)                         │
│  • bg-surface:   #0a0a1a   (卡片/面板背景)                  │
│  • bg-elevated:  #111127   (悬浮元素)                       │
│  • bg-hover:     #16163a   (交互悬停)                       │
│                                                             │
│  Text                                                       │
│  • text-primary:   #e8eaf0  (主文字，对比度 15:1)           │
│  • text-secondary: #8b8fa8  (次要文字，对比度 6:1)          │
│  • text-muted:     #5a5e78  (辅助文字，对比度 3.5:1)        │
│                                                             │
│  Accent (功能色)                                            │
│  • accent-blue:    #3b82f6  (主强调色)                      │
│  • accent-cyan:    #06b6d4  (科技感辅助)                    │
│  • accent-emerald: #10b981  (成功/真实)                     │
│  • accent-amber:   #f59e0b  (警告/中等)                     │
│  • accent-red:     #ef4444  (错误/紧急)                     │
│  • accent-purple:  #8b5cf6  (AI/分析)                       │
│  • accent-pink:    #ec4899  (热点/爆)                       │
└─────────────────────────────────────────────────────────────┘
```

#### 渐变色系（用于强调元素）

```css
/* 主渐变 - 用于主按钮、重要标签 */
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);

/* 热度渐变 - 用于热度指示器 */
--gradient-hot: linear-gradient(90deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%);

/* AI渐变 - 用于AI分析相关元素 */
--gradient-ai: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);

/* 边框光晕 - 用于卡片边框 */
--border-glow: linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(6,182,212,0.1) 100%);
```

#### Semantic Tokens（语义化命名）

```css
/* 状态色 */
--color-success: var(--accent-emerald);
--color-warning: var(--accent-amber);
--color-error: var(--accent-red);
--color-info: var(--accent-cyan);

/* 重要程度 */
--color-urgent: #ef4444;
--color-high: #f59e0b;
--color-medium: #06b6d4;
--color-low: #64748b;

/* 来源标识 */
--color-twitter: #1da1f2;
--color-bing: #008373;
--color-google: #4285f4;
--color-weibo: #e6162d;
--color-bilibili: #00a1d6;
--color-hackernews: #ff6600;
```

---

### 2.3 字体系统

#### 字体家族

```css
/* 主字体 - 界面文字 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* 数据字体 - 数字、统计 */
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

/* 标题字体 - 可选用 */
--font-display: 'Space Grotesk', 'Inter', sans-serif;
```

#### 字体尺度（Type Scale）

```
┌────────────────────────────────────────────────┐
│  TOKEN          SIZE      WEIGHT    USAGE      │
├────────────────────────────────────────────────┤
│  text-xs        12px      400       标签、辅助 │
│  text-sm        14px      400       次要内容   │
│  text-base      16px      400       正文       │
│  text-lg        18px      500       小标题     │
│  text-xl        20px      600       卡片标题   │
│  text-2xl       24px      600       区块标题   │
│  text-3xl       30px      700       页面标题   │
│  text-4xl       36px      700       大数字     │
│  text-5xl       48px      800       主统计     │
├────────────────────────────────────────────────┤
│  line-height: 1.5 (正文) / 1.2 (标题)          │
│  letter-spacing: 0 (正文) / -0.02em (标题)     │
└────────────────────────────────────────────────┘
```

---

### 2.4 间距系统

基于 **8dp rhythm**：

```css
--space-1:  4px;   /* 微间距 */
--space-2:  8px;   /* 元素内部 */
--space-3:  12px;  /* 紧凑元素间 */
--space-4:  16px;  /* 标准元素间 */
--space-5:  20px;  /* 舒适间距 */
--space-6:  24px;  /* 卡片内部 */
--space-8:  32px;  /* 区块间距 */
--space-10: 40px;  /* 大区块 */
--space-12: 48px;  /* 页面级 */
--space-16: 64px;  /* 主要分隔 */
```

---

### 2.5 圆角系统

```css
--radius-sm:   6px;   /* 小元素、标签 */
--radius-md:   8px;   /* 按钮、输入框 */
--radius-lg:   12px;  /* 卡片 */
--radius-xl:   16px;  /* 大卡片、面板 */
--radius-2xl:  24px;  /* 主容器 */
--radius-full: 9999px; /* 圆形、胶囊 */
```

---

### 2.6 阴影与光效（Elevation Scale）

```css
/* 基础阴影层 */
--shadow-sm:    0 2px 4px rgba(0,0,0,0.3);
--shadow-md:    0 4px 12px rgba(0,0,0,0.4);
--shadow-lg:    0 8px 24px rgba(0,0,0,0.5);
--shadow-xl:    0 16px 48px rgba(0,0,0,0.6);

/* 光晕效果（赛博朋克特色） */
--glow-blue:    0 0 20px rgba(59,130,246,0.3);
--glow-cyan:    0 0 20px rgba(6,182,212,0.3);
--glow-purple:  0 0 20px rgba(139,92,246,0.3);
--glow-pink:    0 0 20px rgba(236,72,153,0.3);

/* 边框光效 */
--border-glow-blue:   1px solid rgba(59,130,246,0.2), inset 0 0 20px rgba(59,130,246,0.05);
--border-glow-active: 1px solid rgba(59,130,246,0.5), 0 0 12px rgba(59,130,246,0.2);
```

---

## 3. 页面设计方案

### 3.1 仪表盘（Dashboard）

#### 布局结构

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [Logo] 热点监控        [Tab: 仪表盘 | 关键词 | 搜索]  [🔔]  ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  STATS BANNER (统计横幅)                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ 🔥 128  │ │ 📊 45   │ │ ⚡ 12   │ │ ✓ 89%   │ │ 🕐 5m   │   │
│  │ 总热点  │ │ 关键词  │ │ 新增    │ │ 真实率  │ │ 更新    │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  FILTER BAR                                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [排序: 最新▼] [筛选 ▼] [来源 ▼] [重要程度 ▼]    [🔄 刷新] ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  HOTSPOT LIST                                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ┌─────────────────────────────────────────────────────────┐││
│  │ │ [🔴 紧急] GPT-5 发布日期确定？                          │││
│  │ │ ─────────────────────────────────────────────────────── │││
│  │ │ AI分析: 相关性 92% | 真实 ✓ | 来源 Twitter              │││
│  │ │ 💬 1.2k 🔁 3.4k 👁 50k   发布 2h前                      │││
│  │ │                [展开分析] [原文链接 →]                  │││
│  │ └─────────────────────────────────────────────────────────┘││
│  │ ┌─────────────────────────────────────────────────────────┐││
│  │ │ [🟠 高] Claude 4.6 性能超越 GPT-4                      │││
│  │ │ ...                                                     │││
│  │ └─────────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  PAGINATION                                                      │
│  [◀] [1] [2] [3] ... [10] [▶]          共 128 条               │
└─────────────────────────────────────────────────────────────────┘
```

#### 统计卡片设计

**改进方案：**

```tsx
// 统计卡片 - 添加动态光效和数字动画
<motion.div 
  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0a0a1a] to-[#111127]"
  whileHover={{ scale: 1.02 }}
>
  {/* 光晕背景 */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 opacity-50" />
  
  {/* 脉动边框 */}
  <div className="absolute inset-0 rounded-xl border border-blue-500/20 animate-pulse-soft" />
  
  {/* 内容 */}
  <div className="p-4 relative">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-5 h-5 text-cyan-400" />
      <span className="text-sm text-slate-400">{label}</span>
    </div>
    <motion.span 
      className="text-3xl font-bold text-white font-mono"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {value}
    </motion.span>
  </div>
</motion.div>
```

---

### 3.2 热点卡片设计

#### 卡片样式层级

```
┌─ Level 1: 紧急 ──────────────────────────────────────────────────┐
│  背景: 渐变红光 bg-gradient-to-r from-red-500/10 to-pink-500/5 │
│  边框: border-red-500/30 + glow-red                             │
│  标签: 红色脉冲动画 "🔴 紧急"                                    │
└──────────────────────────────────────────────────────────────────┘

┌─ Level 2: 高 ────────────────────────────────────────────────────┐
│  背景: 渐变琥珀 bg-gradient-to-r from-amber-500/10 to-orange/5 │
│  边框: border-amber-500/25                                       │
│  标签: "🟠 高" 静态                                              │
└──────────────────────────────────────────────────────────────────┘

┌─ Level 3: 中 ────────────────────────────────────────────────────┐
│  背景: 渐变青色 bg-gradient-to-r from-cyan-500/8 to-blue/5     │
│  边框: border-cyan-500/20                                        │
│  标签: "🟡 中"                                                   │
└──────────────────────────────────────────────────────────────────┘

┌─ Level 4: 低 ────────────────────────────────────────────────────┐
│  背景: 标准 bg-surface                                          │
│  边框: border-white/10                                           │
│  标签: "🟢 低"                                                   │
└──────────────────────────────────────────────────────────────────┘
```

#### 热度指示器设计

```tsx
// 热度条 - 渐变色 + 脉动效果
<div className="flex items-center gap-2">
  <div className="relative w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
    <motion.div 
      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 via-red-500 to-pink-500"
      initial={{ width: 0 }}
      animate={{ width: `${heatScore}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
    {/* 光效叠加 */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
  </div>
  <span className={cn("text-xs font-bold font-mono", heatColor)}>
    {heatLabel}
  </span>
</div>
```

#### 来源图标设计

```tsx
// 来源标识 - 品牌色圆点
const sourceStyles = {
  twitter: { color: '#1da1f2', icon: Twitter },
  bing: { color: '#008373', icon: Globe },
  google: { color: '#4285f4', icon: Globe },
  weibo: { color: '#e6162d', icon: Flame },
  bilibili: { color: '#00a1d6', icon: Play },
  hackernews: { color: '#ff6600', icon: Zap },
};

<div className="flex items-center gap-1.5">
  <div 
    className="w-2 h-2 rounded-full"
    style={{ backgroundColor: sourceStyles[source].color }}
  />
  <Icon className="w-3.5 h-3.5 text-slate-400" />
  <span className="text-xs text-slate-500">{source}</span>
</div>
```

---

### 3.3 关键词管理页

#### 关键词卡片设计

```tsx
// 关键词卡片 - 状态可视化
<motion.div
  className={cn(
    "relative rounded-xl p-4 transition-all duration-300",
    isActive 
      ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/30"
      : "bg-surface border border-white/10 opacity-60"
  )}
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.99 }}
>
  {/* 激活指示灯 */}
  <div className={cn(
    "absolute top-3 right-3 w-2 h-2 rounded-full",
    isActive ? "bg-emerald-400 shadow-glow-emerald" : "bg-slate-600"
  )} />
  
  {/* 关键词文字 */}
  <h3 className="text-lg font-semibold text-white">{keyword}</h3>
  
  {/* 统计 */}
  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
    <span>🔥 {hotspotCount} 热点</span>
    <span>🕐 最近 {lastUpdate}</span>
  </div>
  
  {/* 操作按钮 */}
  <div className="flex gap-2 mt-3">
    <button className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 hover:bg-white/10">
      {isActive ? '暂停' : '启用'}
    </button>
    <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs text-red-400 hover:bg-red-500/20">
      删除
    </button>
  </div>
</motion.div>
```

---

### 3.4 搜索页

#### 搜索框设计

```tsx
// 搜索框 - 焦点光效
<div className="relative">
  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/10 blur-xl opacity-0 transition-opacity peer-focus:opacity-100" />
  
  <input
    className="relative w-full px-4 py-3 pl-12 rounded-xl bg-surface border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all peer"
    placeholder="搜索热点..."
  />
  
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 peer-focus:text-cyan-400 transition-colors" />
</div>
```

---

## 4. 动效规范

### 4.1 时间曲线

| 动效类型 | 时长 | 缓动曲线 |
|----------|------|----------|
| 微交互（hover, click） | 150-200ms | ease-out |
| 状态切换（展开/折叠） | 200-300ms | ease-in-out |
| 页面元素入场 | 300-400ms | ease-out + stagger |
| 列表项入场 | 30-50ms/项 stagger | ease-out |
| 退场动画 | 60-70% 入场时长 | ease-in |

### 4.2 关键动画定义

```css
/* 脉动效果 - 用于状态指示 */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; box-shadow: 0 0 10px currentColor; }
  50% { opacity: 1; box-shadow: 0 0 20px currentColor; }
}

/* 闪烁效果 - 用于新内容提示 */
@keyframes blink-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 流光效果 - 用于热度条 */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 浮动效果 - 用于背景元素 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### 4.3 入场动画编排

```tsx
// 列表入场 - stagger 动画
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 50 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 300, ease: "easeOut" }
  }
};
```

### 4.4 Reduced Motion 支持

```tsx
// 遵循 prefers-reduced-motion
const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
>
```

---

## 5. 交互规范

### 5.1 触摸/点击反馈

| 元素 | 反馈方式 |
|------|----------|
| 按钮 | scale(0.97) + 阴影加深 |
| 卡片 | scale(0.99) + 边框光效增强 |
| 链接 | 颜色变化 + 下划线动画 |
| 标签 | 背景色变化 + 轻微放大 |

### 5.2 状态指示

```tsx
// 加载状态
{isLoading && (
  <motion.div 
    className="flex items-center gap-2 text-cyan-400"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    <RefreshCw className="w-4 h-4 animate-spin" />
    <span>加载中...</span>
  </motion.div>
)}

// 成功状态
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="flex items-center gap-2 text-emerald-400"
>
  <Check className="w-4 h-4" />
  <span>操作成功</span>
</motion.div>
```

### 5.3 Toast 通知设计

```tsx
// Toast - 更现代的设计
<motion.div
  initial={{ opacity: 0, y: -20, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -20, scale: 0.9 }}
  className={cn(
    "fixed top-4 right-4 z-50 px-4 py-3 rounded-xl",
    "bg-gradient-to-r shadow-lg border",
    type === 'success' 
      ? "from-emerald-500/20 to-cyan-500/10 border-emerald-500/30 text-emerald-300"
      : "from-red-500/20 to-pink-500/10 border-red-500/30 text-red-300"
  )}
>
  <div className="flex items-center gap-2">
    {type === 'success' ? <Check /> : <AlertTriangle />}
    <span>{message}</span>
  </div>
</motion.div>
```

---

## 6. 响应式设计

### 6.1 断点定义

```css
--breakpoint-sm:  640px;   /* 大手机 */
--breakpoint-md:  768px;   /* 平板竖屏 */
--breakpoint-lg:  1024px;  /* 平板横屏/小笔记本 */
--breakpoint-xl:  1280px;  /* 桌面 */
--breakpoint-2xl: 1536px;  /* 大桌面 */
```

### 6.2 响应式策略

| 元素 | 移动端 (< 768px) | 桌面端 (≥ 1024px) |
|------|------------------|-------------------|
| 统计卡片 | 2列网格 | 5列横向排列 |
| 热点卡片 | 全宽单列 | 2列网格可选 |
| 筛选栏 | 折叠式下拉 | 横向展开 |
| 导航 | 底部固定 Tab | 顶部水平 |
| 侧边栏 | 隐藏 | 可选显示 |

---

## 7. 无障碍设计

### 7.1 对比度要求

| 元素 | 最小对比度 |
|------|------------|
| 正文文字 | 4.5:1 (WCAG AA) |
| 大标题 (≥24px) | 3:1 |
| 图标/图形 | 3:1 |
| 状态指示 | 不依赖颜色单一传达 |

### 7.2 键盘导航

```tsx
// 确保所有交互元素可键盘访问
<button
  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510]"
  aria-label="删除关键词"
>
  <Trash2 className="w-4 h-4" />
</button>
```

### 7.3 屏幕阅读器支持

```tsx
// 热点卡片语义化
<article
  role="article"
  aria-labelledby={`hotspot-title-${id}`}
  className="..."
>
  <h3 id={`hotspot-title-${id}`}>{title}</h3>
  <div aria-label="热度指标">
    <span aria-hidden="true">🔥</span>
    <span className="sr-only">热度: {heatScore}%</span>
  </div>
</article>
```

---

## 8. 实施优先级

### Phase 1: 基础视觉升级（高优先级）

| 任务 | 影响 | 工作量 |
|------|------|--------|
| 更新 CSS 变量（色彩系统） | 高 | 低 |
| 统计卡片添加光效 | 高 | 中 |
| 热点卡片分级样式 | 高 | 中 |
| 热度指示器渐变动画 | 中 | 低 |

### Phase 2: 交互优化（中优先级）

| 任务 | 影响 | 工作量 |
|------|------|--------|
| 入场动画编排 | 中 | 中 |
| Toast 通知升级 | 中 | 低 |
| 搜索框焦点光效 | 低 | 低 |
| 加载状态动画 | 中 | 低 |

### Phase 3: 进阶特性（低优先级）

| 任务 | 影响 | 工作量 |
|------|------|--------|
| 背景动态效果增强 | 低 | 高 |
| 响应式布局优化 | 中 | 中 |
| 数据可视化图表 | 中 | 高 |
| 主题切换功能 | 低 | 高 |

---

## 9. 文件结构建议

```
client/src/
├── styles/
│   ├── design-tokens.css    # 设计变量
│   ├── animations.css       # 动画定义
│   └── utilities.css        # 工具类
├── components/
│   ├── ui/
│   │   ├── Card.tsx         # 基础卡片
│   │   ├── Badge.tsx        # 标签/徽章
│   │   ├── HeatBar.tsx      # 热度指示器
│   │   ├── SourceIcon.tsx   # 来源标识
│   │   ├── StatCard.tsx     # 统计卡片
│   │   └── Toast.tsx        # 通知组件
│   ├── hotspots/
│   │   ├── HotspotCard.tsx  # 热点卡片
│   │   └── HotspotList.tsx  # 热点列表
│   └── stats/
│   │   └ StatsBanner.tsx    # 统计横幅
│   └── layout/
│   │   ├── Header.tsx       # 头部导航
│   │   └── Sidebar.tsx      # 侧边栏
└── hooks/
│   ├── useReducedMotion.ts  # 动效偏好
│   └── useAnimatedValue.ts  # 数字动画
```

---

## 10. 总结

本设计文档基于 **Neo-Cyberpunk Dashboard** 风格，针对 Hot Monitor 的产品特性进行定制：

- **视觉语言**：深邃背景 + 荧光点缀 + 渐变光晕
- **信息层次**：通过颜色分级、光效强度、动画速度传达重要程度
- **交互反馈**：scale 变化 + 光效增强 + 状态动画
- **无障碍**：对比度合规 + 键盘导航 + 屏幕阅读器语义

**下一步：** 请查看并修改此文档，确认后我将开始实现。

---

*Generated by Claude Code with UI/UX Pro Max Design Intelligence*