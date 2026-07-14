export const APP_NAME = "EduNexus AI";
export const APP_DESCRIPTION = "Connecting Every Classroom with Intelligence";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "AI Power", href: "#ai-features" },
  { label: "Dashboards", href: "#dashboards" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const STATS = [
  { label: "Schools", value: "2,500+", suffix: "" },
  { label: "Students", value: "1.2M+", suffix: "" },
  { label: "Teachers", value: "85K+", suffix: "" },
  { label: "Countries", value: "45+", suffix: "" },
] as const;

export const FEATURES = [
  {
    icon: "GraduationCap",
    title: "Student Management",
    description: "Complete student lifecycle from admission to alumni. Digital profiles, academic records, and performance tracking.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "Users",
    title: "Teacher Portal",
    description: "Empowering educators with AI tools, attendance marking, homework generation, and performance analytics.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: "Brain",
    title: "AI Assistant",
    description: "Intelligent chatbot that answers questions, generates content, and provides personalized insights.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "BarChart3",
    title: "Smart Analytics",
    description: "Real-time dashboards with predictive analytics, attendance trends, fee collection, and performance reports.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: "CreditCard",
    title: "Fee Management",
    description: "Online payments, invoice generation, fee reminders, scholarship tracking, and comprehensive payment analytics.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: "MessageSquare",
    title: "Communication Hub",
    description: "Real-time chat between teachers, students, and parents. School-wide announcements and push notifications.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: "Calendar",
    title: "Smart Timetable",
    description: "AI-generated optimized timetables avoiding teacher, classroom, and holiday conflicts automatically.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: "Shield",
    title: "Security & Access",
    description: "Role-based access control, JWT authentication, encrypted data, audit logs, and comprehensive activity tracking.",
    color: "from-red-500 to-red-600",
  },
] as const;

export const AI_FEATURES = [
  {
    icon: "Bot",
    title: "AI School Assistant",
    description: "Natural language chatbot that understands questions about homework, exams, fees, and schedules.",
    demo: "\"What is my homework for tomorrow?\"",
  },
  {
    icon: "FileText",
    title: "AI Homework Generator",
    description: "Automatically generates MCQs, assignments, case studies, and programming questions with answer keys.",
    demo: "Generate 10 MCQs for Class 10 Science",
  },
  {
    icon: "Zap",
    title: "AI Quiz Generator",
    description: "Creates quizzes with multiple question types, difficulty levels, and instant auto-evaluation.",
    demo: "Create a medium difficulty quiz on Algebra",
  },
  {
    icon: "TrendingUp",
    title: "AI Report Analysis",
    description: "Analyzes strengths, weaknesses, learning patterns, and predicts future performance with intelligent feedback.",
    demo: "Analyze Rahul's academic performance",
  },
  {
    icon: "Bell",
    title: "AI Attendance Prediction",
    description: "Predicts students at risk of low attendance and generates proactive alerts before issues arise.",
    demo: "Alert: 12 students at attendance risk",
  },
  {
    icon: "Sparkles",
    title: "AI Notice Generator",
    description: "Generates professional notices for events, holidays, exams, emergencies, and PTM invitations.",
    demo: "Generate PTM invitation for Class 8",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    content: "EduNexus AI has transformed our entire school operations. The AI assistant alone saves our teachers 10+ hours per week. The analytics dashboard gives me real-time visibility I never had before.",
    avatar: "PS",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Parent",
    content: "As a parent, I love the transparency. I can see my child's attendance, homework, and progress in real-time. The AI progress reports are incredibly insightful and actionable.",
    avatar: "RK",
    rating: 5,
  },
  {
    name: "Anita Verma",
    role: "Mathematics Teacher",
    content: "The AI Homework Generator is a game-changer. I can create personalized assignments for different difficulty levels in seconds. It has made differentiated learning effortless.",
    avatar: "AV",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "School Administrator",
    content: "Fee management was our biggest headache. EduNexus AI automated everything — reminders, receipts, analytics. We've seen a 35% improvement in on-time fee collection.",
    avatar: "AP",
    rating: 5,
  },
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for small schools getting started",
    features: [
      "Up to 100 students",
      "Basic attendance tracking",
      "Homework management",
      "Parent portal",
      "Email support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "₹4,999",
    period: "/month",
    description: "For growing schools that need AI power",
    features: [
      "Up to 2,000 students",
      "All Starter features",
      "AI School Assistant",
      "AI Homework Generator",
      "Fee management with Razorpay",
      "Smart Analytics Dashboard",
      "Real-time chat",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large institutions and school chains",
    features: [
      "Unlimited students",
      "All Professional features",
      "AI Timetable Generator",
      "AI Attendance Prediction",
      "Custom integrations",
      "Multi-campus support",
      "Dedicated account manager",
      "24/7 phone support",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How long does it take to set up EduNexus AI?",
    answer: "Most schools are fully operational within 48 hours. Our onboarding team handles data migration, staff training, and configuration. We provide dedicated support throughout the process.",
  },
  {
    question: "Is my school's data secure?",
    answer: "Absolutely. We use bank-grade encryption (AES-256), role-based access control, JWT authentication, and maintain comprehensive audit logs. All data is hosted on SOC2-compliant infrastructure with daily backups.",
  },
  {
    question: "Can parents access the platform on mobile?",
    answer: "Yes! EduNexus AI is a Progressive Web App (PWA) that works beautifully on any device — desktop, tablet, or mobile. Parents can install it like a native app on their phones.",
  },
  {
    question: "How does the AI Assistant work?",
    answer: "Our AI Assistant is powered by Google's Gemini AI. It understands natural language and can answer questions about homework, exams, fees, schedules, and more. It also generates assignments, quizzes, and notices automatically.",
  },
  {
    question: "Do you support online fee payment?",
    answer: "Yes, we integrate with Razorpay for seamless online payments. Parents can pay fees via UPI, credit/debit cards, net banking, and wallets. Schools get automated receipts, reminders, and payment analytics.",
  },
  {
    question: "Can we customize the platform for our school?",
    answer: "Absolutely. EduNexus AI is fully configurable — from branding and color themes to custom modules, report formats, and workflows. Enterprise plans include dedicated customization support.",
  },
] as const;

export const DASHBOARD_ROLES = [
  { id: "admin", label: "Administrator", icon: "Shield" },
  { id: "teacher", label: "Teacher", icon: "GraduationCap" },
  { id: "student", label: "Student", icon: "BookOpen" },
  { id: "parent", label: "Parent", icon: "Users" },
] as const;
