'use client';

import { motion } from 'framer-motion';
import { Hotspot } from '../../../services/api';
import { HotspotCard } from '../HotspotCard';
import { cn } from '../../../lib/utils';
import { useMemo } from 'react';

export interface HotspotRadarProps {
  hotspots: Hotspot[];
  className?: string;
  width?: number;
  height?: number;
  onHotspotClick?: (hotspot: Hotspot) => void;
  onHotspotHover?: (hotspot: Hotspot | null) => void;
}

/**
 * HotspotRadar 雷达扫描布局
 * 热点按重要性和时间动态排布在雷达图上
 *
 * 布局算法：
 * 1. 紧急热点：靠近中心，红色区域
 * 2. 高优先级：中间环，橙色区域
 * 3. 中低优先级：外环，绿色/蓝色区域
 * 4. 时间维度：角度表示时间新旧
 */
export function HotspotRadar({
  hotspots,
  className,
  width = 800,
  height = 600,
  onHotspotClick,
  onHotspotHover,
}: HotspotRadarProps) {
  // 雷达半径（减去卡片边距）
  const radarRadius = Math.min(width, height) * 0.4;
  const centerX = width / 2;
  const centerY = height / 2;

  // 计算热点在雷达上的位置
  const positionedHotspots = useMemo(() => {
    // 按重要性分组
    const groups = {
      urgent: hotspots.filter(h => h.importance === 'urgent'),
      high: hotspots.filter(h => h.importance === 'high'),
      medium: hotspots.filter(h => h.importance === 'medium'),
      low: hotspots.filter(h => h.importance === 'low'),
    };

    const now = Date.now();
    const positions: Array<{
      hotspot: Hotspot;
      x: number;
      y: number;
      rotation: number;
      scale: number;
    }> = [];

    // 计算每个热点的位置
    Object.entries(groups).forEach(([importance, groupHotspots]) => {
      groupHotspots.forEach((hotspot, index) => {
        // 根据重要性确定半径
        let radius = radarRadius * 0.3; // 紧急热点：内环
        if (importance === 'high') radius = radarRadius * 0.5; // 高优先级：中环
        if (importance === 'medium') radius = radarRadius * 0.7; // 中等：外环
        if (importance === 'low') radius = radarRadius * 0.9; // 低优先级：最外环

        // 根据时间确定角度（新热点角度小，旧热点角度大）
        const publishedTime = hotspot.publishedAt ? new Date(hotspot.publishedAt).getTime() : now;
        const timeDiff = now - publishedTime;
        const maxTimeDiff = 7 * 24 * 60 * 60 * 1000; // 一周
        const timeRatio = Math.min(timeDiff / maxTimeDiff, 1);
        const baseAngle = (timeRatio * 270 + 45) * (Math.PI / 180); // 45°到315°

        // 添加一些随机偏移避免重叠
        const angleNoise = (Math.random() - 0.5) * 0.5;
        const angle = baseAngle + angleNoise;

        // 添加径向随机偏移
        const radiusNoise = (Math.random() - 0.5) * radius * 0.1;
        const finalRadius = Math.max(radius * 0.5, radius + radiusNoise);

        // 计算笛卡尔坐标
        const x = centerX + finalRadius * Math.cos(angle);
        const y = centerY + finalRadius * Math.sin(angle);

        // 根据重要性确定缩放
        let scale = 1;
        if (importance === 'urgent') scale = 1.1;
        if (importance === 'high') scale = 1.05;

        // 轻微旋转卡片使其朝向中心
        const rotation = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;

        positions.push({
          hotspot,
          x,
          y,
          rotation,
          scale,
        });
      });
    });

    return positions;
  }, [hotspots, radarRadius, centerX, centerY]);

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      {/* 雷达背景 */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-[var(--brand-radar-grid)]">
        {/* 雷达网格线 */}
        <svg className="absolute inset-0 w-full h-full">
          {/* 同心圆网格 */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => (
            <circle
              key={`circle-${i}`}
              cx={centerX}
              cy={centerY}
              r={radarRadius * ratio}
              fill="none"
              stroke="var(--brand-radar-grid)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* 放射状线 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x2 = centerX + radarRadius * Math.cos(angle);
            const y2 = centerY + radarRadius * Math.sin(angle);
            return (
              <line
                key={`line-${i}`}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="var(--brand-radar-grid)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}
        </svg>

        {/* 雷达扫描线动画 */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            transformOrigin: `${centerX}px ${centerY}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-0 h-0">
            <div className="absolute w-[2px] h-[calc(100%-100px)] bg-gradient-to-b from-transparent via-[var(--brand-radar-scan)] to-transparent -translate-x-1/2 -translate-y-full" />
          </div>
        </motion.div>

        {/* 中心点 */}
        <div
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[var(--brand-radar-scan)] to-[var(--brand-radar-wave)]"
          style={{ left: centerX - 8, top: centerY - 8 }}
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--brand-radar-scan)] opacity-30" />
        </div>

        {/* 重要性区域指示 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 紧急区域 */}
          <div
            className="absolute rounded-full border-2 border-[var(--urgency-urgent)]/20"
            style={{
              left: centerX - radarRadius * 0.3,
              top: centerY - radarRadius * 0.3,
              width: radarRadius * 0.6,
              height: radarRadius * 0.6,
            }}
          />
          {/* 高优先级区域 */}
          <div
            className="absolute rounded-full border-2 border-[var(--urgency-high)]/15"
            style={{
              left: centerX - radarRadius * 0.5,
              top: centerY - radarRadius * 0.5,
              width: radarRadius,
              height: radarRadius,
            }}
          />
          {/* 中低优先级区域 */}
          <div
            className="absolute rounded-full border-2 border-[var(--urgency-low)]/10"
            style={{
              left: centerX - radarRadius * 0.9,
              top: centerY - radarRadius * 0.9,
              width: radarRadius * 1.8,
              height: radarRadius * 1.8,
            }}
          />
        </div>
      </div>

      {/* 热点卡片 */}
      {positionedHotspots.map(({ hotspot, x, y, rotation, scale }) => (
        <motion.div
          key={hotspot.id}
          className="absolute top-0 left-0"
          style={{
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
            transformOrigin: 'center',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: Math.random() * 0.3,
          }}
          whileHover={{ scale: scale * 1.1, zIndex: 50 }}
          onMouseEnter={() => onHotspotHover?.(hotspot)}
          onMouseLeave={() => onHotspotHover?.(null)}
          onClick={() => onHotspotClick?.(hotspot)}
        >
          <div style={{ transform: `rotate(${-rotation}deg)` }}>
            <HotspotCard
              hotspot={hotspot}
              layout="radar"
              animate={false}
              className="cursor-pointer"
            />
          </div>
        </motion.div>
      ))}

      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--urgency-urgent)]" />
            <span className="text-white/80">紧急热点</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--urgency-high)]" />
            <span className="text-white/80">高优先级</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--urgency-medium)]" />
            <span className="text-white/80">中等优先级</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--urgency-low)]" />
            <span className="text-white/80">低优先级</span>
          </div>
        </div>
      </div>
    </div>
  );
}