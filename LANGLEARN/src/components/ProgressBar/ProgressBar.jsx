import { motion } from 'framer-motion'

export default function ProgressBar({ 
  progress = 0, 
  size = 'medium',
  showLabel = true,
  className = '',
  color = 'bg-primary'
}) {
  const safeProgress = Number.isFinite(Number(progress))
    ? Math.min(100, Math.max(0, Number(progress)))
    : 0
  const sizes = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  }
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Progress</span>
          <span className="text-xs font-black text-primary">{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-hover rounded-full overflow-hidden shadow-inner ${sizes[size]}`}>
        <motion.div
          className={`h-full rounded-full ${color} shadow-glow`}
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
