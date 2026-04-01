/**
 * HotPulse 间距系统
 * 基于 8px 网格，引入有机不对称和动态间距公式
 * 消除机械感，创造深度层次
 */

export const spacing = {
  // ===== 基础间距单位 (Base Unit) =====
  unit: '0.5rem', // 8px - 基础网格单位

  // ===== 间距比例 (Spacing Scale) =====
  // 基于 8px 网格，但引入非整数倍以创造有机感
  scale: {
    0: '0',
    0.5: '0.125rem',  // 2px  - 微间距
    1: '0.25rem',     // 4px  - 极小间距
    1.5: '0.375rem',  // 6px  - 紧凑间距
    2: '0.5rem',      // 8px  - 基础单位
    2.5: '0.625rem',  // 10px - 有机增量
    3: '0.75rem',     // 12px - 小间距
    3.5: '0.875rem',  // 14px - 有机增量
    4: '1rem',        // 16px - 中间距
    5: '1.25rem',     // 20px - 有机增量
    6: '1.5rem',      // 24px - 标准间距
    7: '1.75rem',     // 28px - 有机增量
    8: '2rem',        // 32px - 大间距
    9: '2.25rem',     // 36px - 有机增量
    10: '2.5rem',     // 40px - 特大间距
    11: '2.75rem',    // 44px - 有机增量
    12: '3rem',       // 48px - 超大间距
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
  },

  // ===== 动态间距公式 (Dynamic Spacing Formulas) =====
  // 根据上下文动态计算间距，创造有机不对称
  formulas: {
    /**
     * 卡片内部间距 - 根据卡片大小动态调整
     * @param size 卡片尺寸: 'compact' | 'normal' | 'expanded'
     */
    cardPadding: (size: 'compact' | 'normal' | 'expanded' = 'normal') => {
      const sizes = {
        compact: { x: '1rem', y: '0.75rem' },   // 16px x 12px
        normal: { x: '1.25rem', y: '1rem' },    // 20px x 16px
        expanded: { x: '1.5rem', y: '1.25rem' }, // 24px x 20px
      };
      return sizes[size];
    },

    /**
     * 章节间距 - 根据层级动态调整
     * @param level 层级: 1-3 (1为最紧密)
     */
    sectionGap: (level: 1 | 2 | 3 = 2) => {
      const gaps = {
        1: '2rem',   // 32px - 紧密章节
        2: '3rem',   // 48px - 标准章节
        3: '4rem',   // 64px - 松散章节
      };
      return gaps[level];
    },

    /**
     * 元素组内间距 - 根据元素数量和容器宽度动态调整
     * @param count 元素数量
     * @param containerWidth 容器宽度类别: 'narrow' | 'normal' | 'wide'
     */
    groupGap: (
      count: number,
      containerWidth: 'narrow' | 'normal' | 'wide' = 'normal'
    ) => {
      // 基础间距
      const baseGaps = {
        narrow: '0.5rem',   // 8px
        normal: '0.75rem',  // 12px
        wide: '1rem',       // 16px
      };

      const base = baseGaps[containerWidth];

      // 元素数量越多，间距越小（但非线性）
      if (count <= 3) return base;
      if (count <= 6) return `calc(${base} * 0.9)`;
      if (count <= 9) return `calc(${base} * 0.8)`;
      return `calc(${base} * 0.7)`;
    },

    /**
     * 有机偏移 - 创造非对称布局
     * @param base 基础偏移值
     * @param variance 变异幅度: 'subtle' | 'noticeable' | 'strong'
     */
    organicOffset: (
      base: string,
      variance: 'subtle' | 'noticeable' | 'strong' = 'subtle'
    ) => {
      const multipliers = {
        subtle: 0.1,        // 10% 变异
        noticeable: 0.25,   // 25% 变异
        strong: 0.4,        // 40% 变异
      };

      const multiplier = multipliers[variance];
      const random = Math.random() * multiplier - multiplier / 2; // -variance/2 到 +variance/2
      return `calc(${base} * (1 + ${random.toFixed(3)}))`;
    },
  },

  // ===== 间距角色 (Spacing Roles) =====
  roles: {
    // 内边距 (Padding)
    padding: {
      button: {
        sm: '0.375rem 0.75rem',    // 6px 12px
        base: '0.5rem 1rem',       // 8px 16px
        lg: '0.75rem 1.5rem',      // 12px 24px
      },
      input: {
        sm: '0.375rem 0.75rem',    // 6px 12px
        base: '0.5rem 0.875rem',   // 8px 14px
        lg: '0.75rem 1rem',        // 12px 16px
      },
      card: {
        compact: '0.75rem 1rem',   // 12px 16px
        base: '1rem 1.25rem',      // 16px 20px
        expanded: '1.25rem 1.5rem', // 20px 24px
      },
    },

    // 外边距 (Margin)
    margin: {
      section: {
        compact: '1.5rem 0',       // 24px
        base: '2.5rem 0',          // 40px
        loose: '4rem 0',           // 64px
      },
      element: {
        tight: '0.25rem',          // 4px
        base: '0.5rem',            // 8px
        loose: '1rem',             // 16px
      },
    },

    // 间隔 (Gap)
    gap: {
      grid: {
        tight: '0.75rem',          // 12px
        base: '1rem',              // 16px
        loose: '1.5rem',           // 24px
      },
      flex: {
        tight: '0.5rem',           // 8px
        base: '0.75rem',           // 12px
        loose: '1rem',             // 16px
      },
      stack: {
        tight: '0.5rem',           // 8px
        base: '0.75rem',           // 12px
        loose: '1rem',             // 16px
      },
    },
  },

  // ===== 深度层次间距 (Depth-aware Spacing) =====
  // 根据元素在 Z 轴上的位置调整间距，创造空间感
  depth: {
    // Z-index 层级对应的间距增量
    layers: {
      0: '0',                      // 背景层
      10: '0.125rem',              // 底层元素
      20: '0.25rem',               // 基础层
      30: '0.375rem',              // 交互层
      40: '0.5rem',                // 悬浮层
      50: '0.75rem',               // 模态层
    },

    /**
     * 根据 Z-index 获取间距增量
     * @param zIndex Z-index 值
     */
    getIncrement: (zIndex: number) => {
      const layers = [0, 10, 20, 30, 40, 50];
      const closest = layers.reduce((prev, curr) =>
        Math.abs(curr - zIndex) < Math.abs(prev - zIndex) ? curr : prev
      );
      return spacing.depth.layers[closest as keyof typeof spacing.depth.layers] || '0';
    },

    /**
     * 应用深度感知间距
     * @param baseSpacing 基础间距
     * @param zIndex Z-index 值
     */
    apply: (baseSpacing: string, zIndex: number) => {
      const increment = spacing.depth.getIncrement(zIndex);
      return `calc(${baseSpacing} + ${increment})`;
    },
  },
} as const;

/**
 * Tailwind 间距配置
 * 用于扩展 tailwind.config.js
 */
export const tailwindSpacing = {
  ...spacing.scale,
  // 添加动态间距工具类
  'card-compact': spacing.roles.padding.card.compact,
  'card-base': spacing.roles.padding.card.base,
  'card-expanded': spacing.roles.padding.card.expanded,
};

/**
 * CSS 工具函数
 */
export const spacingUtils = {
  /**
   * 快速应用间距角色
   */
  role: (type: keyof typeof spacing.roles, variant: string) => {
    // 简化版本，实际使用时需要更复杂的逻辑
    return spacing.roles[type]?.[variant] || '';
  },

  /**
   * 应用有机不对称布局
   */
  organic: (
    base: string,
    options: {
      variance?: 'subtle' | 'noticeable' | 'strong';
      axis?: 'x' | 'y' | 'both';
    } = {}
  ) => {
    const { variance = 'subtle', axis = 'both' } = options;
    const offset = spacing.formulas.organicOffset(base, variance);

    if (axis === 'x') {
      return { marginLeft: offset, marginRight: offset };
    } else if (axis === 'y') {
      return { marginTop: offset, marginBottom: offset };
    } else {
      return { margin: offset };
    }
  },
};

export type SpacingScale = keyof typeof spacing.scale;
export type SpacingRole = keyof typeof spacing.roles;