"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-20 -left-32 h-[350px] w-[350px] rounded-full bg-primary-400/10 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute bottom-20 -right-32 h-[350px] w-[350px] rounded-full bg-accent-400/10 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block mb-4 rounded-full bg-yellow-100 dark:bg-yellow-950/50 px-4 py-1.5 text-sm font-semibold text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
            ⭐ Loved by Educators
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Trusted by{" "}
            <span className="gradient-text">2,500+ Schools</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Hear from principals, teachers, and parents who transformed their
            schools with EduNexus AI.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="glass-card relative h-full flex flex-col p-6">
                {/* Quote icon */}
                <Quote className="mb-3 h-8 w-8 text-primary-200 dark:text-primary-800" />

                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Divider */}
                <div className="mt-5 border-t border-border/50 pt-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-text-muted">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
