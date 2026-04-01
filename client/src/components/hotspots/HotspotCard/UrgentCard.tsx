'use client';

import { motion } from 'framer-motion';
import { Hotspot } from '../../../services/api';
import { cn } from '../../../lib/utils';
import {
  AlertTriangle,
  ExternalLink,
  Clock,
  Flame,
  TrendingUp,
  CheckCircle,
  XCircle
} from 'lucide-react';

export interface UrgentCardProps {
  hotspot: Hotspot;
  layout?: 'grid' | 'radar' | 'list';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

/**
 * 🔴 紧急热点卡片
 * 红色渐变 + 脉冲动画 + 危险图标
 * 用于重要性为 "urgent" 的热点
 */
export function UrgentCard({
  hotspot,
  layout = 'grid',
  onMouseEnter,
  onMouseLeave,
  onClick,
}: UrgentCardProps) {
  const {
    title,
    summary,
    source,
    relevance,
    isReal,
    publishedAt,
    viewCount,
    likeCount,
    retweetCount,
    authorName,
    url,
  } = hotspot;

  // 格式化时间
  const timeAgo = publishedAt
    ? new Date(publishedAt).toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '未知时间';

  // 紧急等级指示器
  const urgencyLevel = 'urgent';

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border-2',
        'bg-gradient-to-br from-[var(--urgency-urgent)] via-[var(--urgency-urgent-dark)] to-[#991b1b]',
        'border-[var(--urgency-urgent)]',
        'shadow-[0_0_40px_var(--urgency-urgent-glow)]',
        'transition-all duration-300',
        layout === 'grid' && 'w-full h-full',
        layout === 'list' && 'w-full',
        layout === 'radar' && 'w-64 h-80'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(239, 68, 68, 0.3)',
          '0 0 40px rgba(239, 68, 68, 0.5)',
          '0 0 20px rgba(239, 68, 68, 0.3)',
        ],
        scale: [1, 1.02, 1],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      {/* 脉冲动画层 */}
      <div className="absolute inset-0 animate-pulse-urgent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 危险图标装饰 */}
      <div className="absolute -top-3 -right-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-12 h-12 text-white/30" />
        </motion.div>
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* 标题行 */}
        <div className="flex items-start justify-between mb-4">
          <motion.h3
            className="text-xl font-bold text-white line-clamp-2"
            layoutId={`hotspot-title-${hotspot.id}`}
          >
            {title}
          </motion.h3>
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-5 h-5 text-white/70 hover:text-white" />
          </motion.div>
        </div>

        {/* 摘要 */}
        {summary && (
          <p className="text-white/80 text-sm mb-4 line-clamp-2 flex-grow">
            {summary}
          </p>
        )}

        {/* 元数据行 */}
        <div className="space-y-3 mt-auto">
          {/* 来源和真实性 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium text-white">
                {source.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                {isReal ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-xs text-emerald-300">真实</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-xs text-amber-300">疑似虚假</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{timeAgo}</span>
            </div>
          </div>

          {/* 数据指标 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 相关性 */}
              <div className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-white/70" />
                <span className="text-xs font-medium text-white">
                  {relevance}% 相关
                </span>
              </div>

              {/* 热度指标 */}
              {(viewCount || likeCount || retweetCount) && (
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs font-medium text-white">
                    {viewCount || likeCount || retweetCount} 热度
                  </span>
                </div>
              )}
            </div>

            {/* 作者信息 */}
            {authorName && (
              <div className="text-xs text-white/60 truncate max-w-[100px]">
                @{authorName}
              </div>
            )}
          </div>
        </div>

        {/* 紧急程度指示器 */}
        <div className="absolute bottom-2 right-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* 交互遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

// 辅助组件
function Target({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-4 h-4', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}