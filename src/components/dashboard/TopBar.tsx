'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
  X,
} from 'lucide-react';

interface TopBarProps {
  onMenuToggle: () => void;
  role: string;
}

export function TopBar({ onMenuToggle, role }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notificationCount = 5;

  const displayName = role === 'admin' ? 'Dr. Priya Sharma' : role === 'teacher' ? 'Rajesh Kumar' : role === 'student' ? 'Arjun Patel' : 'Sunita Patel';

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/50 bg-surface/60 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-surface-tertiary text-text-secondary hover:text-text-primary transition-all duration-200 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <motion.div
              animate={{ width: searchOpen ? 320 : 220 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => {
                  if (!searchQuery) setSearchOpen(false);
                }}
                placeholder="Search anything..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-tertiary/60 border border-border/50 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-surface-tertiary transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-text-muted" />
                </button>
              )}
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface-tertiary text-[10px] font-medium text-text-muted border border-border/50">
                {!searchQuery && '⌘K'}
              </kbd>
            </motion.div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-xl hover:bg-surface-tertiary text-text-secondary hover:text-text-primary transition-all duration-200 sm:hidden"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-secondary hover:text-text-primary transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Notification Bell */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative p-2.5 rounded-xl hover:bg-surface-tertiary text-text-secondary hover:text-text-primary transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-[10px] font-bold text-white shadow-lg shadow-red-500/30"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-border/60 mx-1" />

          {/* User Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-surface-tertiary transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                {displayName.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-text-primary leading-tight">{displayName}</p>
                <p className="text-[11px] text-text-muted capitalize leading-tight">{role}</p>
              </div>
              <ChevronDown className={cn(
                'hidden md:block w-4 h-4 text-text-muted transition-transform duration-200',
                dropdownOpen && 'rotate-180'
              )} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 py-2 rounded-xl glass-card shadow-2xl border border-border/50 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-border/50">
                    <p className="text-sm font-semibold text-text-primary">{displayName}</p>
                    <p className="text-xs text-text-muted capitalize">{role}</p>
                  </div>
                  <div className="py-1.5">
                    {[
                      { icon: User, label: 'My Profile', href: '#' },
                      { icon: Settings, label: 'Settings', href: '#' },
                      { icon: HelpCircle, label: 'Help & Support', href: '#' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/80 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border/50 pt-1.5">
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden border-t border-border/50 overflow-hidden"
          >
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-tertiary/60 border border-border/50 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
