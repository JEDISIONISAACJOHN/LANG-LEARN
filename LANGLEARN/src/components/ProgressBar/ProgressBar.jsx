import { motion } from 'framer-motion'

export default function ProgressBar({ 
  progress = 0, 
  size = 'medium',
  showLabel = true,
  className = '',
  color = '#6366F1'
}) {
  const safeProgress = Number.isFinite(Number(progress))
    ? Math.min(100, Math.max(0, Number(progress)))
    : 0
  const sizes = {
    small: 'h-2',
    medium: 'h-2.5',
    large: 'h-3.5',
  }
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Progress</span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 ${sizes[size]}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
