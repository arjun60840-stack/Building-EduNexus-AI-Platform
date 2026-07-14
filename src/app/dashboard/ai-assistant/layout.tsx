'use client';

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function AIAssistantLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="admin">{children}</DashboardLayout>;
}
