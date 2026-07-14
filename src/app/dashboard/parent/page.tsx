"use client";

import { motion } from "framer-motion";
import { CreditCard, TrendingUp, Calendar, BookOpen, AlertCircle, Phone, Download, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const performanceData = [
  { term: "Term 1", score: 75, classAvg: 70 },
  { term: "Term 2", score: 82, classAvg: 72 },
  { term: "Mid-Term", score: 78, classAvg: 75 },
  { term: "Term 3", score: 85, classAvg: 74 },
  { term: "Final", score: 88, classAvg: 76 },
];

export default function ParentDashboard() {
  const [activeChild, setActiveChild] = useState("Rahul");

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6 pb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Parent Portal
            </h1>
            <p className="text-text-secondary mt-1">Overview of your children's academic progress.</p>
          </div>
          
          <div className="flex items-center gap-2 p-1 bg-surface-secondary rounded-xl border border-border">
            <button
              onClick={() => setActiveChild("Rahul")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeChild === "Rahul"
                  ? "bg-white dark:bg-slate-800 text-primary-600 shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Rahul (Class 10-A)
            </button>
            <button
              onClick={() => setActiveChild("Priya")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeChild === "Priya"
                  ? "bg-white dark:bg-slate-800 text-primary-600 shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Priya (Class 8-C)
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Attendance"
            value={activeChild === "Rahul" ? "94.2%" : "98.5%"}
            icon={Calendar}
            trend="up"
            change="Good standing"
            color="secondary"
            delay={0.1}
          />
          <StatCard
            title="Fee Due"
            value="₹15,000"
            icon={CreditCard}
            trend="down"
            change="Due in 15 days"
            color="accent"
            delay={0.2}
          />
          <StatCard
            title="Homework Status"
            value={activeChild === "Rahul" ? "8/10" : "10/10"}
            icon={BookOpen}
            trend="up"
            change="Completed this week"
            color="primary"
            delay={0.3}
          />
          <StatCard
            title="Overall Grade"
            value={activeChild === "Rahul" ? "A" : "A+"}
            icon={TrendingUp}
            trend="up"
            change="Top 10%"
            color="secondary"
            delay={0.4}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="space-y-6 lg:col-span-2">
            <ChartCard title="Academic Growth" subtitle="Performance vs Class Average">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="term"
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
                      name="Student Score"
                      type="monotone"
                      dataKey="score"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#60a5fa" }}
                    />
                    <Line
                      name="Class Average"
                      type="monotone"
                      dataKey="classAvg"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
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
                  <h3 className="text-lg font-semibold text-text-primary">Recent Activities</h3>
                  <p className="text-sm text-text-muted">What {activeChild} has been up to.</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-none mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-secondary-500 ring-4 ring-secondary-500/20" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Scored 95% in Mathematics Quiz</p>
                      <p className="text-sm text-text-muted">Today at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-none mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary-500 ring-4 ring-primary-500/20" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Library book "Advanced Physics" issued</p>
                      <p className="text-sm text-text-muted">Yesterday at 2:15 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-none mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-yellow-500 ring-4 ring-yellow-500/20" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Late for first period (5 mins)</p>
                      <p className="text-sm text-text-muted">Mon, Oct 23</p>
                    </div>
                  </div>
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
              className="glass-card overflow-hidden border border-accent-200 dark:border-accent-800"
            >
              <div className="p-6 bg-gradient-to-br from-accent-500/10 to-transparent">
                <h3 className="text-lg font-bold text-text-primary mb-2">Term 2 Fee Due</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-extrabold text-text-primary">₹15,000</span>
                  <span className="text-sm text-text-muted mb-1">due Nov 10</span>
                </div>
                <div className="space-y-2 mb-6 text-sm text-text-secondary">
                  <div className="flex justify-between">
                    <span>Tuition Fee</span>
                    <span className="font-medium text-text-primary">₹12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport</span>
                    <span className="font-medium text-text-primary">₹3,000</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 rounded-xl bg-accent-600 text-white font-semibold py-2.5 hover:bg-accent-700 transition-colors shadow-md">
                    Pay Now
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-border bg-surface p-2.5 hover:bg-surface-secondary transition-colors">
                    <Download className="h-5 w-5 text-text-secondary" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card overflow-hidden"
            >
              <div className="border-b border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary">Teachers</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        VS
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">Mr. V. Sharma</p>
                        <p className="text-xs text-text-muted">Class Teacher</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-surface-secondary text-primary-600 hover:bg-primary-50 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 font-bold">
                        AK
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">Ms. A. Kumar</p>
                        <p className="text-xs text-text-muted">Mathematics</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-surface-secondary text-primary-600 hover:bg-primary-50 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button className="w-full mt-4 text-sm font-medium text-text-secondary border border-border rounded-lg py-2 hover:bg-surface-secondary transition-colors">
                  View All Teachers
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
