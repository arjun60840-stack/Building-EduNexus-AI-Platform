"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield,
  GraduationCap,
  BookOpen,
  Users,
  BarChart3,
  TrendingUp,
  DollarSign,
  UserCheck,
  Calendar,
  ClipboardList,
  MessageSquare,
  Bell,
  FileText,
  Clock,
  Target,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DASHBOARD_ROLES } from "@/lib/constants";

const roleTabIcons: Record<string, LucideIcon> = {
  Shield,
  GraduationCap,
  BookOpen,
  Users,
};

interface DashboardWidget {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  color: string;
}

const dashboardWidgets: Record<string, DashboardWidget[]> = {
  admin: [
    { title: "Total Students", value: "2,847", change: "+12%", icon: Users, color: "from-blue-500 to-blue-600" },
    { title: "Fee Collection", value: "₹12.4L", change: "+8%", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
    { title: "Attendance Today", value: "94.2%", change: "+2%", icon: UserCheck, color: "from-purple-500 to-purple-600" },
    { title: "Active Teachers", value: "128", change: "+5", icon: GraduationCap, color: "from-orange-500 to-orange-600" },
    { title: "Pending Approvals", value: "14", icon: ClipboardList, color: "from-pink-500 to-pink-600" },
    { title: "Announcements", value: "3 New", icon: Bell, color: "from-cyan-500 to-cyan-600" },
  ],
  teacher: [
    { title: "My Classes Today", value: "5", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { title: "Assignments Due", value: "12", icon: FileText, color: "from-emerald-500 to-emerald-600" },
    { title: "Class Attendance", value: "91%", change: "+3%", icon: UserCheck, color: "from-purple-500 to-purple-600" },
    { title: "AI Tasks Created", value: "28", change: "+15", icon: Target, color: "from-orange-500 to-orange-600" },
    { title: "Messages", value: "8 New", icon: MessageSquare, color: "from-pink-500 to-pink-600" },
    { title: "Avg. Score", value: "78.5%", change: "+5%", icon: BarChart3, color: "from-cyan-500 to-cyan-600" },
  ],
  student: [
    { title: "Attendance", value: "96.4%", change: "+1%", icon: UserCheck, color: "from-blue-500 to-blue-600" },
    { title: "Pending Homework", value: "3", icon: FileText, color: "from-emerald-500 to-emerald-600" },
    { title: "Next Class", value: "Math", icon: Clock, color: "from-purple-500 to-purple-600" },
    { title: "Overall Grade", value: "A+", icon: Star, color: "from-orange-500 to-orange-600" },
    { title: "Quiz Score", value: "92%", change: "+8%", icon: Target, color: "from-pink-500 to-pink-600" },
    { title: "Rank", value: "#3", change: "↑2", icon: TrendingUp, color: "from-cyan-500 to-cyan-600" },
  ],
  parent: [
    { title: "Child Attendance", value: "96.4%", change: "+1%", icon: UserCheck, color: "from-blue-500 to-blue-600" },
    { title: "Fee Status", value: "Paid", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
    { title: "Exam Results", value: "A+", icon: Star, color: "from-purple-500 to-purple-600" },
    { title: "Homework Done", value: "8/10", icon: FileText, color: "from-orange-500 to-orange-600" },
    { title: "Teacher Messages", value: "2 New", icon: MessageSquare, color: "from-pink-500 to-pink-600" },
    { title: "Next PTM", value: "15 Jul", icon: Calendar, color: "from-cyan-500 to-cyan-600" },
  ],
};

export default function DashboardPreview() {
  const [activeRole, setActiveRole] = useState<string>("admin");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const widgets = dashboardWidgets[activeRole] || [];

  return (
    <section
      ref={sectionRef}
      id="dashboards"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-surface-secondary/50 dark:bg-surface-secondary/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block mb-4 rounded-full bg-secondary-100 dark:bg-secondary-950/50 px-4 py-1.5 text-sm font-semibold text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-800">
            📊 Role-Based Views
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Dashboards for{" "}
            <span className="gradient-text">Every Stakeholder</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Tailored views for admins, teachers, students, and parents — each
            seeing exactly what they need.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex rounded-2xl bg-surface border border-border p-1.5 shadow-lg gap-1">
            {DASHBOARD_ROLES.map((role) => {
              const TabIcon = roleTabIcons[role.icon];
              const isActive = activeRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 shadow-lg"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {TabIcon && <TabIcon className="h-4 w-4" />}
                    <span className="hidden sm:inline">{role.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <div className="glass-card overflow-hidden p-6 lg:p-8">
            {/* Window Chrome */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-surface-secondary px-3 py-1 border border-border/50">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs font-medium text-text-muted">
                  edunexus.ai/dashboard/{activeRole}
                </span>
              </div>
              <div className="w-16" />
            </div>

            {/* Widget Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {widgets.map((widget, index) => (
                  <motion.div
                    key={widget.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="group rounded-xl border border-border/50 bg-surface p-4 transition-all hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                          {widget.title}
                        </p>
                        <p className="mt-1 text-2xl font-extrabold text-text-primary">
                          {widget.value}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm",
                          widget.color
                        )}
                      >
                        <widget.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    {widget.change && (
                      <div className="mt-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-secondary-500" />
                        <span className="text-xs font-semibold text-secondary-600 dark:text-secondary-400">
                          {widget.change}
                        </span>
                        <span className="text-xs text-text-muted">
                          vs last month
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
