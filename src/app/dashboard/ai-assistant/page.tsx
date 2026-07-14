"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles, Code2, BookOpen, Calculator } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  { icon: BookOpen, text: "What is my homework?" },
  { icon: Calculator, text: "Generate 5 MCQs for Class 10 Math" },
  { icon: Code2, text: "Explain React Hooks to me" },
  { icon: Sparkles, text: "Write a leave application" },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am EduNexus AI. How can I help you today? You can ask me about homework, exams, fees, or ask me to generate study materials.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let reply = "I can help with that! Let me process your request.";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("homework")) {
        reply = "You have 3 pending homework assignments:\n1. Algebra Worksheet (Math) - Due Tomorrow\n2. Lab Report (Physics) - Due Wednesday\n3. Functions Quiz (CS) - Due Friday";
      } else if (lowerText.includes("generate") && lowerText.includes("mcq")) {
        reply = "Here are 5 MCQs for Class 10 Math (Quadratic Equations):\n\n1. What is the standard form of a quadratic equation?\na) ax² + bx + c = 0\nb) ax + b = 0\n...\n\nWould you like me to generate more?";
      } else if (lowerText.includes("leave")) {
        reply = "Here is a draft for a leave application:\n\nSubject: Application for Leave\nRespected Sir/Madam,\nI am writing to request leave for 2 days due to [Reason]. I assure you I will catch up on missed work.\n\nThank you.";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-card flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 shadow-md">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">EduNexus AI Assistant</h1>
            <p className="text-sm text-text-muted">Powered by Google Gemini</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="glass-card flex flex-1 flex-col overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex w-full",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "flex max-w-[80%] gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1",
                    msg.role === "user" 
                      ? "bg-primary-600 text-white" 
                      : "bg-gradient-to-br from-accent-500 to-primary-600 text-white"
                  )}>
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "rounded-2xl px-5 py-3 whitespace-pre-wrap shadow-sm",
                    msg.role === "user" 
                      ? "bg-primary-600 text-white rounded-tr-sm" 
                      : "bg-surface-secondary border border-border text-text-primary rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full justify-start"
              >
                <div className="flex max-w-[80%] gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1 bg-gradient-to-br from-accent-500 to-primary-600 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl px-5 py-4 bg-surface-secondary border border-border rounded-tl-sm flex gap-1">
                    <motion.div className="h-2 w-2 rounded-full bg-accent-500" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="h-2 w-2 rounded-full bg-accent-500" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="h-2 w-2 rounded-full bg-accent-500" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface-secondary/50 border-t border-border">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.text)}
                    className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
                  >
                    <s.icon className="h-4 w-4 text-accent-500" />
                    {s.text}
                  </button>
                ))}
              </div>
            )}
            
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask EduNexus AI anything..."
                className="w-full rounded-full border border-border bg-surface py-4 pl-6 pr-14 text-text-primary placeholder-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 shadow-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600"
              >
                <Send className="h-4 w-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
