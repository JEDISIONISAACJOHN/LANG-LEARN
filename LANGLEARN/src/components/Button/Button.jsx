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
  const baseStyles = 'font-black uppercase tracking-widest rounded-2xl transition-all inline-flex items-center justify-center select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none'

  const variants = {
    primary: 'bg-primary hover:bg-accent-primary text-white border-b-4 border-accent-secondary active:translate-y-[2px] active:border-b-2 shadow-glow',
    secondary: 'bg-accent-primary hover:brightness-110 text-white border-b-4 border-accent-secondary active:translate-y-[2px] active:border-b-2',
    outline: 'border-2 border-b-4 border-border-subtle bg-surface text-text-primary hover:bg-surface-hover hover:border-primary/50 active:translate-y-[2px] active:border-b-2',
    danger: 'bg-error hover:brightness-110 text-white border-b-4 border-error/70 active:translate-y-[2px] active:border-b-2',
    ghost: 'text-text-secondary hover:bg-surface-hover hover:text-text-primary active:translate-y-[2px]',
    soft: 'bg-primary/10 border-b-4 border-primary/20 text-primary hover:bg-primary/20 active:translate-y-[2px] active:border-b-2',
  }

  const sizes = {
    small: 'px-4 py-2 text-xs rounded-xl',
    medium: 'px-6 py-3 text-sm rounded-2xl',
    large: 'px-8 py-4 text-base rounded-[1.25rem]',
  }

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.medium} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
