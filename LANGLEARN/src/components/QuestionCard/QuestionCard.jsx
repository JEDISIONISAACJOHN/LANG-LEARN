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
        p-6 sm:p-8 md:p-12 bg-surface/80 backdrop-blur-xl border-2 border-border-subtle shadow-2xl rounded-[2.5rem] relative overflow-hidden transition-all
        ${showResult ? (isCorrect ? 'border-success/50 ring-4 ring-success/20' : 'border-error/50 ring-4 ring-error/20') : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 border-t border-white/5 pointer-events-none rounded-[2.5rem]"></div>
      
      {showResult && (
        <motion.div
          className={`
            flex items-center justify-center w-14 h-14 rounded-2xl mb-8 shadow-sm
            ${isCorrect ? 'bg-success text-white shadow-success/30' : 'bg-error text-white shadow-error/30'}
          `}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {isCorrect ? <Check className="text-white" size={28} strokeWidth={3} /> : <X className="text-white" size={28} strokeWidth={3} />}
        </motion.div>
      )}
      
      {children}
    </motion.div>
  )
}
