"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/lib/constants";

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-surface-secondary/50 dark:bg-surface-secondary/30" />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary-400/10 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block mb-4 rounded-full bg-secondary-100 dark:bg-secondary-950/50 px-4 py-1.5 text-sm font-semibold text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-800">
            💰 Simple Pricing
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Plans That Grow{" "}
            <span className="gradient-text">With Your School</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Start free, upgrade when you&apos;re ready. No hidden fees, no
            lock-in contracts.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
              className={cn("group relative", plan.popular && "lg:-mt-4 lg:mb-[-16px]")}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-1.5 text-xs font-bold text-white shadow-xl shadow-primary-500/25"
                  >
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </motion.div>
                </div>
              )}

              <div
                className={cn(
                  "glass-card relative h-full flex flex-col overflow-hidden p-8",
                  plan.popular &&
                    "border-2 border-primary-400/50 dark:border-primary-600/50 shadow-xl shadow-primary-500/10"
                )}
              >
                {/* Popular glow */}
                {plan.popular && (
                  <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-400/15 blur-[60px]" />
                )}

                {/* Plan Info */}
                <div className="relative">
                  <h3 className="text-lg font-bold text-text-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="relative mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-text-primary">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base text-text-muted">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="relative mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.popular
                            ? "bg-gradient-to-br from-primary-500 to-accent-500"
                            : "bg-secondary-100 dark:bg-secondary-900"
                        )}
                      >
                        <Check
                          className={cn(
                            "h-3 w-3",
                            plan.popular
                              ? "text-white"
                              : "text-secondary-600 dark:text-secondary-400"
                          )}
                        />
                      </div>
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative mt-8 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all",
                    plan.popular
                      ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                      : "border border-border bg-surface text-text-primary hover:bg-surface-secondary hover:border-primary-300 dark:hover:border-primary-700"
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
