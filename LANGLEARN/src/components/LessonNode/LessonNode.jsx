import { motion } from 'framer-motion'
import { Check, Lock, Play } from 'lucide-react'

export default function LessonNode({ 
  lesson, 
  status = 'locked', 
  onClick, 
  current = false,
  className = ''
}) {
  const statusStyles = {
    completed: 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20',
    current: 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-100 dark:ring-indigo-950/60',
    locked: 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700',
  }
  
  const icons = {
    completed: <Check size={22} strokeWidth={2.5} />,
    current: <Play size={22} fill="currentColor" strokeWidth={0} className="translate-x-0.5" />,
    locked: <Lock size={20} strokeWidth={2} />,
  }
  
  return (
    <motion.div
      className={`
        relative flex flex-col items-center cursor-pointer select-none
        ${className}
      `}
      onClick={status !== 'locked' ? onClick : undefined}
      whileHover={status !== 'locked' ? { scale: 1.06 } : {}}
      whileTap={status !== 'locked' ? { scale: 0.94 } : {}}
    >
      <div
        className={`
          w-16 h-16 rounded-3xl flex items-center justify-center border-2 transition-all
          ${statusStyles[status]}
          ${status === 'current' ? 'animate-pulse' : ''}
        `}
      >
        {icons[status]}
      </div>
      
      <div className="mt-2.5 text-center">
        <p className="text-sm font-bold text-slate-800 dark:text-white leading-snug">{lesson.name}</p>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{lesson.nameNative}</p>
      </div>
    </motion.div>
  )
}
