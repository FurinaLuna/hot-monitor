import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  gradient?: 'primary' | 'hot' | 'ai' | 'success';
  className?: string;
  delay?: number;
}

const gradientBg = {
  primary: 'from-blue-500/10 to-cyan-500/5',
  hot: 'from-orange-500/10 to-pink-500/5',
  ai: 'from-purple-500/10 to-cyan-500/5',
  success: 'from-emerald-500/10 to-blue-500/5',
};

const gradientBorder = {
  primary: 'border-blue-500/30',
  hot: 'border-orange-500/30',
  ai: 'border-purple-500/30',
  success: 'border-emerald-500/30',
};

const iconGlow = {
  primary: 'text-cyan-400 glow-cyan',
  hot: 'text-pink-400 glow-pink',
  ai: 'text-purple-400 glow-purple',
  success: 'text-emerald-400 glow-emerald',
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  gradient = 'primary',
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        'relative overflow-hidden rounded-xl p-4',
        'bg-gradient-to-br',
        gradientBg[gradient],
        'border',
        gradientBorder[gradient],
        'transition-all duration-300',
        'hover:shadow-lg',
        className
      )}
    >
      {/* 光晕背景 */}
      <div className={cn(
        'absolute -top-10 -right-10 w-32 h-32 rounded-full',
        'bg-gradient-to-br',
        gradientBg[gradient],
        'opacity-50 blur-2xl'
      )} />

      {/* 脉动边框效果 */}
      <div className="absolute inset-0 rounded-xl border border-white/5 animate-pulse-soft" />

      {/* 内容 */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={cn('w-5 h-5', iconGlow[gradient])} />
          <span className="text-sm text-slate-400">{label}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="flex items-baseline gap-2"
        >
          <span className="text-3xl font-bold text-white font-tabular">
            {value}
          </span>
          {trend && (
            <span className={cn(
              'text-xs font-medium px-1.5 py-0.5 rounded-full',
              trend.value >= 0
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            )}>
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </span>
          )}
        </motion.div>

        {trend && (
          <p className="text-xs text-slate-500 mt-1">{trend.label}</p>
        )}
      </div>
    </motion.div>
  );
}
