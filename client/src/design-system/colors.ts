/**
 * HotPulse 色彩系统
 * 扩展自基础赛博朋克调色板，增加紧急程度分级和数据可视化专用色系
 */

export const colors = {
  // ===== 基础色系 (Base) =====
  base: {
    bg: {
      DEFAULT: '#050510',
      surface: '#0a0a1a',
      elevated: '#111127',
      hover: '#16163a',
    },
    border: {
      subtle: 'rgba(59, 130, 246, 0.08)',
      DEFAULT: 'rgba(59, 130, 246, 0.15)',
      active: 'rgba(59, 130, 246, 0.35)',
    },
    text: {
      primary: '#e8eaf0',
      secondary: '#8b8fa8',
      muted: '#5a5e78',
    },
  },

  // ===== 强调色 (Accents) =====
  accent: {
    blue: '#3b82f6',      // 主蓝
    cyan: '#06b6d4',      // 青
    emerald: '#10b981',   // 绿
    amber: '#f59e0b',     // 琥珀
    red: '#ef4444',       // 红
  },

  // ===== 紧急程度色系 (Urgency) =====
  urgency: {
    // 🔴 紧急热点 - 红色渐变 + 脉冲动画
    urgent: {
      DEFAULT: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
      glow: 'rgba(239, 68, 68, 0.3)',
    },
    // 🟠 高优先级 - 橙色渐变 + 轻微浮动
    high: {
      DEFAULT: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)',
      glow: 'rgba(245, 158, 11, 0.25)',
    },
    // 🟡 中等优先级 - 琥珀色
    medium: {
      DEFAULT: '#eab308',
      light: '#facc15',
      dark: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.2)',
    },
    // 🟢 低优先级 - 绿色
    low: {
      DEFAULT: '#10b981',
      light: '#34d399',
      dark: '#059669',
      glow: 'rgba(16, 185, 129, 0.2)',
    },
  },

  // ===== 数据可视化色系 (Data Visualization) =====
  dataViz: {
    sequential: {
      blue: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'],
      cyan: ['#06b6d4', '#0891b2', '#0e7490', '#155e75'],
      emerald: ['#10b981', '#059669', '#047857', '#065f46'],
      amber: ['#f59e0b', '#d97706', '#b45309', '#92400e'],
      red: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
    },
    categorical: {
      blue: '#3b82f6',
      cyan: '#06b6d4',
      emerald: '#10b981',
      amber: '#f59e0b',
      red: '#ef4444',
      violet: '#8b5cf6',
      pink: '#ec4899',
    },
    divergent: {
      positive: '#10b981',
      neutral: '#8b8fa8',
      negative: '#ef4444',
    },
  },

  // ===== 品牌色 (Brand) =====
  brand: {
    hotpulse: {
      // HotPulse 火焰脉冲主题色
      flame: {
        core: '#f97316',      // 火焰核心橙
        mid: '#ea580c',       // 火焰中层
        outer: '#dc2626',     // 火焰外层红
        glow: 'rgba(249, 115, 22, 0.4)',
      },
      radar: {
        scan: '#06b6d4',      // 雷达扫描青
        wave: '#3b82f6',      // 雷达波蓝
        grid: 'rgba(6, 182, 212, 0.1)',
      },
    },
  },
} as const;

/**
 * CSS 自定义属性导出
 * 用于在 CSS 中直接引用
 */
export const cssVariables = {
  '--urgency-urgent': colors.urgency.urgent.DEFAULT,
  '--urgency-urgent-light': colors.urgency.urgent.light,
  '--urgency-urgent-dark': colors.urgency.urgent.dark,
  '--urgency-urgent-gradient': colors.urgency.urgent.gradient,
  '--urgency-urgent-glow': colors.urgency.urgent.glow,
  '--urgency-high': colors.urgency.high.DEFAULT,
  '--urgency-high-light': colors.urgency.high.light,
  '--urgency-high-dark': colors.urgency.high.dark,
  '--urgency-high-gradient': colors.urgency.high.gradient,
  '--urgency-high-glow': colors.urgency.high.glow,
  '--urgency-medium': colors.urgency.medium.DEFAULT,
  '--urgency-medium-glow': colors.urgency.medium.glow,
  '--urgency-low': colors.urgency.low.DEFAULT,
  '--urgency-low-glow': colors.urgency.low.glow,
  '--brand-flame-core': colors.brand.hotpulse.flame.core,
  '--brand-flame-mid': colors.brand.hotpulse.flame.mid,
  '--brand-flame-outer': colors.brand.hotpulse.flame.outer,
  '--brand-flame-glow': colors.brand.hotpulse.flame.glow,
  '--brand-radar-scan': colors.brand.hotpulse.radar.scan,
  '--brand-radar-wave': colors.brand.hotpulse.radar.wave,
  '--brand-radar-grid': colors.brand.hotpulse.radar.grid,
} as const;

/**
 * Tailwind 配置扩展
 * 用于在 tailwind.config.js 中扩展主题色
 */
export const tailwindConfig = {
  extend: {
    colors: {
      urgency: {
        urgent: colors.urgency.urgent,
        high: colors.urgency.high,
        medium: colors.urgency.medium,
        low: colors.urgency.low,
      },
      brand: colors.brand.hotpulse,
    },
  },
};

export type ColorPalette = typeof colors;
export type UrgencyLevel = keyof typeof colors.urgency;