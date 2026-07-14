'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  School,
  Clock,
  ClipboardList,
  Trophy,
  ClipboardCheck,
  PenTool,
  FileBarChart,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Timer,
  User,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { cn } from '@/lib/utils';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const classPerformanceData = [
  { class: '8-A', avg: 82, color: '#10B981' },
  { class: '8-B', avg: 76, color: '#F59E0B' },
  { class: '9-A', avg: 88, color: '#10B981' },
  { class: '9-B', avg: 71, color: '#EF4444' },
  { class: '10-A', avg: 84, color: '#10B981' },
];

const todaySchedule = [
  { time: '8:00 AM', subject: 'Mathematics', class: 'Class 10-A', room: 'Room 201', status: 'completed' as const },
  { time: '9:00 AM', subject: 'Mathematics', class: 'Class 9-A', room: 'Room 205', status: 'completed' as const },
  { time: '10:00 AM', subject: 'Physics', class: 'Class 10-B', room: 'Lab 3', status: 'current' as const },
  { time: '11:30 AM', subject: 'Mathematics', class: 'Class 8-A', room: 'Room 201', status: 'upcoming' as const },
  { time: '1:00 PM', subject: 'Physics', class: 'Class 9-B', room: 'Lab 3', status: 'upcoming' as const },
  { time: '2:00 PM', subject: 'Mathematics', class: 'Class 8-B', room: 'Room 201', status: 'upcoming' as const },
];

const recentSubmissions = [
  { id: 1, student: 'Aarav Sharma', assignment: 'Quadratic Equations', class: '10-A', time: '10 min ago', status: 'submitted' as const },
  { id: 2, student: 'Priya Singh', assignment: 'Newton\'s Laws', class: '9-A', time: '25 min ago', status: 'late' as const },
  { id: 3, student: 'Rohan Gupta', assignment: 'Linear Algebra', class: '8-A', time: '1 hr ago', status: 'submitted' as const },
  { id: 4, student: 'Ananya Patel', assignment: 'Trigonometry', class: '10-A', time: '2 hrs ago', status: 'submitted' as const },
  { id: 5, student: 'Vikram Reddy', assignment: 'Optics Worksheet', class: '9-B', time: '3 hrs ago', status: 'late' as const },
];

const quickActions = [
  { label: 'Mark Attendance', icon: ClipboardCheck, gradient: 'from-primary-500 to-primary-600', shadow: 'shadow-primary-500/20' },
  { label: 'Create Homework', icon: BookOpen, gradient: 'from-secondary-500 to-secondary-600', shadow: 'shadow-secondary-500/20' },
  { label: 'Generate Quiz', icon: PenTool, gradient: 'from-accent-500 to-accent-600', shadow: 'shadow-accent-500/20' },
  { label: 'View Reports', icon: FileBarChart, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20' },
];

const sparkClasses = [{ value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }];
const sparkPeriods = [{ value: 5 }, { value: 6 }, { value: 5 }, { value: 7 }, { value: 6 }, { value: 6 }, { value: 6 }];
const sparkHomework = [{ value: 18 }, { value: 16 }, { value: 15 }, { value: 14 }, { value: 13 }, { value: 12 }, { value: 12 }];
const sparkScore = [{ value: 74 }, { value: 75 }, { value: 76 }, { value: 77 }, { value: 76 }, { value: 78 }, { value: 78 }];

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-card !rounded-lg px-3 py-2 shadow-xl border border-border/50" style={{ pointerEvents: 'none' }}>
      <p className="text-xs font-semibold text-text-primary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs text-text-secondary">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout role="teacher">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
          Good afternoon, Rajesh! 📚
        </h1>
        <p className="text-sm text-text-muted mt-1">
          You have 6 periods scheduled today. 3 completed, 1 ongoing.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-6">
        <StatCard icon={School} title="My Classes" value="5" change={0} trend="up" gradientFrom="#2563EB" gradientTo="#3B82F6" sparklineData={sparkClasses} index={0} />
        <StatCard icon={Clock} title="Today's Periods" value="6" change={0} trend="up" gradientFrom="#8B5CF6" gradientTo="#A78BFA" sparklineData={sparkPeriods} index={1} />
        <StatCard icon={ClipboardList} title="Pending Homework" value="12" change={5.2} trend="down" gradientFrom="#F59E0B" gradientTo="#FBBF24" sparklineData={sparkHomework} index={2} />
        <StatCard icon={Trophy} title="Average Score" value="78%" change={3.4} trend="up" gradientFrom="#10B981" gradientTo="#34D399" sparklineData={sparkScore} index={3} />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="glass-card p-5 lg:p-6 mb-6"
      >
        <h3 className="text-base font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br text-white transition-all shadow-lg',
                action.gradient, action.shadow
              )}
            >
              <action.icon className="w-7 h-7" />
              <span className="text-sm font-semibold">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Schedule & Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass-card p-5 lg:p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-text-primary">Today&apos;s Schedule</h3>
              <p className="text-sm text-text-muted mt-0.5">Friday, July 11, 2026</p>
            </div>
            <button className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 transition-colors">
              Full Timetable <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {todaySchedule.map((period, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border transition-colors',
                  period.status === 'current'
                    ? 'bg-primary-500/5 border-primary-500/30 ring-1 ring-primary-500/20'
                    : period.status === 'completed'
                    ? 'bg-surface-tertiary/40 border-border/30 opacity-60'
                    : 'border-border/30 hover:bg-surface-tertiary/40'
                )}
              >
                <div className={cn(
                  'w-14 text-center flex-shrink-0',
                  period.status === 'current' ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted'
                )}>
                  <p className="text-xs font-bold">{period.time}</p>
                </div>
                <div className={cn(
                  'w-1 h-10 rounded-full flex-shrink-0',
                  period.status === 'current' ? 'bg-primary-500' : period.status === 'completed' ? 'bg-secondary-500/50' : 'bg-border'
                )} />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-semibold',
                    period.status === 'current' ? 'text-primary-600 dark:text-primary-400' : 'text-text-primary'
                  )}>
                    {period.subject}
                    {period.status === 'current' && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-500 text-white">
                        LIVE
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-text-muted">{period.class} • {period.room}</p>
                </div>
                {period.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-secondary-500 flex-shrink-0" />}
                {period.status === 'current' && <Timer className="w-4 h-4 text-primary-500 flex-shrink-0 animate-pulse" />}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-5 lg:p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-text-primary">Recent Submissions</h3>
              <p className="text-sm text-text-muted mt-0.5">Student homework & assignments</p>
            </div>
            <button className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {recentSubmissions.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-tertiary/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {sub.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{sub.student}</p>
                  <p className="text-xs text-text-muted truncate">{sub.assignment} • {sub.class}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={cn(
                    'inline-block px-2 py-0.5 rounded-full text-[10px] font-bold',
                    sub.status === 'submitted'
                      ? 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  )}>
                    {sub.status === 'submitted' ? 'On Time' : 'Late'}
                  </span>
                  <p className="text-[10px] text-text-muted mt-0.5">{sub.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Class Performance Chart */}
      <ChartCard
        title="Class Performance"
        subtitle="Average scores across your classes"
        timeRanges={['This Week', 'This Month', 'This Term']}
      >
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformanceData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="class" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg" name="Avg Score" radius={[8, 8, 0, 0]} maxBarSize={48}>
                {classPerformanceData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.avg >= 80 ? '#10B981' : entry.avg >= 75 ? '#F59E0B' : '#EF4444'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </DashboardLayout>
  );
}
