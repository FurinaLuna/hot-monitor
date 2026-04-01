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
  ChevronRight,
} from 'lucide-react';

export interface StandardCardProps {
  hotspot: Hotspot;
  importance: 'medium' | 'low';
  layout?: 'grid' | 'radar' | 'list';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

/**
 * 🟢 标准热点卡片
 * 用于重要性为 "medium" 或 "low" 的热点
 * 基础卡片样式 + 悬停扩展效果
 */
export function StandardCard({
  hotspot,
  importance,
  layout = 'grid',
  onMouseEnter,
  onMouseLeave,
  onClick,
}: StandardCardProps) {
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

  // 根据重要性选择颜色变量
  const colorVars = {
    medium: {
      bg: 'bg-gradient-to-br from-[var(--urgency-medium)]/20 to-[var(--urgency-medium)]/5',
      border: 'border-[var(--urgency-medium)]/30',
      glow: 'var(--urgency-medium-glow)',
      text: 'text-[var(--urgency-medium)]',
    },
    low: {
      bg: 'bg-gradient-to-br from-[var(--urgency-low)]/20 to-[var(--urgency-low)]/5',
      border: 'border-[var(--urgency-low)]/30',
      glow: 'var(--urgency-low-glow)',
      text: 'text-[var(--urgency-low)]',
    },
  };

  const colors = colorVars[importance];

  // 格式化时间
  const timeAgo = publishedAt
    ? new Date(publishedAt).toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '未知时间';

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl border',
        colors.bg,
        colors.border,
        'transition-all duration-300',
        'group', // 用于悬停效果
        layout === 'grid' && 'w-full h-full',
        layout === 'list' && 'w-full',
        layout === 'radar' && 'w-56 h-64'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 悬停扩展效果层 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* 重要性指示器 */}
      <div className="absolute top-3 left-3">
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            importance === 'medium' ? 'bg-[var(--urgency-medium)]' : 'bg-[var(--urgency-low)]'
          )}
        />
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* 标题行 */}
        <div className="flex items-start justify-between mb-2">
          <motion.h3
            className="text-base font-semibold text-white line-clamp-2 pr-2"
            layoutId={`hotspot-title-${hotspot.id}`}
          >
            {title}
          </motion.h3>
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-4 h-4 text-white/50 hover:text-white" />
          </motion.div>
        </div>

        {/* 关键词标签 */}
        {keyword && (
          <div className="mb-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/5 text-white/60 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              {keyword.text}
            </span>
          </div>
        )}

        {/* 摘要 - 悬停时显示更多 */}
        {summary && (
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: 'auto' }}
          >
            <p className="text-white/70 text-sm line-clamp-2 group-hover:line-clamp-4 transition-all duration-300">
              {summary}
            </p>
          </motion.div>
        )}

        {/* 元数据行 */}
        <div className="space-y-2 mt-auto pt-3 border-t border-white/10">
          {/* 来源和真实性 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-medium text-white/80">
                {source.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                {isReal ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">真实</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400">疑似虚假</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/50">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{timeAgo}</span>
            </div>
          </div>

          {/* 数据指标条 */}
          <div className="flex items-center justify-between">
            {/* 相关性 */}
            <div className="flex items-center gap-1">
              <div className="w-6 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={cn('h-full', colors.text)}
                  initial={{ width: 0 }}
                  animate={{ width: `${relevance}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              </div>
              <span className="text-xs font-medium text-white/80">
                {relevance}%
              </span>
            </div>

            {/* 热度指标 */}
            {(viewCount || likeCount || retweetCount) && (
              <div className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-white/60" />
                <span className="text-xs font-medium text-white/80">
                  {viewCount || likeCount || retweetCount}
                </span>
              </div>
            )}
          </div>

          {/* 作者信息和查看更多 */}
          <div className="flex items-center justify-between">
            {authorName && (
              <div className="text-xs text-white/50 truncate max-w-[100px]">
                @{authorName}
              </div>
            )}
            <motion.div
              className="flex items-center gap-1 text-xs text-white/60"
              whileHover={{ x: 2 }}
            >
              <span>详情</span>
              <ChevronRight className="w-3 h-3" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 悬停边缘发光效果 */}
      <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/10 transition-all duration-300 pointer-events-none" />

      {/* 悬停时显示的扩展信息 */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0 group-hover:h-8 bg-gradient-to-t from-black/30 to-transparent overflow-hidden transition-all duration-300"
        initial={false}
      >
        <div className="p-2 text-center text-xs text-white/60">
          点击查看完整内容
        </div>
      </motion.div>
    </motion.div>
  );
}