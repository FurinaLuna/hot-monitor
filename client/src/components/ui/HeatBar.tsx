import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface HeatBarProps {
  value: number; // 0-100
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { bar: 'w-20 h-1.5', label: 'text-xs' },
  md: { bar: 'w-28 h-2', label: 'text-sm' },
  lg: { bar: 'w-40 h-2.5', label: 'text-base' },
};

function getHeatColor(value: number): string {
  if (value >= 80) return 'from-red-500 via-pink-500 to-rose-500';
  if (value >= 60) return 'from-orange-500 via-red-500 to-pink-500';
  if (value >= 40) return 'from-amber-500 via-orange-500 to-red-500';
  if (value >= 20) return 'from-cyan-500 via-blue-500 to-purple-500';
  return 'from-slate-500 via-slate-600 to-slate-700';
}

function getHeatLabel(value: number): string {
  if (value >= 80) return '爆';
  if (value >= 60) return '热';
  if (value >= 40) return '温';
  if (value >= 20) return '凉';
  return '冷';
}

function getGlowColor(value: number): string {
  if (value >= 80) return 'shadow-red-500/50';
  if (value >= 60) return 'shadow-orange-500/50';
  if (value >= 40) return 'shadow-amber-500/50';
  return '';
}

export function HeatBar({
  value = 0,
  showLabel = true,
  animated = true,
  className,
  size = 'md',
}: HeatBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const heatColor = getHeatColor(normalizedValue);
  const heatLabel = getHeatLabel(normalizedValue);
  const glowColor = getGlowColor(normalizedValue);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'relative rounded-full bg-slate-800 overflow-hidden',
        sizeStyles[size].bar
      )}>
        {/* 渐变背景条 */}
        <motion.div
          initial={animated ? { width: 0 } : false}
          animate={animated ? { width: `${normalizedValue}%` } : { width: `${normalizedValue}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            'bg-gradient-to-r',
            heatColor
          )}
        />

        {/* 光效叠加 */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-r from-transparent via-white/20 to-transparent',
            'animate-shimmer'
          )}
          style={{
            backgroundSize: '200% 100%',
          }}
        />

        {/* 外发光 */}
        {normalizedValue >= 60 && (
          <div className={cn(
            'absolute inset-0 rounded-full',
            'shadow-lg',
            glowColor
          )} />
        )}
      </div>

      {showLabel && (
        <motion.span
          initial={animated ? { opacity: 0, scale: 0.8 } : false}
          animate={animated ? { opacity: 1, scale: 1 } : false}
          transition={{ duration: 0.3, delay: 0.5 }}
          className={cn(
            'font-bold font-tabular min-w-[24px] text-center',
            sizeStyles[size].label,
            normalizedValue >= 80 ? 'text-red-400' :
            normalizedValue >= 60 ? 'text-orange-400' :
            normalizedValue >= 40 ? 'text-amber-400' :
            normalizedValue >= 20 ? 'text-cyan-400' :
            'text-slate-500'
          )}
        >
          {heatLabel}
        </motion.span>
      )}
    </div>
  );
}
