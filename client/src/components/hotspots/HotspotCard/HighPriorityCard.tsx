'use client';

import { motion } from 'framer-motion';
import { Hotspot } from '../../../services/api';
import { cn } from '../../../lib/utils';
import {
  ExternalLink,
  Clock,
  Flame,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export interface HighPriorityCardProps {
  hotspot: Hotspot;
  layout?: 'grid' | 'radar' | 'list';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

/**
 * 🟠 高优先级卡片
 * 橙色渐变 + 轻微浮动动画
 * 用于重要性为 "high" 的热点
 */
export function HighPriorityCard({
  hotspot,
  layout = 'grid',
  onMouseEnter,
  onMouseLeave,
  onClick,
}: HighPriorityCardProps) {
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
    keyword,
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

  // 浮动动画配置
  const floatAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border',
        'bg-gradient-to-br from-[var(--urgency-high)] via-[var(--urgency-high-dark)] to-[#92400e]',
        'border-[var(--urgency-high)]/40',
        'shadow-[0_8px_32px_var(--urgency-high-glow)]',
        'transition-all duration-300',
        layout === 'grid' && 'w-full h-full',
        layout === 'list' && 'w-full',
        layout === 'radar' && 'w-60 h-72'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      animate={floatAnimation}
    >
      {/* 渐变装饰层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />

      {/* 高优先级徽章 */}
      <div className="absolute -top-2 -right-2">
        <motion.div
          className="px-2 py-1 rounded-full bg-[var(--urgency-high)] text-white text-xs font-bold shadow-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          高
        </motion.div>
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* 标题行 */}
        <div className="flex items-start justify-between mb-3">
          <motion.h3
            className="text-lg font-bold text-white line-clamp-2"
            layoutId={`hotspot-title-${hotspot.id}`}
          >
            {title}
          </motion.h3>
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-4 h-4 text-white/70 hover:text-white" />
          </motion.div>
        </div>

        {/* 关键词标签 */}
        {keyword && (
          <div className="mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-white/10 text-white/80 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              {keyword.text}
            </span>
          </div>
        )}

        {/* 摘要 */}
        {summary && (
          <p className="text-white/80 text-sm mb-4 line-clamp-3 flex-grow">
            {summary}
          </p>
        )}

        {/* 元数据行 */}
        <div className="space-y-3 mt-auto">
          {/* 来源和真实性 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white/15 rounded-full text-xs font-medium text-white">
                {source.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                {isReal ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-emerald-300" />
                    <span className="text-xs text-emerald-300">真实</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 text-amber-300" />
                    <span className="text-xs text-amber-300">疑似虚假</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{timeAgo}</span>
            </div>
          </div>

          {/* 数据指标条 */}
          <div className="flex items-center justify-between">
            {/* 相关性进度条 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/70">相关性</span>
                <span className="text-xs font-medium text-white">
                  {relevance}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--urgency-high)] to-[var(--urgency-high-light)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${relevance}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            {/* 热度指标 */}
            {(viewCount || likeCount || retweetCount) && (
              <div className="flex items-center gap-1 ml-4">
                <Flame className="w-3 h-3 text-white/70" />
                <span className="text-xs font-medium text-white">
                  {viewCount || likeCount || retweetCount}
                </span>
              </div>
            )}
          </div>

          {/* 作者信息 */}
          {authorName && (
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/60 truncate max-w-[120px]">
                来源: {authorName}
              </div>
              <AlertCircle className="w-3 h-3 text-white/40" />
            </div>
          )}
        </div>
      </div>

      {/* 交互效果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* 边缘发光效果 */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
    </motion.div>
  );
}