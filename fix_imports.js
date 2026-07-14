const fs = require('fs');
const paths = [
  'src/app/dashboard/ai-assistant/layout.tsx',
  'src/app/dashboard/ai-assistant/page.tsx',
  'src/app/dashboard/homework-generator/layout.tsx',
  'src/app/dashboard/homework-generator/page.tsx',
  'src/app/dashboard/parent/page.tsx',
  'src/app/dashboard/quiz-generator/layout.tsx',
  'src/app/dashboard/quiz-generator/page.tsx',
  'src/app/dashboard/student/page.tsx'
];
for (const p of paths) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/import DashboardLayout from ["']@\/components\/dashboard\/DashboardLayout["'];/g, 'import { DashboardLayout } from "@/components/dashboard/DashboardLayout";');
    content = content.replace(/import StatCard from ["']@\/components\/dashboard\/StatCard["'];/g, 'import { StatCard } from "@/components/dashboard/StatCard";');
    content = content.replace(/import ChartCard from ["']@\/components\/dashboard\/ChartCard["'];/g, 'import { ChartCard } from "@/components/dashboard/ChartCard";');
    fs.writeFileSync(p, content);
  }
}
console.log("Done");
