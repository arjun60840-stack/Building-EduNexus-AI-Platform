"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-secondary-500" />
      
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dz209s6jk/image/upload/v1605844445/Patterns/dot-grid_l1q9nj.png')] opacity-10 mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ready to Transform Your School?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80"
          >
            Join thousands of institutions already using {APP_NAME} to automate admin work and empower educators with AI.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#"
              className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-xl transition-all hover:bg-surface-secondary hover:shadow-2xl hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
