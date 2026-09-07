import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

export default function QuestionCard({ 
  children, 
  showResult = false,
  isCorrect = false,
  className = ''
}) {
  return (
    <motion.div
      className={`
        soft-card p-6 md:p-10 relative overflow-hidden transition-all
        ${showResult ? (isCorrect ? 'ring-2 ring-emerald-400/80 dark:ring-emerald-500/80' : 'ring-2 ring-rose-400/80 dark:ring-rose-500/80') : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {showResult && (
        <motion.div
          className={`
            flex items-center justify-center w-12 h-12 rounded-2xl mb-5 shadow-sm
            ${isCorrect ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-rose-500 text-white shadow-rose-500/30'}
          `}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {isCorrect ? <Check className="text-white" size={24} strokeWidth={3} /> : <X className="text-white" size={24} strokeWidth={3} />}
        </motion.div>
      )}
      
      {children}
    </motion.div>
  )
}
