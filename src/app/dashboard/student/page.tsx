"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, Trophy, Target, AlertCircle, Play, FileText, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "Jul", score: 75 },
  { month: "Aug", score: 82 },
  { month: "Sep", score: 78 },
  { month: "Oct", score: 85 },
  { month: "Nov", score: 88 },
  { month: "Dec", score: 92 },
];

const timetable = [
  { time: "08:00 AM", subject: "Mathematics", room: "Room 101", teacher: "Mr. Sharma" },
  { time: "09:00 AM", subject: "Physics", room: "Lab 3", teacher: "Ms. Verma" },
  { time: "10:00 AM", subject: "Break", room: "-", teacher: "-" },
  { time: "10:30 AM", subject: "Computer Science", room: "Lab 1", teacher: "Mr. Patel" },
  { time: "11:30 AM", subject: "English Literature", room: "Room 105", teacher: "Ms. Das" },
];

const homework = [
  { subject: "Mathematics", title: "Algebra Worksheet", due: "Tomorrow, 8:00 AM", status: "pending" },
  { subject: "Physics", title: "Lab Report: Pendulum", due: "Wednesday, 10:00 AM", status: "completed" },
  { subject: "Computer Science", title: "Python Functions Quiz", due: "Friday, 11:59 PM", status: "pending" },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6 pb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Welcome back, Rahul 👋
            </h1>
            <p className="text-text-secondary mt-1">Here's your academic overview for today.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card flex items-center gap-2 px-4 py-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-text-primary">12 Day Streak! 🔥</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Attendance"
            value="94.2%"
            icon={Target}
            trend="up"
            change="+2.4%"
            color="secondary"
            delay={0.1}
          />
          <StatCard
            title="Pending Homework"
            value="3"
            icon={BookOpen}
            trend="down"
            change="-2"
            color="primary"
            delay={0.2}
          />
          <StatCard
            title="Upcoming Exams"
            value="2"
            icon={Calendar}
            trend="up"
            change="Next week"
            color="accent"
            delay={0.3}
          />
          <StatCard
            title="Overall Grade"
            value="A"
            icon={Trophy}
            trend="up"
            change="Top 10%"
            color="primary"
            delay={0.4}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="space-y-6 lg:col-span-2">
            <ChartCard title="Academic Performance" subtitle="Your scores over the last 6 months">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#c4b5fd" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card overflow-hidden"
            >
              <div className="border-b border-border p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Homework & Assignments</h3>
                  <p className="text-sm text-text-muted">Track your pending tasks.</p>
                </div>
                <button className="text-sm font-medium text-primary-500 hover:text-primary-600">View All</button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {homework.map((hw, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-secondary/50 hover:bg-surface-secondary transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          hw.status === 'completed' ? 'bg-secondary-500/10 text-secondary-500' : 'bg-accent-500/10 text-accent-500'
                        )}>
                          {hw.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{hw.title}</p>
                          <p className="text-sm text-text-muted">{hw.subject} • Due {hw.due}</p>
                        </div>
                      </div>
                      {hw.status === 'pending' && (
                        <button className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
                          Start
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card overflow-hidden bg-gradient-to-br from-accent-600 to-primary-600 text-white relative"
            >
              <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dz209s6jk/image/upload/v1605844445/Patterns/dot-grid_l1q9nj.png')] opacity-20 mix-blend-overlay" />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">AI Study Assistant</h3>
                </div>
                <p className="text-sm text-white/80 mb-6">
                  Need help with your Mathematics homework? Your AI tutor is ready to explain concepts step-by-step.
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-white text-accent-700 font-semibold py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                  <Play className="h-4 w-4" /> Start Session
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card overflow-hidden"
            >
              <div className="border-b border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary">Today's Timetable</h3>
                <p className="text-sm text-text-muted">Wed, Oct 25</p>
              </div>
              <div className="p-6">
                <div className="relative border-l border-border/50 ml-3 space-y-6">
                  {timetable.map((item, i) => (
                    <div key={i} className="relative pl-6">
                      <div className={cn(
                        "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2",
                        item.subject === "Break" 
                          ? "border-text-muted bg-surface" 
                          : i === 1 
                            ? "border-primary-500 bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" // Current class
                            : "border-primary-500 bg-surface"
                      )} />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-primary-500">{item.time}</span>
                        <span className={cn("font-medium", item.subject === "Break" ? "text-text-muted" : "text-text-primary")}>
                          {item.subject}
                        </span>
                        {item.subject !== "Break" && (
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 45m</span>
                            <span>•</span>
                            <span>{item.room}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
