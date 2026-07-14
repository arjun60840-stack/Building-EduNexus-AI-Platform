'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ChevronDown,
  Brain,
  Sparkles,
  GraduationCap,
  Quote,
} from 'lucide-react';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
] as const;

type Role = (typeof roles)[number]['value'];

const testimonials = [
  {
    quote: 'EduNexus AI transformed how we manage our school. Attendance, fees, homework — all automated with AI.',
    author: 'Dr. Priya Sharma',
    role: 'Principal, Delhi Public School',
  },
  {
    quote: 'The AI homework generator saves me 3 hours every day. I can focus on what matters — teaching.',
    author: 'Rajesh Kumar',
    role: 'Senior Mathematics Teacher',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Fetch user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      const role = profile?.role || 'student';
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to login');
      setIsLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="flex min-h-screen">
      {/* Left decorative panel */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-accent-600 to-primary-900" />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[15%] right-[10%] h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[30%] top-[40%] h-48 w-48 rounded-full bg-accent-400/15 blur-2xl"
        />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute left-[10%] top-[15%] h-16 w-16 rounded-2xl border-2 border-white/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute right-[20%] top-[25%] h-12 w-12 rounded-full border-2 border-white/15"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[30%] left-[25%] h-20 w-20 rounded-3xl border-2 border-white/10"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12 flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EduNexus AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-4 text-4xl font-extrabold leading-tight text-white xl:text-5xl"
          >
            Connecting Every
            <br />
            Classroom with
            <br />
            <span className="bg-gradient-to-r from-secondary-300 to-secondary-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-10 max-w-md text-lg text-white/70"
          >
            The AI-powered Smart School Management Platform trusted by 500+ schools across India.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-12 flex gap-8"
          >
            {[
              { value: '500+', label: 'Schools' },
              { value: '2M+', label: 'Students' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 px-12 pb-12 xl:px-20"
        >
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/10">
            <Quote className="mb-3 h-6 w-6 text-secondary-400" />
            <p className="mb-4 text-sm leading-relaxed text-white/90">
              {testimonials[0].quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                {testimonials[0].author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{testimonials[0].author}</div>
                <div className="text-xs text-white/60">{testimonials[0].role}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Login form */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        {/* Background decoration for right side */}
        <div className="absolute inset-0 bg-surface dark:bg-surface" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduNexus AI</span>
          </div>

          {/* Header */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="mb-2 text-3xl font-bold text-text-primary">Welcome back</h2>
            <p className="mb-8 text-text-secondary">
              Sign in to your account to continue
            </p>
          </motion.div>
          {authError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mb-6 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
            >
              {authError}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <label className="mb-2 block text-sm font-medium text-text-secondary">
                Sign in as
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary transition-all duration-200',
                    'hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                    roleDropdownOpen && 'border-primary-500 ring-2 ring-primary-500/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10">
                      <GraduationCap className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="font-medium">
                      {roles.find((r) => r.value === selectedRole)?.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-text-muted transition-transform duration-200',
                      roleDropdownOpen && 'rotate-180'
                    )}
                  />
                </button>

                {roleDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-border bg-surface p-2 shadow-xl"
                  >
                    {roles.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setSelectedRole(r.value);
                          setRoleDropdownOpen(false);
                        }}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                          selectedRole === r.value
                            ? 'bg-primary-600/10 text-primary-600 dark:text-primary-400 font-medium'
                            : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                        )}
                      >
                        {r.label}
                        {selectedRole === r.value && (
                          <div className="ml-auto h-2 w-2 rounded-full bg-primary-600" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.edu"
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-secondary">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-12 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Remember + Forgot */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-5 rounded-md border-2 border-border transition-all duration-200 peer-checked:border-primary-600 peer-checked:bg-primary-600 group-hover:border-primary-400">
                    {rememberMe && (
                      <svg className="h-full w-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Login button */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'group relative flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300',
                  'bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-[length:200%_100%] hover:bg-right',
                  'shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                  'active:scale-[0.98]'
                )}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface px-4 text-text-muted">or continue with</span>
              </div>
            </motion.div>

            {/* Google button */}
            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary hover:border-primary-300 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </motion.div>
          </form>

          {/* Signup link */}
          <motion.p
            custom={8}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 text-center text-sm text-text-secondary"
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
