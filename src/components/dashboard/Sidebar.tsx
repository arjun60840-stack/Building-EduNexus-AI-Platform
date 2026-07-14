'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  DollarSign,
  CalendarCheck,
  FileText,
  Clock,
  BookOpen,
  Bus,
  BarChart3,
  Bot,
  Settings,
  MessageSquare,
  ClipboardList,
  PenTool,
  Trophy,
  Notebook,
  BrainCircuit,
  UserCheck,
  Baby,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

interface MenuItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuConfig: Record<UserRole, MenuSection[]> = {
  admin: [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/admin' },
        { label: 'Analytics', icon: BarChart3, href: '/dashboard/admin/analytics' },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Students', icon: GraduationCap, href: '/dashboard/admin/students' },
        { label: 'Teachers', icon: Users, href: '/dashboard/admin/teachers' },
        { label: 'Classes', icon: School, href: '/dashboard/admin/classes' },
        { label: 'Fees', icon: DollarSign, href: '/dashboard/admin/fees' },
      ],
    },
    {
      title: 'Academics',
      items: [
        { label: 'Attendance', icon: CalendarCheck, href: '/dashboard/admin/attendance' },
        { label: 'Exams', icon: FileText, href: '/dashboard/admin/exams' },
        { label: 'Timetable', icon: Clock, href: '/dashboard/admin/timetable' },
        { label: 'Library', icon: BookOpen, href: '/dashboard/admin/library' },
      ],
    },
    {
      title: 'Services',
      items: [
        { label: 'Transport', icon: Bus, href: '/dashboard/admin/transport' },
        { label: 'AI Assistant', icon: Bot, href: '/dashboard/admin/ai' },
        { label: 'Settings', icon: Settings, href: '/dashboard/admin/settings' },
      ],
    },
  ],
  teacher: [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/teacher' },
      ],
    },
    {
      title: 'Teaching',
      items: [
        { label: 'My Classes', icon: School, href: '/dashboard/teacher/classes' },
        { label: 'Attendance', icon: CalendarCheck, href: '/dashboard/teacher/attendance' },
        { label: 'Homework', icon: ClipboardList, href: '/dashboard/teacher/homework' },
        { label: 'Quizzes', icon: PenTool, href: '/dashboard/teacher/quizzes' },
        { label: 'Grades', icon: Trophy, href: '/dashboard/teacher/grades' },
      ],
    },
    {
      title: 'Schedule',
      items: [
        { label: 'Timetable', icon: Clock, href: '/dashboard/teacher/timetable' },
        { label: 'Leave', icon: UserCheck, href: '/dashboard/teacher/leave' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { label: 'AI Tools', icon: BrainCircuit, href: '/dashboard/teacher/ai' },
        { label: 'Messages', icon: MessageSquare, href: '/dashboard/teacher/messages' },
        { label: 'Settings', icon: Settings, href: '/dashboard/teacher/settings' },
      ],
    },
  ],
  student: [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/student' },
      ],
    },
    {
      title: 'Academics',
      items: [
        { label: 'Timetable', icon: Clock, href: '/dashboard/student/timetable' },
        { label: 'Homework', icon: ClipboardList, href: '/dashboard/student/homework' },
        { label: 'Exams', icon: FileText, href: '/dashboard/student/exams' },
        { label: 'Attendance', icon: CalendarCheck, href: '/dashboard/student/attendance' },
        { label: 'Grades', icon: Trophy, href: '/dashboard/student/grades' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Library', icon: BookOpen, href: '/dashboard/student/library' },
        { label: 'AI Study', icon: BrainCircuit, href: '/dashboard/student/ai' },
      ],
    },
    {
      title: 'Connect',
      items: [
        { label: 'Messages', icon: MessageSquare, href: '/dashboard/student/messages' },
        { label: 'Settings', icon: Settings, href: '/dashboard/student/settings' },
      ],
    },
  ],
  parent: [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/parent' },
        { label: 'My Children', icon: Baby, href: '/dashboard/parent/children' },
      ],
    },
    {
      title: 'Academics',
      items: [
        { label: 'Attendance', icon: CalendarCheck, href: '/dashboard/parent/attendance' },
        { label: 'Homework', icon: ClipboardList, href: '/dashboard/parent/homework' },
        { label: 'Progress', icon: TrendingUp, href: '/dashboard/parent/progress' },
      ],
    },
    {
      title: 'Services',
      items: [
        { label: 'Fees', icon: DollarSign, href: '/dashboard/parent/fees' },
        { label: 'Bus Tracking', icon: Bus, href: '/dashboard/parent/bus' },
      ],
    },
    {
      title: 'Connect',
      items: [
        { label: 'Messages', icon: MessageSquare, href: '/dashboard/parent/messages' },
        { label: 'Settings', icon: Settings, href: '/dashboard/parent/settings' },
      ],
    },
  ],
};

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Sidebar({ role, isOpen, onToggle, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const sections = menuConfig[role];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className={cn(
        'flex items-center gap-3 px-5 py-6 border-b border-border/50',
        !isOpen && !isMobile && 'justify-center px-3'
      )}>
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-secondary-500 rounded-full border-2 border-surface" />
        </div>
        <AnimatePresence>
          {(isOpen || isMobile) && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="text-lg font-bold gradient-text">EduNexus</h1>
              <p className="text-[10px] text-text-muted font-medium tracking-wider uppercase">AI Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
        {isMobile && (
          <button
            onClick={onToggle}
            className="ml-auto p-1.5 rounded-lg hover:bg-surface-tertiary transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        {sections.map((section) => (
          <div key={section.title}>
            <AnimatePresence>
              {(isOpen || isMobile) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] font-semibold text-text-muted uppercase tracking-widest px-3 mb-2"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => isMobile && onToggle()}
                    className={cn(
                      'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/80',
                      !isOpen && !isMobile && 'justify-center px-2.5'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/25"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={cn(
                      'relative z-10 w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200',
                      !isActive && 'group-hover:scale-110'
                    )} />
                    <AnimatePresence>
                      {(isOpen || isMobile) && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isOpen && !isMobile && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-surface-secondary text-text-primary text-xs font-medium rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse Toggle (desktop only) */}
      {!isMobile && (
        <div className="px-3 py-2 border-t border-border/50">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-text-muted hover:text-text-primary hover:bg-surface-tertiary transition-all duration-200"
          >
            {isOpen ? (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* User Profile */}
      <div className={cn(
        'p-4 border-t border-border/50',
        !isOpen && !isMobile && 'p-3'
      )}>
        <div className={cn(
          'flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-tertiary/80 transition-all duration-200 cursor-pointer',
          !isOpen && !isMobile && 'justify-center p-2'
        )}>
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
              {role === 'admin' ? 'A' : role === 'teacher' ? 'T' : role === 'student' ? 'S' : 'P'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-secondary-500 rounded-full border-2 border-surface" />
          </div>
          <AnimatePresence>
            {(isOpen || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-hidden min-w-0"
              >
                <p className="text-sm font-semibold text-text-primary truncate">
                  {role === 'admin' ? 'Dr. Priya Sharma' : role === 'teacher' ? 'Rajesh Kumar' : role === 'student' ? 'Arjun Patel' : 'Sunita Patel'}
                </p>
                <p className="text-xs text-text-muted capitalize truncate">{role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(isOpen || isMobile) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] z-50 glass border-r border-border/50 bg-surface"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Sidebar
  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 72 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="hidden lg:flex flex-col h-screen sticky top-0 border-r border-border/50 bg-surface/80 backdrop-blur-xl z-30 overflow-hidden"
    >
      {sidebarContent}
    </motion.aside>
  );
}
