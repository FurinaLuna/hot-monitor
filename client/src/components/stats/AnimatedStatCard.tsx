'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
  AlertTriangle,
  Clock,
  Zap,
  Target,
  Eye,
} from 'lucide-react';

export interface AnimatedStatCardProps {
  title: string;
  value: number;
  previousValue?: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'cyan' | 'emerald' | 'amber' | 'red' | 'violet';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  description?: string;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
  className?: string;
  showSparkline?: boolean;
  sparklineData?: number[];
}

/**
 * 动画统计卡片组件
 * 实时数字滚动动画 + 微型趋势图表
 */
export function AnimatedStatCard({
  title,
  value,
  previousValue,
  unit = '',
  icon,
  color = 'blue',
  trend,
  trendValue,
  description,
  animate = true,
  delay = 0,
  onClick,
  className,
  showSparkline = false,
  sparklineData = [],
}: AnimatedStatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const prevValueRef = useRef(value);

  // 颜色映射
  const colorClasses = {
    blue: {
      bg: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
    },
    cyan: {
      bg: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
    },
    emerald: {
      bg: 'from-emerald-500/20 to-green-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
    },
    amber: {
      bg: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/20',
    },
    red: {
      bg: 'from-red-500/20 to-rose-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      iconBg: 'bg-red-500/20',
    },
    violet: {
      bg: 'from-violet-500/20 to-purple-500/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      iconBg: 'bg-violet-500/20',
    },
  };

  const colors = colorClasses[color];

  // 计算趋势
  const computedTrend = trend || (previousValue !== undefined
    ? value > previousValue ? 'up' : value < previousValue ? 'down' : 'stable'
    : 'stable');

  const computedTrendValue = trendValue || (previousValue !== undefined
    ? Math.abs(((value - previousValue) / (previousValue || 1)) * 100)
    : 0);

  // 数字滚动动画
  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    const timer = setTimeout(() => {
      spring.set(value);
    }, delay);

    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [value, animate, delay, spring]);

  // 生成迷你趋势图
  const renderSparkline = () => {
    if (!showSparkline || sparklineData.length < 2) return null;

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const width = 60;
    const height = 20;
    const pointWidth = width / (sparklineData.length - 1);

    const points = sparklineData.map((val, i) => {
      const x = i * pointWidth;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const isPositiveTrend = sparklineData[sparklineData.length - 1] > sparklineData[0];

    return (
      <svg
        className="absolute bottom-2 right-2"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <polyline
          points={points}
          fill="none"
          stroke={isPositiveTrend ? '#10b981' : '#ef4444'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 最后一个点 */}
        <circle
          cx={(sparklineData.length - 1) * pointWidth}
          cy={height - ((sparklineData[sparklineData.length - 1] - min) / range) * height}
          r="1.5"
          fill="white"
        />
      </svg>
    );
  };

  // 获取趋势图标
  const getTrendIcon = () => {
    switch (computedTrend) {
      case 'up':
        return <TrendingUp className="w-3.5 h-3.5" />;
      case 'down':
        return <TrendingDown className="w-3.5 h-3.5" />;
      default:
        return <Minus className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border',
        colors.bg,
        colors.border,
        'p-4 transition-all duration-300',
        'group cursor-pointer',
        onClick && 'hover:scale-[1.02] hover:border-opacity-50',
        className
      )}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 标题行 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className={cn('p-1.5 rounded-lg', colors.iconBg)}>
              {icon}
            </div>
          )}
          <h3 className="text-sm font-semibold text-white/90">{title}</h3>
        </div>

        {/* 趋势指示器 */}
        <div className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
          computedTrend === 'up' && 'bg-emerald-500/20 text-emerald-400',
          computedTrend === 'down' && 'bg-red-500/20 text-red-400',
          computedTrend === 'stable' && 'bg-slate-500/20 text-slate-400'
        )}>
          {getTrendIcon()}
          {previousValue !== undefined && (
            <span>
              {computedTrend === 'up' ? '+' : computedTrend === 'down' ? '-' : ''}
              {computedTrendValue.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* 数值展示 */}
      <div className="mb-2">
        <div className="flex items-baseline gap-1">
          <motion.span
            className={cn('text-3xl font-bold', colors.text)}
            key={value}
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayValue.toLocaleString()}
          </motion.span>
          {unit && <span className="text-lg text-white/60">{unit}</span>}
        </div>

        {/* 数值变化动画 */}
        {previousValue !== undefined && (
          <motion.div
            className="text-xs text-white/50 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            较之前: {previousValue.toLocaleString()}
          </motion.div>
        )}
      </div>

      {/* 描述文本 */}
      {description && (
        <p className="text-sm text-white/70 mb-3 line-clamp-2">{description}</p>
      )}

      {/* 迷你趋势图 */}
      {renderSparkline()}

      {/* 点击提示 */}
      {onClick && (
        <div className="absolute bottom-2 left-4 text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          点击查看详情 →
        </div>
      )}

      {/* 边缘发光效果 */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-300 pointer-events-none" />

      {/* 粒子动画效果（悬停时） */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        whileHover={{
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

// 预定义图标卡片变体
export function TotalHotspotsCard({ value, trend }: { value: number; trend?: number }) {
  return (
    <AnimatedStatCard
      title="热点总数"
      value={value}
      icon={<Flame className="w-4 h-4 text-white" />}
      color="red"
      trendValue={trend}
      description="监控到的热点总数"
      showSparkline
    />
  );
}

export function UrgentHotspotsCard({ value, trend }: { value: number; trend?: number }) {
  return (
    <AnimatedStatCard
      title="紧急热点"
      value={value}
      icon={<AlertTriangle className="w-4 h-4 text-white" />}
      color="amber"
      trendValue={trend}
      description="需要立即关注的紧急热点"
      showSparkline
    />
  );
}

export function TodayHotspotsCard({ value, trend }: { value: number; trend?: number }) {
  return (
    <AnimatedStatCard
      title="今日新增"
      value={value}
      icon={<Clock className="w-4 h-4 text-white" />}
      color="cyan"
      trendValue={trend}
      description="过去24小时内新增热点"
      showSparkline
    />
  );
}

export function AvgRelevanceCard({ value, trend }: { value: number; trend?: number }) {
  return (
    <AnimatedStatCard
      title="平均相关性"
      value={value}
      unit="%"
      icon={<Target className="w-4 h-4 text-white" />}
      color="emerald"
      trendValue={trend}
      description="热点与关键词的平均相关性"
      showSparkline
    />
  );
}

export function RealHotspotsCard({ value, trend }: { value: number; trend?: number }) {
  return (
    <AnimatedStatCard
      title="真实热点"
      value={value}
      unit="%"
      icon={<Eye className="w-4 h-4 text-white" />}
      color="blue"
      trendValue={trend}
      description="经AI验证的真实热点比例"
      showSparkline
    />
  );
}