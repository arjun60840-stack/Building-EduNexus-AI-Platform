"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-surface-secondary dark:bg-surface-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-text-secondary"
          >
            Everything you need to know about the platform and billing.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <dl className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "glass-card overflow-hidden border border-border transition-colors",
                  openIndex === index ? "bg-surface shadow-md" : "bg-surface-secondary/50 hover:bg-surface"
                )}
              >
                <dt>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-start justify-between px-6 py-5 text-left text-text-primary focus:outline-none"
                  >
                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {openIndex === index ? (
                        <Minus className="h-5 w-5 text-accent-500" aria-hidden="true" />
                      ) : (
                        <Plus className="h-5 w-5 text-text-muted" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </dt>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.dd
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-base leading-7 text-text-secondary">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
