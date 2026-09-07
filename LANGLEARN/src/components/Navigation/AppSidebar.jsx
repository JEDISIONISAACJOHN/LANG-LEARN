import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookA, Target, Trophy, User, Settings, BookOpen, Bot, Layers } from 'lucide-react'
import LangLearnLogo from '../Logo/LangLearnLogo'
import AlphabetModal from '../AlphabetModal/AlphabetModal'
import { useAuth } from '../../services/auth'
import { getLanguageById } from '../../data/languages'
import { useTheme } from '../../services/themeContext'

export default function AppSidebar() {
  const location = useLocation()
  const { user } = useAuth()
  const { t } = useTheme()
  const [showAlphabetModal, setShowAlphabetModal] = useState(false)

  const learningLang = getLanguageById(user?.learningLanguage) || { name: 'Hindi' }

  const navItems = [
    { to: '/dashboard', label: t('learn') || 'LEARN', icon: Home },
    { to: '/stories', label: t('stories') || 'STORIES', icon: BookOpen },
    { to: '/tutor', label: t('tutor') || 'AI TUTOR', icon: Bot },
    { to: '/letters', label: t('letters') || 'SCRIPT / LETTERS', icon: BookA },
    { to: '/practice', label: t('practice') || 'PRACTICE', icon: Target },
    { to: '/leaderboard', label: t('leaderboard') || 'LEADERBOARDS', icon: Trophy },
    { to: '/curriculum', label: t('curriculum') || 'CURRICULUM', icon: Layers },
    { to: '/profile', label: t('profile') || 'PROFILE', icon: User },
    { to: '/settings', label: t('settings') || 'SETTINGS', icon: Settings },
  ]

  return (
    <>
      {/* ======================================================== */}
      {/* 1. DESKTOP FIXED LEFT SIDEBAR (Floating Soft UI)         */}
      {/* ======================================================== */}
      <aside className="hidden md:flex flex-col justify-between w-60 h-[calc(100vh-2rem)] fixed left-4 top-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2rem] shadow-soft border border-white/50 dark:border-slate-700/50 p-4 z-40">
        <div>
          {/* Logo Brand Header */}
          <NavLink to="/dashboard" className="block px-2 py-2 mb-4 hover:scale-105 transition-transform">
            <LangLearnLogo size="medium" />
          </NavLink>

          {/* Vertical Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item, idx) => {
              const Icon = item.icon
              if (item.action === 'alphabet') {
                return (
                  <button
                    key={idx}
                    onClick={() => setShowAlphabetModal(true)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-extrabold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-pastel-pink dark:hover:bg-slate-800 hover:text-brand-primary dark:hover:text-white hover:scale-[1.02] transition-all text-left group border-2 border-transparent hover:border-pink-200"
                  >
                    <Icon size={22} className="text-slate-500 group-hover:text-brand-primary transition-colors" />
                    <span>{item.label}</span>
                  </button>
                )
              }

              const isActive = location.pathname === item.to
              return (
                <NavLink
                  key={idx}
                  to={item.to}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-pastel-blue dark:bg-indigo-900/30 border-2 border-brand-primary-light dark:border-indigo-600 text-brand-primary dark:text-indigo-300 shadow-sm scale-[1.02]'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02] hover:text-slate-800 dark:hover:text-white border-2 border-transparent'
                  }`}
                >
                  <Icon size={22} className={isActive ? 'text-brand-primary dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-500'} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Footer User Mini-Pill */}
        {user && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ======================================================== */}
      {/* 2. MOBILE FIXED BOTTOM NAVIGATION BAR (Height 64px)       */}
      {/* ======================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-around px-2 z-40 shadow-lg">
        {navItems.slice(0, 5).map((item, idx) => {
          const Icon = item.icon
          if (item.action === 'alphabet') {
            return (
              <button
                key={idx}
                onClick={() => setShowAlphabetModal(true)}
                className="flex flex-col items-center justify-center p-1 text-slate-500 dark:text-slate-400"
              >
                <Icon size={22} />
                <span className="text-[10px] font-bold mt-0.5">Letters</span>
              </button>
            )
          }

          const isActive = location.pathname === item.to
          return (
            <NavLink
              key={idx}
              to={item.to}
              className={`flex flex-col items-center justify-center p-1 transition-colors ${
                isActive ? 'text-indigo-600 dark:text-indigo-400 font-black' : 'text-slate-500 dark:text-slate-400 font-semibold'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] mt-0.5">{item.label.split(' ')[0]}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Alphabet / Script Explorer Modal */}
      <AlphabetModal
        languageId={user?.learningLanguage || 'hi'}
        languageName={learningLang.name}
        isOpen={showAlphabetModal}
        onClose={() => setShowAlphabetModal(false)}
      />
    </>
  )
}
