import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false, 
  onClick, 
  type = 'button', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'font-black uppercase tracking-widest rounded-2xl transition-all inline-flex items-center justify-center select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'

  const variants = {
    primary: 'bg-brand-primary hover:brightness-110 text-white border-b-4 border-indigo-700 active:translate-y-[2px] active:border-b-2',
    secondary: 'bg-amber-500 hover:brightness-110 text-white border-b-4 border-amber-700 active:translate-y-[2px] active:border-b-2',
    outline: 'border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:translate-y-[2px] active:border-b-2',
    danger: 'bg-rose-500 hover:brightness-110 text-white border-b-4 border-rose-700 active:translate-y-[2px] active:border-b-2',
    ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-y-[2px]',
    soft: 'bg-pastel-blue border-b-4 border-indigo-200 dark:border-indigo-800 dark:bg-indigo-950/40 text-brand-primary dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 active:translate-y-[2px] active:border-b-2',
  }

  const sizes = {
    small: 'px-4 py-2 text-xs',
    medium: 'px-6 py-3 text-sm',
    large: 'px-8 py-4 text-base',
  }

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.medium} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { y: -1 } : {}}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
