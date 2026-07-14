"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  FileText,
  Zap,
  TrendingUp,
  Bell,
  Sparkles,
  Send,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_FEATURES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  FileText,
  Zap,
  TrendingUp,
  Bell,
  Sparkles,
};

const aiResponses: Record<string, string[]> = {
  "AI School Assistant": [
    "📚 Your homework for tomorrow:",
    "  • Math: Ch.5 Ex 5.3, Q1-10",
    "  • Science: Write lab report on osmosis",
    "  • English: Essay on 'Climate Change'",
    "✅ Deadline: Tomorrow, 8:00 AM",
  ],
  "AI Homework Generator": [
    "✨ Generating 10 MCQs for Class 10 Science...",
    "",
    "Q1: Which gas is released during photosynthesis?",
    "  a) CO₂  b) O₂  c) N₂  d) H₂",
    "  ✓ Answer: b) O₂",
    "",
    "Q2: The SI unit of force is:",
    "  a) Joule  b) Watt  c) Newton  d) Pascal",
    "  ✓ Answer: c) Newton",
    "... +8 more questions generated",
  ],
  "AI Quiz Generator": [
    "🎯 Quiz Created: Algebra Basics",
    "  Difficulty: Medium",
    "  Questions: 15",
    "  Duration: 30 minutes",
    "  Types: MCQ, Fill-in, Short Answer",
    "",
    "📊 Auto-evaluation enabled",
    "🔗 Share link generated",
  ],
  "AI Report Analysis": [
    "📊 Student: Rahul Sharma — Class 10B",
    "",
    "Strengths: Mathematics (92%), Science (88%)",
    "Needs Improvement: English (64%)",
    "",
    "📈 Trend: +12% overall improvement",
    "⚠️ Prediction: Risk of B grade in English",
    "💡 Recommendation: Extra English practice",
  ],
  "AI Attendance Prediction": [
    "⚠️ Attendance Alert — This Week",
    "",
    "🔴 High Risk (< 60%): 4 students",
    "🟡 Medium Risk (60-75%): 8 students",
    "",
    "Top factors: Monday absences, weather",
    "📱 Auto-notification sent to parents",
    "✅ 3 parents acknowledged",
  ],
  "AI Notice Generator": [
    "📋 Notice Generated: PTM Invitation",
    "",
    "Dear Parents of Class 8,",
    "You are cordially invited to the Parent",
    "Teacher Meeting on 15th July, 10 AM.",
    "Venue: School Auditorium",
    "",
    "✅ Sent to 45 parents via SMS & App",
  ],
};

export default function AIFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="ai-features"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-slate-50/50 to-surface dark:from-surface dark:via-slate-900/50 dark:to-surface" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-400/10 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary-400/10 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block mb-4 rounded-full bg-accent-100 dark:bg-accent-950/50 px-4 py-1.5 text-sm font-semibold text-accent-700 dark:text-accent-300 border border-accent-200 dark:border-accent-800">
            🤖 Powered by Gemini AI
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            AI That Actually{" "}
            <span className="gradient-text">Understands Education</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Six intelligent AI modules that automate repetitive tasks, generate
            content, and provide insights — so educators can focus on teaching.
          </p>
        </motion.div>

        {/* AI Features */}
        <div className="mt-16 space-y-16 lg:space-y-24">
          {AI_FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const isReversed = index % 2 !== 0;
            const response = aiResponses[feature.title] || [];

            return (
              <AIFeatureRow
                key={feature.title}
                feature={feature}
                Icon={Icon}
                isReversed={isReversed}
                response={response}
                index={index}
                isInView={isInView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AIFeatureRow({
  feature,
  Icon,
  isReversed,
  response,
  index,
  isInView,
}: {
  feature: (typeof AI_FEATURES)[number];
  Icon: LucideIcon | undefined;
  isReversed: boolean;
  response: string[];
  index: number;
  isInView: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-60px" });
  const visible = isInView && rowInView;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn(
        "flex flex-col items-center gap-8 lg:flex-row lg:gap-16",
        isReversed && "lg:flex-row-reverse"
      )}
    >
      {/* Text Side */}
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-primary-500 shadow-lg">
            {Icon && <Icon className="h-5 w-5 text-white" />}
          </div>
          <span className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
            Module {index + 1}
          </span>
        </div>
        <h3 className="text-2xl font-extrabold text-text-primary sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary max-w-md mx-auto lg:mx-0">
          {feature.description}
        </p>
      </div>

      {/* Demo Side */}
      <div className="flex-1 w-full max-w-lg">
        <div className="glass-card overflow-hidden border-l-4 border-l-accent-500">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3 bg-surface-secondary/50">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-xs font-medium text-text-muted">
              AI Terminal
            </span>
          </div>

          <div className="p-4 space-y-3">
            {/* User prompt */}
            <div className="flex items-center gap-2 rounded-lg bg-primary-50 dark:bg-primary-950/30 px-3 py-2 border border-primary-200/50 dark:border-primary-800/30">
              <Send className="h-3.5 w-3.5 text-primary-500 shrink-0" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {feature.demo}
              </span>
            </div>

            {/* AI Response */}
            <div className="rounded-lg bg-surface-secondary/70 p-3 border border-border/30">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-accent-500" />
                <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                  AI Response
                </span>
              </div>
              <div className="space-y-0.5">
                {response.map((line, lineIndex) => (
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.3 + lineIndex * 0.06,
                      duration: 0.3,
                    }}
                    className="font-mono text-xs leading-relaxed text-text-secondary"
                  >
                    {line || "\u00A0"}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
