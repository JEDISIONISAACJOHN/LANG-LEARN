import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Globe, Check, Sun, Moon, Sparkles, Leaf, X } from 'lucide-react'
import { useTheme } from '../../services/themeContext'
import { useAuth } from '../../services/auth'
import { languages } from '../../data/languages'
import LanguageFlag from '../LanguageFlag/LanguageFlag'

const THEMES = [
  { id: 'light', name: 'Indigo Light', icon: Sun, color: '#6366F1', bg: '#F8FAFC' },
  { id: 'dark', name: 'Dark Slate', icon: Moon, color: '#818CF8', bg: '#0B0F19' },
  { id: 'saffron', name: 'Saffron Warm', icon: Sparkles, color: '#EA580C', bg: '#FFFBEB' },
  { id: 'emerald', name: 'Emerald Soft', icon: Leaf, color: '#10B981', bg: '#ECFDF5' },
]

export default function SiteSettingsBar() {
  const { theme, setTheme, siteLanguage, setSiteLanguage, t } = useTheme()
  const { user, updateUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-8 z-[100]" ref={menuRef}>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl rounded-full text-xs font-bold text-slate-800 dark:text-white transition-all hover:shadow-2xl cursor-pointer"
        title="Theme & Site Language Options"
      >
        <Palette size={16} className="text-indigo-600 dark:text-indigo-400" />
        <Globe size={16} className="text-violet-500" />
        <span className="hidden sm:inline">Theme & Language</span>
      </motion.button>

      {/* Floating Settings Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            className="absolute top-14 right-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-black text-slate-800 dark:text-white">Theme & Language</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Theme Selector */}
            <div className="py-3">
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {t('theme')} (Visual Palette)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((th) => {
                  const Icon = th.icon
                  const isSelected = theme === th.id
                  return (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`p-2.5 rounded-2xl border-2 text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-xs'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-200'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                        style={{ backgroundColor: th.color }}
                      >
                        <Icon size={12} />
                      </div>
                      <span className="truncate flex-1">{th.name}</span>
                      {isSelected && <Check size={13} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Site Interface Language */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {t('site_language')} (UI Text)
              </p>
              <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                {languages.map((lang) => {
                  const isSelected = siteLanguage === lang.id
                  return (
                    <button
                      key={`site-${lang.id}`}
                      onClick={() => setSiteLanguage(lang.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <LanguageFlag languageId={lang.id} size={18} />
                        <span>{lang.name} ({lang.nativeName})</span>
                      </div>
                      {isSelected && <Check size={14} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Learning Language (Content) */}
            {user && (
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Learning Language (Content)
                </p>
                <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                  {languages.map((lang) => {
                    const isSelected = user?.learningLanguage === lang.id
                    return (
                      <button
                        key={`learn-${lang.id}`}
                        onClick={() => {
                          if (updateUser) {
                            updateUser({ learningLanguage: lang.id })
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <LanguageFlag languageId={lang.id} size={18} />
                          <span>{lang.name} ({lang.nativeName})</span>
                        </div>
                        {isSelected && <Check size={14} />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Footer tip */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 font-medium">
              Changes save automatically
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
