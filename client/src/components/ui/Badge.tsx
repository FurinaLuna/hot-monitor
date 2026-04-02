import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'urgent' | 'high' | 'medium' | 'low' | 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles = {
  urgent: 'bg-red-500/20 text-red-400 border-red-500/30 glow-red',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30 glow-amber',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  default: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  animated = false,
  pulse = false,
  className,
  icon,
}: BadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-1.5 rounded-full border font-medium',
    variantStyles[variant],
    sizeStyles[size],
    pulse && 'animate-pulse-soft',
    className
  );

  if (animated) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={baseClasses}
      >
        {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
        {children}
      </motion.span>
    );
  }

  return (
    <span className={baseClasses}>
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
}

// 便捷组件 - 重要程度徽章
interface ImportanceBadgeProps {
  importance: 'urgent' | 'high' | 'medium' | 'low';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const importanceConfig = {
  urgent: { label: '紧急', icon: '🔴', variant: 'urgent' as const },
  high: { label: '高', icon: '🟠', variant: 'high' as const },
  medium: { label: '中', icon: '🟡', variant: 'medium' as const },
  low: { label: '低', icon: '🟢', variant: 'low' as const },
};

export function ImportanceBadge({
  importance,
  showIcon = true,
  size = 'md',
  className,
}: ImportanceBadgeProps) {
  const config = importanceConfig[importance];

  return (
    <Badge
      variant={config.variant}
      size={size}
      animated
      pulse={importance === 'urgent' || importance === 'high'}
      className={className}
    >
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </Badge>
  );
}

// 便捷组件 - 来源徽章
interface SourceBadgeProps {
  source: 'twitter' | 'bing' | 'google' | 'weibo' | 'bilibili' | 'hackernews' | string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sourceConfig: Record<string, { label: string; color: string; icon?: string }> = {
  twitter: { label: 'Twitter', color: 'text-twitter', icon: '🐦' },
  bing: { label: 'Bing', color: 'text-bing', icon: '🔍' },
  google: { label: 'Google', color: 'text-google', icon: '🔍' },
  weibo: { label: '微博', color: 'text-weibo', icon: '🌶️' },
  bilibili: { label: 'B 站', color: 'text-bilibili', icon: '📺' },
  hackernews: { label: 'HN', color: 'text-hackernews', icon: '📰' },
};

export function SourceBadge({
  source,
  showIcon = true,
  size = 'sm',
  className,
}: SourceBadgeProps) {
  const config = sourceConfig[source.toLowerCase()] || { label: source, color: 'text-slate-400', icon: '📄' };

  return (
    <Badge
      variant="default"
      size={size}
      className={cn(config.color, className)}
    >
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </Badge>
  );
}
