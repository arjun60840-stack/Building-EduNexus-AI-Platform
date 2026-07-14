'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change: number | string;
  trend: 'up' | 'down';
  gradientFrom: string;
  gradientTo: string;
  sparklineData?: { value: number }[];
  index?: number;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  change,
  trend,
  gradientFrom,
  gradientTo,
  sparklineData,
  index = 0,
}: StatCardProps) {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-5 relative overflow-hidden group"
    >
      {/* Background Gradient Blur */}
      <div
        className={cn(
          'absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-30',
        )}
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              boxShadow: `0 8px 24px ${gradientFrom}33`,
            }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
          <p className="text-2xl font-bold text-text-primary tracking-tight">{value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold',
                isPositive
                  ? 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-400'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400'
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-text-muted">vs last month</span>
          </div>
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-24 h-14 -mr-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={`spark-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={gradientFrom} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={gradientFrom}
                  strokeWidth={2}
                  fill={`url(#spark-${title.replace(/\s/g, '')})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
