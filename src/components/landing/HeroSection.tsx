"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Users,
  BookOpen,
  BarChart3,
  Bell,
  CheckCircle,
  TrendingUp,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { STATS } from "@/lib/constants";

const CYCLING_WORDS = ["Schools", "Colleges", "Universities"];

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 lg:pt-0">
      {/* Animated Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary-400/30 to-accent-400/20 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-secondary-400/25 to-primary-400/15 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-400/20 to-secondary-400/10 blur-[80px]"
        />
      </div>

      {/* Dot pattern */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40 dark:opacity-20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* Left - Text */}
        <div className="flex flex-1 flex-col items-center pt-12 text-center lg:items-start lg:pt-0 lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300"
          >
            <Star className="h-3.5 w-3.5 fill-primary-500 text-primary-500" />
            <span>#1 AI School Platform in India</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            The AI Operating{" "}
            <br className="hidden sm:block" />
            System for{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={CYCLING_WORDS[currentWord]}
                  initial={{ y: 30, opacity: 0, rotateX: -40 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -30, opacity: 0, rotateX: 40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="gradient-text inline-block"
                >
                  {CYCLING_WORDS[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            Replace outdated school management with one intelligent platform.
            AI-powered attendance, homework, fees, analytics &mdash; everything
            your school needs,{" "}
            <span className="font-semibold text-text-primary">
              powered by AI
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            {/* Primary CTA */}
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-500/25 transition-shadow hover:shadow-2xl hover:shadow-primary-500/30"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Start Free Trial</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface/80 px-8 py-4 text-base font-semibold text-text-primary backdrop-blur-sm transition-all hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-950/30"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500">
                <Play className="h-3 w-3 fill-white text-white ml-0.5" />
              </div>
              Watch Demo
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center gap-4 text-sm text-text-muted"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-secondary-500" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-secondary-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-secondary-500" />
              <span>Setup in 48hrs</span>
            </div>
          </motion.div>
        </div>

        {/* Right - Floating Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative mt-12 flex flex-1 items-center justify-center lg:mt-0"
        >
          {/* Main Dashboard Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-md"
          >
            <div className="glass-card overflow-hidden p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-text-muted">
                  Admin Dashboard
                </span>
              </div>

              {/* Mock Stats Row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-3 border border-primary-200/50 dark:border-primary-800/30">
                  <Users className="h-4 w-4 text-primary-500 mb-1" />
                  <div className="text-lg font-bold text-text-primary">1,247</div>
                  <div className="text-xs text-text-muted">Total Students</div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-secondary-500/10 to-secondary-600/5 p-3 border border-secondary-200/50 dark:border-secondary-800/30">
                  <TrendingUp className="h-4 w-4 text-secondary-500 mb-1" />
                  <div className="text-lg font-bold text-text-primary">94.2%</div>
                  <div className="text-xs text-text-muted">Attendance</div>
                </div>
              </div>

              {/* Mock Chart Bars */}
              <div className="rounded-xl bg-surface-secondary p-3 border border-border/50">
                <div className="mb-2 text-xs font-medium text-text-muted">Weekly Performance</div>
                <div className="flex items-end gap-1.5 h-16">
                  {[60, 80, 45, 90, 70, 85, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      className={cn(
                        "flex-1 rounded-md",
                        i === 3
                          ? "bg-gradient-to-t from-primary-500 to-accent-400"
                          : "bg-gradient-to-t from-primary-200 to-primary-100 dark:from-primary-800 dark:to-primary-900"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Notification Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1 },
              scale: { delay: 1 },
              y: { delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -top-4 -left-4 md:-left-12"
          >
            <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-400 to-secondary-600">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-text-primary">New Notification</div>
                <div className="text-[11px] text-text-muted">Fee payment received ✓</div>
              </div>
            </div>
          </motion.div>

          {/* Floating AI Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { delay: 1.3 },
              scale: { delay: 1.3 },
              y: { delay: 1.3, duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-4 -right-4 md:-right-8"
          >
            <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-600">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-text-primary">AI Homework</div>
                <div className="text-[11px] text-text-muted">10 MCQs generated</div>
              </div>
            </div>
          </motion.div>

          {/* Floating chart mini card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 1.5 },
              scale: { delay: 1.5 },
              y: { delay: 1.5, duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-1/2 -right-4 md:-right-16 hidden sm:block"
          >
            <div className="glass-card flex items-center gap-2 px-3 py-2 shadow-xl">
              <BarChart3 className="h-4 w-4 text-primary-500" />
              <span className="text-xs font-semibold text-secondary-500">+23%</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="relative z-10 border-t border-border/50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-border/50 sm:grid-cols-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="flex flex-col items-center py-8"
              >
                <span className="text-2xl font-extrabold gradient-text sm:text-3xl lg:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm font-medium text-text-muted">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
