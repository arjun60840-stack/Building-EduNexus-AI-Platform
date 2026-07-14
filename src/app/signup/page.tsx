'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  ChevronDown,
  Brain,
  Sparkles,
  GraduationCap,
  Check,
  BookOpen,
  Shield,
} from 'lucide-react';

const roles = [
  { value: 'admin', label: 'Admin', desc: 'School administrator' },
  { value: 'teacher', label: 'Teacher', desc: 'Faculty member' },
  { value: 'student', label: 'Student', desc: 'Learner account' },
  { value: 'parent', label: 'Parent', desc: 'Parent/Guardian' },
] as const;

type Role = (typeof roles)[number]['value'];

const steps = [
  { num: 1, label: 'Personal Info', icon: User },
  { num: 2, label: 'Account Setup', icon: Shield },
  { num: 3, label: 'Verification', icon: Check },
];

const features = [
  { icon: Brain, title: 'AI-Powered', desc: 'Smart automation for every task' },
  { icon: BookOpen, title: 'All-in-One', desc: 'Manage everything from one platform' },
  { icon: Sparkles, title: 'Instant Setup', desc: 'Get started in under 5 minutes' },
];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    if (!agreedToTerms) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push('/login');
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
        className="relative hidden w-[45%] overflow-hidden lg:flex lg:flex-col lg:justify-between"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-700 via-primary-600 to-accent-900" />

        {/* Dot pattern */}
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
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-secondary-500/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[40%] top-[50%] h-48 w-48 rounded-full bg-primary-400/15 blur-2xl"
        />

        {/* Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute left-[15%] top-[20%] h-14 w-14 rounded-xl border-2 border-white/15"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[25%] right-[15%] h-10 w-10 rounded-full border-2 border-white/10"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
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
            Start your journey
            <br />
            with{' '}
            <span className="bg-gradient-to-r from-secondary-300 to-secondary-400 bg-clip-text text-transparent">
              smarter
            </span>
            <br />
            education
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-12 max-w-sm text-lg text-white/70"
          >
            Join thousands of schools already using AI to revolutionize education management.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{feature.title}</div>
                  <div className="text-xs text-white/60">{feature.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="relative z-10 px-12 pb-10 xl:px-16"
        >
          <p className="text-xs text-white/40">Trusted by 500+ schools • SOC2 compliant • ISO 27001 certified</p>
        </motion.div>
      </motion.div>

      {/* Right side - Signup form */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-y-auto px-6 py-10 lg:w-[55%]">
        <div className="absolute inset-0 bg-surface dark:bg-surface" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full max-w-lg"
        >
          {/* Mobile logo */}
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduNexus AI</span>
          </div>

          {/* Step indicators */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all',
                        step.num === 1
                          ? 'bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                          : 'bg-surface-tertiary text-text-muted'
                      )}
                    >
                      {step.num === 1 ? <step.icon className="h-4 w-4" /> : step.num}
                    </div>
                    <span
                      className={cn(
                        'hidden text-xs font-medium sm:block',
                        step.num === 1 ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mx-3 h-px flex-1 bg-border" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Header */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
              Create your account
            </h2>
            <p className="mb-6 text-text-secondary">
              Fill in your details to get started with EduNexus AI
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-text-secondary">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  required
                />
              </div>
            </motion.div>

            {/* Email + Phone row */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="signupEmail" className="mb-1.5 block text-sm font-medium text-text-secondary">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    id="signupEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.edu"
                    className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-text-secondary">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Role selector */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Role</label>
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
                    <GraduationCap className="h-4 w-4 text-text-muted" />
                    <div className="text-left">
                      <span className="font-medium">
                        {roles.find((r) => r.value === selectedRole)?.label}
                      </span>
                      <span className="ml-2 text-xs text-text-muted">
                        — {roles.find((r) => r.value === selectedRole)?.desc}
                      </span>
                    </div>
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
                          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors',
                          selectedRole === r.value
                            ? 'bg-primary-600/10 text-primary-600 dark:text-primary-400 font-medium'
                            : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                        )}
                      >
                        <div>
                          <span className="font-medium">{r.label}</span>
                          <span className="ml-2 text-xs text-text-muted">{r.desc}</span>
                        </div>
                        {selectedRole === r.value && (
                          <div className="h-2 w-2 rounded-full bg-primary-600" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Password row */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="signupPassword" className="mb-1.5 block text-sm font-medium text-text-secondary">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    id="signupPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-12 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-text-secondary">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(
                      'w-full rounded-xl border bg-surface py-3 pl-11 pr-12 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-border'
                    )}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>
            </motion.div>

            {/* Terms checkbox */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-5 rounded-md border-2 border-border transition-all duration-200 peer-checked:border-primary-600 peer-checked:bg-primary-600 group-hover:border-primary-400">
                    {agreedToTerms && (
                      <svg className="h-full w-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link href="#" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </motion.div>

            {/* Signup button */}
            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
              <button
                type="submit"
                disabled={isLoading || !agreedToTerms || (!!confirmPassword && password !== confirmPassword)}
                className={cn(
                  'group relative flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300',
                  'bg-gradient-to-r from-accent-600 via-primary-600 to-accent-600 bg-[length:200%_100%] hover:bg-right',
                  'shadow-lg shadow-accent-600/25 hover:shadow-xl hover:shadow-accent-600/30',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'active:scale-[0.98]'
                )}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create account
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible" className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface px-4 text-text-muted">or sign up with</span>
              </div>
            </motion.div>

            {/* Google */}
            <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary hover:border-primary-300 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </button>
            </motion.div>
          </form>

          {/* Login link */}
          <motion.p
            custom={10}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-center text-sm text-text-secondary"
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
