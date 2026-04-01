/**
 * HotPulse 动效系统
 * 情境化动效：动画与用户操作、数据状态相关联
 * 消除机械感，增强情感连接
 */

export const animations = {
  // ===== 动画时长 (Durations) =====
  durations: {
    instant: '0ms',      // 即时反馈
    ultrafast: '75ms',   // 超快微交互
    fast: '150ms',       // 快速状态切换
    normal: '300ms',     // 标准过渡
    slow: '500ms',       // 强调性动画
    deliberate: '750ms', // 有意延迟
    epic: '1000ms',      // 重要时刻
  },

  // ===== 缓动函数 (Easing Functions) =====
  // 基于物理模型的缓动，创造自然感
  easings: {
    // 标准缓动
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',

    // 物理模型缓动
    'spring-physics': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'overshoot': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

    // 情感化缓动
    'energetic': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    'calm': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'playful': 'cubic-bezier(0.6, 0, 0.4, 1.5)',
    'urgent': 'cubic-bezier(0.9, 0.1, 0.3, 1)',
  },

  // ===== 关键帧动画 (Keyframe Animations) =====
  keyframes: {
    // 🔴 紧急热点脉冲
    pulseUrgent: {
      '0%': {
        boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)',
        transform: 'scale(1)',
      },
      '70%': {
        boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)',
        transform: 'scale(1.05)',
      },
      '100%': {
        boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)',
        transform: 'scale(1)',
      },
    },

    // 🟠 高优先级浮动
    floatHigh: {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-4px)',
      },
    },

    // 🌀 雷达扫描
    radarScan: {
      '0%': {
        transform: 'rotate(0deg)',
        opacity: '1',
      },
      '50%': {
        opacity: '0.8',
      },
      '100%': {
        transform: 'rotate(360deg)',
        opacity: '1',
      },
    },

    // 🔥 火焰脉冲
    flamePulse: {
      '0%, 100%': {
        transform: 'scale(1)',
        filter: 'brightness(1)',
      },
      '50%': {
        transform: 'scale(1.1)',
        filter: 'brightness(1.3)',
      },
    },

    // 💫 新热点冒泡
    bubbleUp: {
      '0%': {
        transform: 'translateY(20px) scale(0.8)',
        opacity: '0',
      },
      '60%': {
        transform: 'translateY(-5px) scale(1.05)',
        opacity: '1',
      },
      '100%': {
        transform: 'translateY(0) scale(1)',
        opacity: '1',
      },
    },

    // 📈 数字滚动
    numberRoll: {
      '0%': {
        transform: 'translateY(100%)',
        opacity: '0',
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: '1',
      },
    },

    // ✨ 微交互粒子
    particleExplode: {
      '0%': {
        transform: 'scale(0) translate(0, 0)',
        opacity: '1',
      },
      '100%': {
        transform: 'scale(1) translate(var(--tx), var(--ty))',
        opacity: '0',
      },
    },

    // 🎯 重要性变化过渡
    importanceTransition: {
      '0%': {
        backgroundColor: 'var(--from-color)',
        borderColor: 'var(--from-border)',
      },
      '100%': {
        backgroundColor: 'var(--to-color)',
        borderColor: 'var(--to-border)',
      },
    },

    // 📱 卡片悬停抬升
    cardLift: {
      '0%': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      '100%': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
      },
    },

    // 🌈 边缘发光
    edgeGlow: {
      '0%': {
        boxShadow: 'inset 0 0 0 1px rgba(59, 130, 246, 0)',
      },
      '100%': {
        boxShadow: 'inset 0 0 0 1px rgba(59, 130, 246, 0.3)',
      },
    },
  },

  // ===== 动画组合 (Animation Presets) =====
  presets: {
    // 页面级动效
    page: {
      enter: {
        duration: '300ms',
        easing: 'ease-out',
        keyframes: 'fadeInUp',
      },
      exit: {
        duration: '250ms',
        easing: 'ease-in',
        keyframes: 'fadeOutDown',
      },
      transition: {
        duration: '300ms',
        easing: 'ease-in-out',
      },
    },

    // 组件级动效
    component: {
      // 紧急热点卡片
      urgentCard: {
        pulse: {
          animation: 'pulseUrgent 2s infinite',
          timing: 'ease-in-out',
        },
        hover: {
          duration: '200ms',
          easing: 'spring-physics',
          effects: ['cardLift', 'edgeGlow'],
        },
      },

      // 高优先级卡片
      highPriorityCard: {
        float: {
          animation: 'floatHigh 3s ease-in-out infinite',
        },
        hover: {
          duration: '200ms',
          easing: 'spring-physics',
          effects: ['cardLift'],
        },
      },

      // 标准卡片
      standardCard: {
        hover: {
          duration: '300ms',
          easing: 'calm',
          effects: ['cardLift'],
        },
        expand: {
          duration: '400ms',
          easing: 'calm',
        },
      },

      // 数据统计卡片
      statCard: {
        numberRoll: {
          duration: '800ms',
          easing: 'overshoot',
          keyframes: 'numberRoll',
        },
        chartAppear: {
          duration: '600ms',
          easing: 'calm',
          stagger: '100ms',
        },
      },

      // 按钮
      button: {
        press: {
          duration: '150ms',
          easing: 'ease-out',
          transform: 'scale(0.95)',
        },
        particle: {
          duration: '500ms',
          easing: 'ease-out',
          keyframes: 'particleExplode',
        },
      },
    },

    // 数据状态动效
    data: {
      // 新热点发现
      newHotspot: {
        appear: {
          duration: '600ms',
          easing: 'bounce-soft',
          keyframes: 'bubbleUp',
        },
        importanceChange: {
          duration: '500ms',
          easing: 'ease-in-out',
          keyframes: 'importanceTransition',
        },
      },

      // 实时推送通知
      notification: {
        slideIn: {
          duration: '400ms',
          easing: 'overshoot',
          transform: 'translateX(0)',
        },
        slideOut: {
          duration: '300ms',
          easing: 'ease-in',
          transform: 'translateX(100%)',
        },
      },

      // 加载状态
      loading: {
        skeleton: {
          duration: '1.5s',
          easing: 'ease-in-out',
          keyframes: 'shimmer',
        },
        progress: {
          duration: '800ms',
          easing: 'ease-out',
        },
      },
    },

    // 品牌元素动效
    brand: {
      // 火焰脉冲图标
      flameIcon: {
        pulse: {
          animation: 'flamePulse 1.5s ease-in-out infinite',
        },
        hover: {
          duration: '300ms',
          easing: 'energetic',
          transform: 'scale(1.2)',
        },
      },

      // 雷达背景
      radarBackground: {
        scan: {
          animation: 'radarScan 8s linear infinite',
        },
        wave: {
          duration: '3s',
          easing: 'linear',
          opacity: '0.5 → 1 → 0.5',
        },
      },
    },
  },

  // ===== 情境化动画规则 (Context-aware Rules) =====
  contexts: {
    /**
     * 根据热点重要性返回动画配置
     */
    getHotspotAnimation: (importance: 'urgent' | 'high' | 'medium' | 'low') => {
      const configs = {
        urgent: {
          container: animations.presets.component.urgentCard,
          appear: animations.presets.data.newHotspot.appear,
          hover: animations.presets.component.urgentCard.hover,
        },
        high: {
          container: animations.presets.component.highPriorityCard,
          appear: animations.presets.data.newHotspot.appear,
          hover: animations.presets.component.highPriorityCard.hover,
        },
        medium: {
          container: animations.presets.component.standardCard,
          appear: { duration: '400ms', easing: 'calm' },
          hover: animations.presets.component.standardCard.hover,
        },
        low: {
          container: animations.presets.component.standardCard,
          appear: { duration: '300ms', easing: 'calm' },
          hover: animations.presets.component.standardCard.hover,
        },
      };
      return configs[importance];
    },

    /**
     * 根据用户操作返回反馈动画
     */
    getUserFeedback: (action: 'click' | 'hover' | 'drag' | 'success' | 'error') => {
      const feedbacks = {
        click: {
          button: animations.presets.component.button.press,
          particle: animations.presets.component.button.particle,
        },
        hover: {
          card: animations.presets.component.standardCard.hover,
          button: { duration: '200ms', easing: 'spring-physics' },
        },
        drag: {
          visual: { duration: '150ms', easing: 'ease-out' },
          drop: { duration: '300ms', easing: 'bounce-soft' },
        },
        success: {
          icon: { duration: '500ms', easing: 'bounce-soft' },
          message: { duration: '300ms', easing: 'ease-out' },
        },
        error: {
          shake: { duration: '500ms', easing: 'elastic', keyframes: 'shake' },
          pulse: { duration: '300ms', easing: 'urgent' },
        },
      };
      return feedbacks[action];
    },

    /**
     * 根据数据状态返回可视化动画
     */
    getDataVisualization: (state: 'loading' | 'updating' | 'real-time' | 'error') => {
      const visualizations = {
        loading: animations.presets.data.loading.skeleton,
        updating: {
          duration: '200ms',
          easing: 'calm',
          opacity: '0.8 → 1',
        },
        'real-time': {
          pulse: { duration: '2s', easing: 'ease-in-out', infinite: true },
          highlight: { duration: '300ms', easing: 'energetic' },
        },
        error: animations.contexts.getUserFeedback('error'),
      };
      return visualizations[state];
    },
  },

  // ===== 性能优化配置 (Performance Optimizations) =====
  performance: {
    // 使用 will-change 提示浏览器优化
    willChange: {
      transform: 'transform',
      opacity: 'opacity',
      contents: 'contents',
      scrollPosition: 'scroll-position',
    },

    // 建议的硬件加速属性
    gpuAccelerated: ['transform', 'opacity'],

    // 避免动画的属性（性能差）
    avoidAnimating: [
      'width',
      'height',
      'top',
      'left',
      'right',
      'bottom',
      'margin',
      'padding',
    ],

    // 帧率监测阈值
    frameBudget: '16ms', // 60fps

    // 简化动画的媒体查询（用户偏好减少动画）
    reducedMotion: '@media (prefers-reduced-motion: reduce)',
  },

  // ===== 工具函数 (Utility Functions) =====
  utils: {
    /**
     * 创建关键帧动画的 CSS 字符串
     */
    createKeyframes: (name: string, keyframes: Record<string, any>) => {
      const frames = Object.entries(keyframes)
        .map(([percentage, styles]) => {
          const styleString = Object.entries(styles)
            .map(([prop, value]) => `${prop}: ${value};`)
            .join(' ');
          return `${percentage} { ${styleString} }`;
        })
        .join(' ');

      return `@keyframes ${name} { ${frames} }`;
    },

    /**
     * 生成动画 CSS 属性
     */
    generateAnimation: (
      keyframes: string,
      duration: string = animations.durations.normal,
      easing: string = animations.easings['ease-out'],
      delay: string = '0ms',
      iterationCount: string = '1',
      fillMode: string = 'forwards'
    ) => {
      return {
        animationName: keyframes,
        animationDuration: duration,
        animationTimingFunction: easing,
        animationDelay: delay,
        animationIterationCount: iterationCount,
        animationFillMode: fillMode,
        willChange: 'transform, opacity',
      };
    },

    /**
     * 应用硬件加速
     */
    gpuAccelerate: () => ({
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
    }),
  },
} as const;

/**
 * 动画钩子配置
 * 用于 React 组件中的动画
 */
export const animationHooks = {
  // Framer Motion 预设
  framerMotion: {
    pageTransition: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    },
    cardHover: {
      whileHover: { y: -4, transition: { duration: 0.2 } },
      whileTap: { scale: 0.98, transition: { duration: 0.1 } },
    },
    urgencyPulse: {
      animate: { scale: [1, 1.05, 1] },
      transition: { duration: 2, repeat: Infinity },
    },
  },

  // React Spring 预设
  reactSpring: {
    numberCounter: {
      from: { value: 0 },
      to: { value: 1 },
      config: { tension: 120, friction: 14 },
    },
    cardEnter: {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 20 },
    },
  },
};

export type AnimationPreset = keyof typeof animations.presets;
export type AnimationContext = keyof typeof animations.contexts;