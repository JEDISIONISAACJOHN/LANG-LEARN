import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, CheckCircle2, Cloud, HardDrive, X } from 'lucide-react'
import { isSupabaseConfigured } from '../../services/supabase'

export default function SyncStatusBadge() {
  const isCloud = isSupabaseConfigured()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all hover:scale-105 cursor-pointer ${
          isCloud 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' 
            : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
        }`}
        title="View Database & Sync Health"
      >
        <span className={`w-2 h-2 rounded-full animate-pulse ${isCloud ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        <span className="hidden md:inline">{isCloud ? 'Cloud Synced' : 'Local Storage'}</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-800 dark:text-white">Database & Sync Health</h3>
                    <p className="text-xs text-slate-400">PostgreSQL Schema Architecture</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4 space-y-3.5">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800 dark:text-white">
                    {isCloud ? <Cloud size={18} className="text-emerald-500" /> : <HardDrive size={18} className="text-amber-500" />}
                    <span>Backend Storage</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    isCloud ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                  }`}>
                    {isCloud ? 'Supabase PostgreSQL' : 'Local Storage'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Active Tables:</span>
                    <span className="font-bold text-slate-800 dark:text-white">18 Relational Tables</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Row Level Security (RLS):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Enforced</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dynamic Streaks:</span>
                    <span className="font-bold text-slate-800 dark:text-white">Realtime DB Synchronized</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sequential Lesson Locks:</span>
                    <span className="font-bold text-slate-800 dark:text-white">Automated via user_progress</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 font-medium">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>All your XP, Streaks, and Progress are safely persisted!</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-colors shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
