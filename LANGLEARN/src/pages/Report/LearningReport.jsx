import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Printer, TrendingUp, AlertTriangle, Target, Clock, Zap, BookOpen, Star } from 'lucide-react'
import { useAuth } from '../../services/auth'
import { useTheme } from '../../services/themeContext'
import { getMistakes } from '../../services/mistakeService'
import { getLanguageById } from '../../data/languages'

import RightSidebar from '../../components/RightSidebar/RightSidebar'

export default function LearningReport() {
  const { user } = useAuth()
  const { t } = useTheme()
  const printRef = useRef(null)

  const [mistakes, setMistakes] = useState([])
  const [recommendations, setRecommendations] = useState([])

  const learningLang = getLanguageById(user?.learningLanguage) || { name: 'Language' }

  useEffect(() => {
    if (user?.learningLanguage) {
      const allMistakes = getMistakes(user.learningLanguage) || []
      // Sort mistakes by count (highest first)
      const sorted = [...allMistakes].sort((a, b) => b.count - a.count).slice(0, 10)
      setMistakes(sorted)

      // Generate Recommendations
      const recs = []
      
      if (sorted.length > 5) {
        recs.push({
          type: 'vocabulary',
          title: 'Vocabulary Needs Review',
          desc: 'You have a high number of repeated mistakes. We recommend spending 10 minutes in "Practice Mode" to reinforce these weak areas.',
          icon: AlertTriangle,
          color: 'text-amber-500',
          bg: 'bg-amber-100 dark:bg-amber-900/30'
        })
      }

      if ((user?.streak || 0) < 2) {
        recs.push({
          type: 'consistency',
          title: 'Build Your Streak',
          desc: 'Consistency is key to language learning! Try to complete just one lesson a day to build up your daily streak.',
          icon: TrendingUp,
          color: 'text-indigo-500',
          bg: 'bg-indigo-100 dark:bg-indigo-900/30'
        })
      } else if ((user?.streak || 0) >= 3) {
        recs.push({
          type: 'challenge',
          title: 'Take on a Challenge',
          desc: `Great job maintaining a ${user.streak}-day streak! You are ready to tackle Legendary mode for extra XP.`,
          icon: Zap,
          color: 'text-rose-500',
          bg: 'bg-rose-100 dark:bg-rose-900/30'
        })
      }

      const completedCount = Array.isArray(user?.completedLessons) ? user.completedLessons.length : 0
      if (completedCount < 5) {
        recs.push({
          type: 'progression',
          title: 'Keep Moving Forward',
          desc: 'You are just getting started! Focus on completing the early curriculum units to build a strong foundation.',
          icon: BookOpen,
          color: 'text-emerald-500',
          bg: 'bg-emerald-100 dark:bg-emerald-900/30'
        })
      }

      setRecommendations(recs)
    }
  }, [user])

  const handlePrint = () => {
    window.print()
  }

  const completedCount = Array.isArray(user?.completedLessons) ? user.completedLessons.length : 0
  // Estimate time spent: ~5 mins per completed lesson
  const estimatedMins = completedCount * 5
  const estimatedHours = Math.floor(estimatedMins / 60)
  const remainingMins = estimatedMins % 60
  const timeString = estimatedHours > 0 ? `${estimatedHours}h ${remainingMins}m` : `${remainingMins}m`

  return (
    <div className="min-h-screen bg-transparent flex justify-center pb-20 md:pb-0 font-sans">
      <div className="print-hidden">

      </div>

      <main className="flex-1 max-w-[900px] px-4 py-8 space-y-8" ref={printRef}>
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Target className="text-indigo-500" />
              Learning Report
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Performance analysis and recommendations for <span className="font-bold text-indigo-500">{learningLang.name}</span>
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="print-hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 rounded-xl font-bold text-slate-700 dark:text-slate-200 transition-all active:scale-95"
          >
            <Printer size={18} /> Print Report
          </button>
        </div>

        {/* Profile Card (Useful for Printed Report) */}
        <div className="soft-card p-6 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-3xl mb-8 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl backdrop-blur-md">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'Learner'}</h2>
            <p className="text-indigo-100 font-medium">Goal: {user?.goal ? user.goal.charAt(0).toUpperCase() + user.goal.slice(1) : 'Conversation'}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="soft-card p-5 bg-white dark:bg-slate-900 rounded-3xl">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-3">
              <Zap size={20} />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total XP</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{user?.xp || 0}</p>
          </div>
          
          <div className="soft-card p-5 bg-white dark:bg-slate-900 rounded-3xl">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center mb-3">
              <TrendingUp size={20} />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Current Streak</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{user?.streak || 0} Days</p>
          </div>
          
          <div className="soft-card p-5 bg-white dark:bg-slate-900 rounded-3xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-500 flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Lessons Done</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{completedCount}</p>
          </div>
          
          <div className="soft-card p-5 bg-white dark:bg-slate-900 rounded-3xl">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Time Learned</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{timeString}</p>
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Star className="text-amber-500" size={20} />
            AI Improvement Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec, idx) => (
                <div key={idx} className="soft-card p-5 bg-white dark:bg-slate-900 rounded-2xl flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex shrink-0 items-center justify-center ${rec.bg} ${rec.color}`}>
                    <rec.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">{rec.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <p className="text-slate-500 font-medium">Keep learning to unlock personalized recommendations!</p>
              </div>
            )}
          </div>
        </div>

        {/* Weakness Analysis: Mistake History */}
        <div className="mt-10 page-break-before">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" size={20} />
            Weakness Analysis (Top Mistakes)
          </h2>
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            {mistakes.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Word</th>
                    <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Meaning</th>
                    <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Mistakes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mistakes.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800 dark:text-white">{m.word}</td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{m.translation}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                          {m.count}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No Mistakes Yet!</h3>
                <p className="text-slate-500">You haven't made any mistakes in {learningLang.name} yet. Keep up the perfect work!</p>
              </div>
            )}
          </div>
        </div>

      </main>

      <div className="print-hidden">
        <RightSidebar />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .print-hidden {
            display: none !important;
          }
          .page-break-before {
            page-break-before: always;
          }
          body {
            background-color: white !important;
          }
          main {
            margin-left: 0 !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .soft-card {
            border: 1px solid #e2e8f0;
            box-shadow: none !important;
          }
        }
      `}} />
    </div>
  )
}
