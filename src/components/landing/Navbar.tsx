"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/[0.03] dark:shadow-black/20"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 via-accent-500 to-secondary-500 shadow-lg shadow-primary-500/25">
                <GraduationCap className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-600 via-accent-500 to-secondary-500 opacity-0 blur-lg transition-opacity group-hover:opacity-60" />
              </div>
              <span className="text-lg font-bold tracking-tight text-text-primary">
                {APP_NAME}
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden items-center gap-3 lg:flex">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-secondary text-text-secondary transition-colors hover:bg-surface-tertiary hover:text-text-primary"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Login */}
              <motion.a
                href="#"
                className="px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Login
              </motion.a>

              {/* CTA */}
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-shadow hover:shadow-xl hover:shadow-primary-500/30"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              {mounted && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-secondary text-text-secondary"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-secondary text-text-secondary"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMobileOpen ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Menu className="h-4 w-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[calc(100%-3rem)] bg-surface/95 backdrop-blur-2xl border-l border-border shadow-2xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <span className="text-lg font-bold text-text-primary">{APP_NAME}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-secondary text-text-secondary"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              <div className="flex flex-col gap-1 px-4 pt-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col gap-3 px-4 pt-8">
                <motion.a
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
                >
                  Login
                </motion.a>
                <motion.a
                  href="#pricing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
