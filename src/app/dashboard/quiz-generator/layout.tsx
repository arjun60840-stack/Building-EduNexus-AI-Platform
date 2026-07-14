'use client';

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function QuizGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="teacher">{children}</DashboardLayout>;
}
