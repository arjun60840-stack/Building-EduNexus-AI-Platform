'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  timeRanges?: string[];
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  timeRanges = ['7D', '1M', '3M', '6M', '1Y'],
  children,
  className,
}: ChartCardProps) {
  const [activeRange, setActiveRange] = useState(timeRanges[2] || timeRanges[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn('glass-card p-5 lg:p-6', className)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-text-primary">{title}</h3>
          {subtitle && (
            <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        {timeRanges.length > 0 && (
          <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-tertiary/60 border border-border/40">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                  activeRange === range
                    ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/25'
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chart Content */}
      <div>{children}</div>
    </motion.div>
  );
}
