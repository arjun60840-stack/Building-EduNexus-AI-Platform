'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  GraduationCap,
  Users,
  DollarSign,
  CalendarCheck,
  UserPlus,
  ClipboardCheck,
  FileBarChart,
  Megaphone,
  ArrowRight,
  UserCheck,
  BookOpen,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { cn } from '@/lib/utils';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: 'Jan', revenue: 1850000, expenses: 1200000 },
  { month: 'Feb', revenue: 2100000, expenses: 1350000 },
  { month: 'Mar', revenue: 1950000, expenses: 1280000 },
  { month: 'Apr', revenue: 2450000, expenses: 1400000 },
  { month: 'May', revenue: 2300000, expenses: 1350000 },
  { month: 'Jun', revenue: 2650000, expenses: 1500000 },
];

const classPerformanceData = [
  { class: 'Class 1', avg: 82 },
  { class: 'Class 2', avg: 78 },
  { class: 'Class 3', avg: 85 },
  { class: 'Class 4', avg: 79 },
  { class: 'Class 5', avg: 88 },
  { class: 'Class 6', avg: 74 },
  { class: 'Class 7', avg: 81 },
  { class: 'Class 8', avg: 76 },
  { class: 'Class 9', avg: 72 },
  { class: 'Class 10', avg: 83 },
];

const feeStatusData = [
  { name: 'Paid', value: 68, color: '#10B981' },
  { name: 'Pending', value: 22, color: '#F59E0B' },
  { name: 'Overdue', value: 10, color: '#EF4444' },
];

const recentActivities = [
  {
    id: 1,
    icon: UserCheck,
    text: 'Rahul Verma marked attendance for Class 10-A',
    time: '2 min ago',
    color: 'text-secondary-500',
    bg: 'bg-secondary-500/10',
  },
  {
    id: 2,
    icon: DollarSign,
    text: 'Fee payment received from Ananya Gupta — ₹25,000',
    time: '15 min ago',
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
  },
  {
    id: 3,
    icon: BookOpen,
    text: 'New homework assigned: Mathematics — Class 8-B',
    time: '32 min ago',
    color: 'text-accent-500',
    bg: 'bg-accent-500/10',
  },
  {
    id: 4,
    icon: AlertCircle,
    text: 'Library book overdue: "NCERT Physics" — Priya Singh',
    time: '1 hr ago',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    id: 5,
    icon: GraduationCap,
    text: 'New student admission: Arjun Mehta — Class 6-A',
    time: '2 hrs ago',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
];

const quickActions = [
  {
    label: 'Add Student',
    icon: UserPlus,
    gradient: 'from-primary-500 to-primary-600',
    shadow: 'shadow-primary-500/20',
  },
  {
    label: 'Mark Attendance',
    icon: ClipboardCheck,
    gradient: 'from-secondary-500 to-secondary-600',
    shadow: 'shadow-secondary-500/20',
  },
  {
    label: 'Generate Report',
    icon: FileBarChart,
    gradient: 'from-accent-500 to-accent-600',
    shadow: 'shadow-accent-500/20',
  },
  {
    label: 'Send Notice',
    icon: Megaphone,
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
  },
];

const sparkStudents = [
  { value: 2600 }, { value: 2650 }, { value: 2700 }, { value: 2720 }, { value: 2780 }, { value: 2810 }, { value: 2847 },
];
const sparkTeachers = [
  { value: 140 }, { value: 142 }, { value: 148 }, { value: 150 }, { value: 152 }, { value: 154 }, { value: 156 },
];
const sparkFees = [
  { value: 18 }, { value: 19.5 }, { value: 20 }, { value: 21.5 }, { value: 22 }, { value: 23 }, { value: 24.5 },
];
const sparkAttendance = [
  { value: 89 }, { value: 90 }, { value: 91 }, { value: 90.5 }, { value: 91.8 }, { value: 92 }, { value: 92.3 },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-card !rounded-lg px-3 py-2 shadow-xl border border-border/50" style={{ pointerEvents: 'none' }}>
      <p className="text-xs font-semibold text-text-primary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs text-text-secondary">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
          {entry.name}: {typeof entry.value === 'number' && entry.value > 10000 ? `₹${(entry.value / 100000).toFixed(1)}L` : entry.value}
        </p>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (!active || !payload || !payload[0]) return null;
  const entry = payload[0];
  return (
    <div className="glass-card !rounded-lg px-3 py-2 shadow-xl border border-border/50" style={{ pointerEvents: 'none' }}>
      <p className="text-xs font-semibold text-text-primary">
        <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.payload.color }} />
        {entry.name}: {entry.value}%
      </p>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
          Good afternoon, Dr. Priya! 👋
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Here&apos;s what&apos;s happening at EduNexus Academy today.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-6">
        <StatCard
          icon={GraduationCap}
          title="Total Students"
          value="2,847"
          change={4.2}
          trend="up"
          gradientFrom="#2563EB"
          gradientTo="#3B82F6"
          sparklineData={sparkStudents}
          index={0}
        />
        <StatCard
          icon={Users}
          title="Total Teachers"
          value="156"
          change={2.1}
          trend="up"
          gradientFrom="#8B5CF6"
          gradientTo="#A78BFA"
          sparklineData={sparkTeachers}
          index={1}
        />
        <StatCard
          icon={DollarSign}
          title="Fee Collection"
          value="₹24.5L"
          change={8.5}
          trend="up"
          gradientFrom="#10B981"
          gradientTo="#34D399"
          sparklineData={sparkFees}
          index={2}
        />
        <StatCard
          icon={CalendarCheck}
          title="Attendance Rate"
          value="92.3%"
          change={1.8}
          trend="down"
          gradientFrom="#F59E0B"
          gradientTo="#FBBF24"
          sparklineData={sparkAttendance}
          index={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-6">
        {/* Revenue Chart */}
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly revenue and expenses"
          className="lg:col-span-2"
        >
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revenueGradient)" dot={false} activeDot={{ r: 5, strokeWidth: 2 }} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#8B5CF6" strokeWidth={2} fill="url(#expenseGradient)" dot={false} activeDot={{ r: 4, strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Fee Status Donut */}
        <ChartCard
          title="Fee Status"
          subtitle="Current quarter breakdown"
          timeRanges={['Q1', 'Q2', 'Q3', 'Q4']}
        >
          <div className="h-[280px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Tooltip content={<PieTooltip />} />
                <Pie
                  data={feeStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {feeStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              {feeStatusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-text-muted">{entry.name}</span>
                  <span className="text-xs font-semibold text-text-primary">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Class Performance & Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-6">
        {/* Class Performance */}
        <ChartCard
          title="Class Performance"
          subtitle="Average scores by class"
          timeRanges={['Term 1', 'Term 2', 'Annual']}
        >
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformanceData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} vertical={false} />
                <XAxis dataKey="class" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avg" name="Avg Score" radius={[6, 6, 0, 0]} maxBarSize={36}>
                  {classPerformanceData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={entry.avg >= 80 ? '#10B981' : entry.avg >= 75 ? '#F59E0B' : '#EF4444'}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-5 lg:p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-text-primary">Recent Activities</h3>
              <p className="text-sm text-text-muted mt-0.5">Latest updates from across the school</p>
            </div>
            <button className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3.5">
            {recentActivities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-tertiary/60 transition-colors group"
              >
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', activity.bg)}>
                  <activity.icon className={cn('w-4 h-4', activity.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary leading-snug">{activity.text}</p>
                  <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-5 lg:p-6"
      >
        <h3 className="text-base font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br text-white transition-all shadow-lg',
                action.gradient,
                action.shadow
              )}
            >
              <action.icon className="w-7 h-7" />
              <span className="text-sm font-semibold">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
