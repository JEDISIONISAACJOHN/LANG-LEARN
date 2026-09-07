import { motion } from 'framer-motion'
import LanguageFlag from '../LanguageFlag/LanguageFlag'

// Friendly language visual badges and color accents
const LANGUAGE_VISUALS = {
  hi: {
    letter: 'अ',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300',
    region: 'Devanagari',
  },
  en: {
    letter: 'Aa',
    color: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300',
    region: 'Global',
  },
  ta: {
    letter: 'அ',
    color: 'from-violet-500 to-purple-500',
    bgLight: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300',
    region: 'Tamil Nadu',
  },
  te: {
    letter: 'అ',
    color: 'from-fuchsia-500 to-pink-500',
    bgLight: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300',
    region: 'Telangana & AP',
  },
  ml: {
    letter: 'അ',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300',
    region: 'Kerala',
  },
  kn: {
    letter: 'ಅ',
    color: 'from-amber-500 to-yellow-600',
    bgLight: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300',
    region: 'Karnataka',
  },
}

export default function LanguageCard({ 
  language, 
  selected = false, 
  onClick, 
  disabled = false,
  className = ''
}) {
  const visual = LANGUAGE_VISUALS[language.id] || {
    letter: language.name.charAt(0),
    color: 'from-indigo-500 to-violet-500',
    bgLight: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300',
    region: 'India',
  }

  return (
    <motion.div
      className={`
        relative p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 text-left select-none overflow-hidden
        ${selected 
          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30 shadow-lg shadow-indigo-100 dark:shadow-none' 
          : 'border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-indigo-300 hover:shadow-md'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
      whileHover={!disabled ? { y: -3, scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* Selection Check Badge */}
      {selected && (
        <motion.div
          className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md shadow-indigo-300/40"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Friendly Script Illustration Emblem */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm ${visual.bgLight}`}>
          {visual.letter}
        </div>
        <LanguageFlag languageId={language.id} size={24} />
      </div>
      
      <div>
        <h3 className="text-base font-extrabold text-slate-800 dark:text-white leading-tight">
          {language.name}
        </h3>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {language.nativeName}
        </p>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-indigo-500/80 dark:text-indigo-400/80">
          {visual.region}
        </div>
      </div>
    </motion.div>
  )
}
