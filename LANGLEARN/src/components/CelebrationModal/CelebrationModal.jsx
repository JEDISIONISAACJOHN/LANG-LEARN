import { motion } from 'framer-motion'
import { Flame, Zap, Award, ArrowRight, Home, CheckCircle2 } from 'lucide-react'
import Button from '../Button'
import BharatMascot from '../Mascot/BharatMascot'

export default function CelebrationModal({
  totalXP = 25,
  streak = 1,
  streakIncreased = true,
  isPerfect = false,
  accuracy = 100,
  nextLesson = null,
  onContinueNext,
  onGoDashboard,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-4 px-2 space-y-6"
    >
      {/* Celebration Mascot & Header */}
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <BharatMascot size={92} mood="celebrating" />
        </motion.div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white">Lesson Complete!</h2>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          {accuracy}% Accuracy {isPerfect && '• Perfect Score! ⭐'}
        </p>
      </div>

      {/* Rewards Bento Grid */}
      <div className="grid grid-cols-2 gap-3.5 max-w-md mx-auto">
        {/* XP Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 bento-card flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mb-2 shadow-sm">
            <Zap size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-amber-500 dark:text-amber-400">+{totalXP} XP</span>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Earned</span>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 bento-card flex flex-col items-center justify-center relative overflow-hidden"
        >
          {streakIncreased && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded-full">
              +1
            </span>
          )}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mb-2 shadow-sm"
          >
            <Flame size={24} fill="currentColor" />
          </motion.div>
          <span className="text-2xl font-black text-rose-500 dark:text-rose-400">
            {streak} {streak === 1 ? 'Day' : 'Days'}
          </span>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {streakIncreased ? 'Streak Increased!' : 'Streak Active'}
          </span>
        </motion.div>
      </div>

      {/* Next Lesson Unlocked Card */}
      {nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bento-card text-left flex items-center justify-between max-w-md mx-auto hover:border-indigo-300 transition-all cursor-pointer"
          onClick={onContinueNext}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Next Lesson Unlocked</p>
              <p className="text-base font-black text-slate-800 dark:text-white">{nextLesson.name}</p>
              <p className="text-xs text-slate-400">{nextLesson.nameNative}</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-indigo-600 dark:text-indigo-400" />
        </motion.div>
      )}

      {/* Action CTA Buttons */}
      <div className="space-y-3 pt-2 max-w-md mx-auto">
        {nextLesson && (
          <Button
            size="large"
            className="w-full font-black flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            onClick={onContinueNext}
          >
            <span>Start Next Lesson</span>
            <ArrowRight size={18} />
          </Button>
        )}
        <Button
          variant="outline"
          size="large"
          className="w-full font-bold flex items-center justify-center gap-2"
          onClick={onGoDashboard}
        >
          <Home size={18} />
          <span>Back to Dashboard</span>
        </Button>
      </div>
    </motion.div>
  )
}
