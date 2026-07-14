"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Zap, Clock, Users, PlayCircle, Eye, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";

const SUBJECTS = ["Mathematics", "Science", "English", "Computer Science"];
const GRADES = ["Class 9", "Class 10", "Class 11"];

export default function QuizGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowResults(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <DashboardLayout role="teacher">
      <div className="max-w-5xl mx-auto space-y-6 pb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" /> AI Quiz Generator
          </h1>
          <p className="text-text-secondary mt-1">Create interactive quizzes that auto-evaluate in seconds.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Form Section */}
          <div className="lg:col-span-5">
            <motion.div className="glass-card p-6">
              <form onSubmit={handleGenerate} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Class</label>
                    <select className="w-full rounded-xl border border-border bg-surface py-2 px-3 text-sm text-text-primary">
                      {GRADES.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Subject</label>
                    <select className="w-full rounded-xl border border-border bg-surface py-2 px-3 text-sm text-text-primary">
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Topic</label>
                  <input 
                    type="text" 
                    className="w-full rounded-xl border border-border bg-surface py-2.5 px-3 text-text-primary"
                    placeholder="e.g. Newton's Laws of Motion"
                    defaultValue="Cell Biology"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Questions</label>
                    <input type="number" min="5" max="50" defaultValue="15" className="w-full rounded-xl border border-border bg-surface py-2 px-3 text-sm text-text-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Time (mins)</label>
                    <input type="number" min="5" max="120" defaultValue="30" className="w-full rounded-xl border border-border bg-surface py-2 px-3 text-sm text-text-primary" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" /> Generate Quiz
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
                    <Zap className="h-8 w-8 text-text-muted" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">Ready to create a quiz</h3>
                  <p className="text-text-muted mt-2 max-w-sm">Quizzes are automatically graded, saving you hours of evaluation time.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 glass-card"
                >
                  <Zap className="h-12 w-12 text-yellow-500 animate-bounce mb-4" />
                  <h3 className="text-lg font-medium text-text-primary">Generating Questions...</h3>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-b border-border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-text-primary">Cell Biology Basics</h2>
                        <p className="text-sm text-text-secondary mt-1">Class 9 • Science</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-border shadow-sm">
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-text-muted"/> 30m</span>
                        <span className="text-border">|</span>
                        <span className="flex items-center gap-1.5 text-primary-600">15 Qs</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700">
                        <PlayCircle className="h-4 w-4" /> Publish to Students
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-secondary">
                        <Eye className="h-4 w-4" /> Preview
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">Preview Questions (First 3)</h4>
                    <div className="space-y-4">
                      {/* Q1 */}
                      <div className="p-4 rounded-xl border border-border bg-surface-secondary/50">
                        <p className="font-medium text-text-primary text-sm mb-3">1. Which organelle is known as the powerhouse of the cell?</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 rounded border border-border bg-surface">A. Nucleus</div>
                          <div className="p-2 rounded border-2 border-secondary-500 bg-secondary-50/50 dark:bg-secondary-900/20 font-medium flex justify-between items-center">
                            B. Mitochondria <CheckCircle2 className="h-4 w-4 text-secondary-500" />
                          </div>
                          <div className="p-2 rounded border border-border bg-surface">C. Ribosome</div>
                          <div className="p-2 rounded border border-border bg-surface">D. Golgi Apparatus</div>
                        </div>
                      </div>
                      {/* Q2 */}
                      <div className="p-4 rounded-xl border border-border bg-surface-secondary/50 opacity-70">
                        <p className="font-medium text-text-primary text-sm mb-3">2. Plant cells have a cell wall, but animal cells do not.</p>
                        <div className="flex gap-2 text-sm">
                          <div className="p-2 px-4 rounded border-2 border-secondary-500 bg-secondary-50/50 dark:bg-secondary-900/20 font-medium">True</div>
                          <div className="p-2 px-4 rounded border border-border bg-surface">False</div>
                        </div>
                      </div>
                    </div>
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
