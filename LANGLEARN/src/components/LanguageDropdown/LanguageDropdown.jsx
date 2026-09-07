import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Globe } from 'lucide-react'
import { languages, getLanguageById } from '../../data/languages'
import { useAuth } from '../../services/auth'
import { useTheme } from '../../services/themeContext'
import LanguageFlag from '../LanguageFlag/LanguageFlag'

export default function LanguageDropdown() {
  const { user, updateUser } = useAuth()
  const { setSiteLanguage } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = getLanguageById(user?.learningLanguage) || languages[0]
  const preferredLang = getLanguageById(user?.preferredLanguage || 'en') || languages[1]

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectLanguage = (langId) => {
    if (langId !== user?.learningLanguage) {
      updateUser({ learningLanguage: langId })
    }
    setIsOpen(false)
  }

  const handleSelectPreferred = (langId) => {
    if (langId !== user?.preferredLanguage) {
      updateUser({ preferredLanguage: langId })
    }
    setSiteLanguage(langId) // Update the UI theme's site language simultaneously
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
        title="Switch Learning Course"
      >
        <LanguageFlag languageId={currentLang.id} size={18} />
        <span className="truncate max-w-[80px]">{currentLang.name}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-3.5 z-50 overflow-hidden"
          >
            {/* Learning Language Section */}
            <div className="px-2 py-1 text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Learning Course
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 mt-1">
              {languages.map((lang) => {
                const isSelected = currentLang.id === lang.id
                return (
                  <button
                    key={lang.id}
                    onClick={() => handleSelectLanguage(lang.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium'
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

            {/* Preferred / Source Language Section */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
              <div className="px-2 py-1 text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Globe size={13} />
                <span>I Speak (UI / Questions)</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1 mt-1">
                {languages.map((lang) => {
                  const isSelected = preferredLang.id === lang.id
                  return (
                    <button
                      key={lang.id}
                      onClick={() => handleSelectPreferred(lang.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium'
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
