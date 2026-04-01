'use client';

import { motion } from 'framer-motion';
import { Hotspot } from '../../../services/api';
import { UrgentCard } from './UrgentCard';
import { HighPriorityCard } from './HighPriorityCard';
import { StandardCard } from './StandardCard';
import { cn } from '../../../lib/utils';

export interface HotspotCardProps {
  hotspot: Hotspot;
  className?: string;
  layout?: 'grid' | 'radar' | 'list';
  animate?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

/**
 * HotspotCard 主组件
 * 根据热点重要性自动选择合适的卡片变体
 *
 * - urgent: 🔴 紧急热点 - 红色渐变 + 脉冲动画 + 危险图标
 * - high: 🟠 高优先级 - 橙色渐变 + 轻微浮动动画
 * - medium/low: 🟢 标准卡片 - 悬停扩展效果
 */
export function HotspotCard({
  hotspot,
  className,
  layout = 'grid',
  animate = true,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: HotspotCardProps) {
  const { importance } = hotspot;

  // 根据布局和重要性确定动画配置
  const animationProps = {
    layout: animate ? 'position' : false,
    initial: animate ? { opacity: 0, y: 20 } : undefined,
    animate: animate ? { opacity: 1, y: 0 } : undefined,
    exit: animate ? { opacity: 0, y: -20 } : undefined,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
    whileHover: layout !== 'radar' ? { y: -4 } : undefined,
    whileTap: { scale: 0.98 },
  };

  // 根据重要性选择卡片变体
  const renderCard = () => {
    switch (importance) {
      case 'urgent':
        return (
          <UrgentCard
            hotspot={hotspot}
            layout={layout}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          />
        );
      case 'high':
        return (
          <HighPriorityCard
            hotspot={hotspot}
            layout={layout}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          />
        );
      case 'medium':
      case 'low':
      default:
        return (
          <StandardCard
            hotspot={hotspot}
            importance={importance}
            layout={layout}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          />
        );
    }
  };

  return (
    <motion.div
      {...animationProps}
      className={cn(
        'relative transition-all duration-300',
        layout === 'radar' && 'absolute',
        className
      )}
      style={
        layout === 'radar'
          ? {
              // 雷达布局中的位置将在父组件中计算
              transform: 'translate(var(--radar-x), var(--radar-y))',
            }
          : undefined
      }
    >
      {renderCard()}
    </motion.div>
  );
}

// 导出卡片变体以便单独使用
export { UrgentCard, HighPriorityCard, StandardCard };