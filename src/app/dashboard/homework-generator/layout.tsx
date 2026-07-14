'use client';

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function HomeworkGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="teacher">{children}</DashboardLayout>;
}
