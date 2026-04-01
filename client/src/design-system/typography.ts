/**
 * HotPulse 字体系统
 * 建立清晰的视觉层次，消除"AI味道"，增强可读性
 */

export const typography = {
  // ===== 字体族 (Font Families) =====
  fonts: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'system-ui',
      'sans-serif',
    ],
    mono: [
      'JetBrains Mono',
      'Cascadia Code',
      'Consolas',
      'Monaco',
      'monospace',
    ],
  },

  // ===== 字体比例系统 (Type Scale) =====
  // 基于 16px 基数，1.25 比例因子 (完美四度)
  scale: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '2.75rem',  // 44px
    '6xl': '3.5rem',   // 56px
    '7xl': '4.5rem',   // 72px
  },

  // ===== 字体粗细 (Font Weights) =====
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // ===== 行高 (Line Heights) =====
  leading: {
    tight: 1.25,      // 标题
    snug: 1.375,      // 小标题
    normal: 1.5,      // 正文
    relaxed: 1.625,   // 长文本
    loose: 1.75,      // 引文、诗歌
  },

  // ===== 字距 (Letter Spacing) =====
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // ===== 文本样式定义 (Text Styles) =====
  styles: {
    // 标题层级 (Headings)
    h1: {
      fontSize: '3.5rem',      // 56px
      lineHeight: 1.25,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      css: 'text-6xl font-extrabold tracking-tight leading-tight',
    },
    h2: {
      fontSize: '2.75rem',     // 44px
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: '-0.025em',
      css: 'text-5xl font-bold tracking-tight leading-snug',
    },
    h3: {
      fontSize: '2.25rem',     // 36px
      lineHeight: 1.35,
      fontWeight: 600,
      letterSpacing: '-0.025em',
      css: 'text-4xl font-semibold tracking-tight leading-snug',
    },
    h4: {
      fontSize: '1.875rem',    // 30px
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: '-0.025em',
      css: 'text-3xl font-semibold tracking-tight leading-snug',
    },
    h5: {
      fontSize: '1.5rem',      // 24px
      lineHeight: 1.45,
      fontWeight: 500,
      letterSpacing: '0',
      css: 'text-2xl font-medium tracking-normal leading-snug',
    },
    h6: {
      fontSize: '1.25rem',     // 20px
      lineHeight: 1.5,
      fontWeight: 500,
      letterSpacing: '0',
      css: 'text-xl font-medium tracking-normal leading-normal',
    },

    // 正文文本 (Body Text)
    body: {
      lg: {
        fontSize: '1.125rem',  // 18px
        lineHeight: 1.625,
        fontWeight: 400,
        css: 'text-lg font-normal leading-relaxed',
      },
      base: {
        fontSize: '1rem',      // 16px
        lineHeight: 1.5,
        fontWeight: 400,
        css: 'text-base font-normal leading-normal',
      },
      sm: {
        fontSize: '0.875rem',  // 14px
        lineHeight: 1.5,
        fontWeight: 400,
        css: 'text-sm font-normal leading-normal',
      },
    },

    // 辅助文本 (Supporting Text)
    caption: {
      base: {
        fontSize: '0.875rem',  // 14px
        lineHeight: 1.4,
        fontWeight: 400,
        color: 'var(--text-secondary)',
        css: 'text-sm font-normal text-slate-400',
      },
      sm: {
        fontSize: '0.75rem',   // 12px
        lineHeight: 1.4,
        fontWeight: 400,
        color: 'var(--text-muted)',
        css: 'text-xs font-normal text-slate-500',
      },
    },

    // 代码文本 (Code)
    code: {
      base: {
        fontFamily: 'mono',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 400,
        css: 'font-mono text-sm',
      },
      inline: {
        fontFamily: 'mono',
        fontSize: '0.875rem',
        fontWeight: 400,
        css: 'font-mono text-sm bg-white/5 px-1.5 py-0.5 rounded',
      },
    },

    // 特殊用途 (Special)
    label: {
      base: {
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
        css: 'text-sm font-medium tracking-wide uppercase',
      },
    },
  },

  // ===== 响应式字体缩放 (Responsive Scaling) =====
  responsive: {
    // 在小屏幕上缩小大标题
    h1: {
      base: '2.5rem',      // 40px on mobile
      sm: '3rem',          // 48px on tablet
      lg: '3.5rem',        // 56px on desktop
    },
    h2: {
      base: '2rem',        // 32px
      sm: '2.25rem',       // 36px
      lg: '2.75rem',       // 44px
    },
    // 正文在移动设备上稍大以提高可读性
    body: {
      base: '1rem',        // 16px
      sm: '1rem',
      lg: '1rem',
    },
  },
} as const;

/**
 * CSS 类名工具函数
 * 用于在组件中快速应用文本样式
 */
export const textStyles = {
  // 标题
  h1: typography.styles.h1.css,
  h2: typography.styles.h2.css,
  h3: typography.styles.h3.css,
  h4: typography.styles.h4.css,
  h5: typography.styles.h5.css,
  h6: typography.styles.h6.css,

  // 正文
  'body-lg': typography.styles.body.lg.css,
  'body-base': typography.styles.body.base.css,
  'body-sm': typography.styles.body.sm.css,

  // 辅助
  'caption-base': typography.styles.caption.base.css,
  'caption-sm': typography.styles.caption.sm.css,

  // 代码
  'code-base': typography.styles.code.base.css,
  'code-inline': typography.styles.code.inline.css,

  // 标签
  'label-base': typography.styles.label.base.css,
};

/**
 * 字体层级类型
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type BodySize = 'lg' | 'base' | 'sm';
export type CaptionSize = 'base' | 'sm';
export type TextStyle = keyof typeof textStyles;