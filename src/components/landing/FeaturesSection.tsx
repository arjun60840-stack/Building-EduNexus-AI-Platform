"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Users,
  Brain,
  BarChart3,
  CreditCard,
  MessageSquare,
  Calendar,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  Brain,
  BarChart3,
  CreditCard,
  MessageSquare,
  Calendar,
  Shield,
};

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="features" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-surface-secondary/50 dark:bg-surface-secondary/30" />
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30 dark:opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4 rounded-full bg-primary-100 dark:bg-primary-950/50 px-4 py-1.5 text-sm font-semibold text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
          >
            ✨ Everything You Need
          </motion.span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            One Platform,{" "}
            <span className="gradient-text">Infinite Possibilities</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Everything your school needs — from admissions to alumni — in one
            intelligent, AI-powered platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
                className="group"
              >
                <div className="glass-card relative h-full overflow-hidden p-6">
                  {/* Hover glow */}
                  <div
                    className={cn(
                      "absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20",
                      feature.color
                    )}
                  />

                  {/* Icon */}
                  <div
                    className={cn(
                      "relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                      feature.color
                    )}
                  >
                    {Icon && <Icon className="h-6 w-6 text-white" />}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity group-hover:opacity-50",
                        feature.color
                      )}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="relative mb-2 text-base font-bold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
