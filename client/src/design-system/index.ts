/**
 * HotPulse 设计系统
 * 统一的设计令牌、组件规范和动效系统
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './animations';

// ===== 设计系统配置 =====
export const designSystem = {
  colors: {
    ...require('./colors').colors,
    cssVariables: require('./colors').cssVariables,
  },
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
  animations: require('./animations').animations,
} as const;

// ===== 工具函数 =====
/**
 * 应用紧急程度样式
 */
export function applyUrgencyStyles(level: 'urgent' | 'high' | 'medium' | 'low') {
  const { colors } = require('./colors');
  const urgency = colors.urgency[level];

  return {
    backgroundColor: urgency.gradient || urgency.DEFAULT,
    borderColor: urgency.DARK || urgency.DEFAULT,
    boxShadow: `0 4px 20px ${urgency.glow}`,
    color: 'white',
  };
}

/**
 * 获取动画配置
 */
export function getAnimationConfig(
  type: 'enter' | 'exit' | 'hover' | 'pulse',
  context?: string
) {
  const { animations } = require('./animations');

  if (context === 'urgent') {
    return animations.presets.component.urgentCard;
  }
  if (context === 'high') {
    return animations.presets.component.highPriorityCard;
  }

  switch (type) {
    case 'enter':
      return animations.presets.page.enter;
    case 'exit':
      return animations.presets.page.exit;
    case 'hover':
      return animations.presets.component.standardCard.hover;
    case 'pulse':
      return { animation: 'pulseUrgent 2s infinite' };
    default:
      return { duration: '300ms', easing: 'ease-out' };
  }
}

/**
 * 生成有机间距
 */
export function generateOrganicSpacing(
  base: string,
  options?: {
    variance?: 'subtle' | 'noticeable' | 'strong';
    axis?: 'x' | 'y' | 'both';
  }
) {
  const { spacing } = require('./spacing');
  return spacing.formulas.organicOffset(base, options?.variance || 'subtle');
}

// ===== 类型导出 =====
export type { ColorPalette, UrgencyLevel } from './colors';
export type { HeadingLevel, BodySize, TextStyle } from './typography';
export type { SpacingScale, SpacingRole } from './spacing';
export type { AnimationPreset, AnimationContext } from './animations';