"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Loader2, Sparkles, Download, Users, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";

const SUBJECTS = ["Mathematics", "Science", "English", "History", "Geography", "Computer Science"];
const GRADES = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: "MCQ",
    difficulty: "Medium",
    text: "What is the result of applying the quadratic formula to 2x² - 5x + 3 = 0?",
    options: ["x = 1, x = 1.5", "x = -1, x = 1.5", "x = 1, x = -1.5", "x = -1, x = -1.5"],
    answer: "A"
  },
  {
    id: 2,
    type: "Short Answer",
    difficulty: "Easy",
    text: "Define what a polynomial is and give one example of a quadratic polynomial.",
    answer: "A polynomial is an expression consisting of variables and coefficients, that involves only the operations of addition, subtraction, multiplication, and non-negative integer exponentiation of variables. Example: x² + 2x + 1."
  },
  {
    id: 3,
    type: "Word Problem",
    difficulty: "Hard",
    text: "A rectangular garden has a perimeter of 40 meters. If its length is 4 meters more than its width, find the dimensions of the garden.",
    answer: "Width = 8m, Length = 12m. Solution: 2(l + w) = 40, l = w + 4. So 2(2w + 4) = 40 => 4w + 8 = 40 => 4w = 32 => w = 8."
  }
];

export default function HomeworkGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowResults(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <DashboardLayout role="teacher">
      <div className="max-w-5xl mx-auto space-y-6 pb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent-500" /> AI Homework Generator
          </h1>
          <p className="text-text-secondary mt-1">Generate personalized, high-quality assignments in seconds.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Form Section */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Class/Grade</label>
                  <select className="w-full rounded-xl border border-border bg-surface py-2.5 px-3 text-text-primary focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                    {GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Subject</label>
                  <select className="w-full rounded-xl border border-border bg-surface py-2.5 px-3 text-text-primary focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Topic details</label>
                  <textarea 
                    rows={3} 
                    className="w-full rounded-xl border border-border bg-surface py-2.5 px-3 text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="e.g. Quadratic equations, word problems..."
                    defaultValue="Quadratic Equations"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1 flex justify-between">
                    <span>Number of Questions</span>
                    <span className="text-primary-600 font-bold">10</span>
                  </label>
                  <input type="range" min="5" max="30" defaultValue="10" className="w-full accent-primary-600" />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Question Types</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['MCQs', 'Short Answer', 'Long Answer', 'Case Study'].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                        <input type="checkbox" defaultChecked={type === 'MCQs' || type === 'Short Answer'} className="rounded text-primary-600 focus:ring-primary-500 bg-surface border-border" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-600 to-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-primary-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Generate Homework
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isGenerating && !showResults ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border rounded-2xl bg-surface-secondary/30"
                >
                  <div className="h-16 w-16 rounded-full bg-surface shadow-sm flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-text-muted" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">No assignment generated yet</h3>
                  <p className="text-text-muted mt-2 max-w-sm">Fill out the form and let AI craft the perfect assignment for your class.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 glass-card"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-xl bg-accent-500/30 animate-pulse-glow" />
                    <Sparkles className="h-12 w-12 text-accent-500 animate-pulse relative z-10 mb-4" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">AI is crafting questions...</h3>
                  <p className="text-text-muted mt-2">Analyzing curriculum and formulating problems.</p>
                  
                  <div className="w-48 h-2 bg-surface-secondary rounded-full mt-6 overflow-hidden border border-border">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent-500 to-primary-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card flex flex-col h-[calc(100vh-12rem)]"
                >
                  {/* Results Header */}
                  <div className="p-5 border-b border-border flex items-center justify-between bg-surface-secondary/50 rounded-t-xl">
                    <div>
                      <h3 className="font-semibold text-text-primary flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-secondary-500" /> Generated Assignment
                      </h3>
                      <p className="text-xs text-text-muted mt-1">Class 10 • Mathematics • Quadratic Eq.</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowAnswers(!showAnswers)}
                        className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg bg-surface hover:bg-surface-secondary text-text-primary transition-colors"
                      >
                        {showAnswers ? "Hide Answers" : "Show Answers"}
                      </button>
                    </div>
                  </div>

                  {/* Generated Questions list */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {MOCK_QUESTIONS.map((q, index) => (
                      <div key={q.id} className="relative pl-8">
                        <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                          {index + 1}
                        </div>
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded bg-surface-secondary px-2 py-0.5 text-[10px] font-medium text-text-secondary border border-border">
                            {q.type}
                          </span>
                          <span className={cn(
                            "rounded px-2 py-0.5 text-[10px] font-medium",
                            q.difficulty === 'Easy' ? 'bg-secondary-100 text-secondary-700' :
                            q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          )}>
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="font-medium text-text-primary text-sm leading-relaxed mb-3">
                          {q.text}
                        </p>
                        
                        {q.options && (
                          <div className="space-y-2 mb-3 pl-2 border-l-2 border-border">
                            {q.options.map((opt, i) => (
                              <div key={i} className="text-sm text-text-secondary flex gap-2">
                                <span className="font-medium">{String.fromCharCode(65 + i)})</span> {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <AnimatePresence>
                          {showAnswers && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 rounded-lg bg-secondary-50/50 dark:bg-secondary-900/20 p-3 border border-secondary-200/50 dark:border-secondary-800/50">
                                <span className="text-xs font-bold text-secondary-600 block mb-1">Answer:</span>
                                <span className="text-sm text-text-secondary">{q.answer}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 border-t border-border flex items-center justify-between bg-surface rounded-b-xl">
                    <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                      <Download className="h-4 w-4" /> Download PDF
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700">
                      <Users className="h-4 w-4" /> Assign to Class
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
