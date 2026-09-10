import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { useTheme } from '../../services/themeContext'
import { languages } from '../../data/languages'
import { API_CATALOGUE } from '../../services/freeLanguageApi'

import LanguageFlag from '../../components/LanguageFlag/LanguageFlag'
import Button from '../../components/Button'
import { Sun, Moon, Sparkles, Leaf, Globe2, Check, Volume2, VolumeX, Mic, MicOff, Shield, Sliders } from 'lucide-react'
import { speechRecognitionService } from '../../services/audio/SpeechRecognitionService'

const THEMES = [
  { id: 'light', name: 'Indigo Light', icon: Sun, color: '#6366F1' },
  { id: 'dark', name: 'Dark Slate', icon: Moon, color: '#818CF8' },
  { id: 'saffron', name: 'Saffron Warm', icon: Sparkles, color: '#EA580C' },
  { id: 'emerald', name: 'Emerald Soft', icon: Leaf, color: '#10B981' },
]

// Audio settings stored in localStorage
function useAudioSettings() {
  const [audioEnabled, setAudioEnabledState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bl_audio_enabled') ?? 'true') } catch { return true }
  })
  const [soundFX, setSoundFXState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bl_sound_fx') ?? 'true') } catch { return true }
  })
  const [speakingEnabled, setSpeakingEnabledState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bl_speaking_enabled') ?? 'true') } catch { return true }
  })

  const setAudioEnabled = (v) => {
    localStorage.setItem('bl_audio_enabled', JSON.stringify(v))
    setAudioEnabledState(v)
  }
  const setSoundFX = (v) => {
    localStorage.setItem('bl_sound_fx', JSON.stringify(v))
    setSoundFXState(v)
  }
  const setSpeakingEnabled = (v) => {
    localStorage.setItem('bl_speaking_enabled', JSON.stringify(v))
    setSpeakingEnabledState(v)
  }

  return { audioEnabled, setAudioEnabled, soundFX, setSoundFX, speakingEnabled, setSpeakingEnabled }
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
      aria-label={label}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const { user, updateUser, logout } = useAuth()
  const { theme, setTheme, siteLanguage, setSiteLanguage, t } = useTheme()
  const { audioEnabled, setAudioEnabled, soundFX, setSoundFX, speakingEnabled, setSpeakingEnabled } = useAudioSettings()
  const asrSupported = speechRecognitionService.isSupported()

  const handleLanguageChange = (field, value) => {
    updateUser({ [field]: value })
  }

  const handleDailyGoalChange = (value) => {
    updateUser({ dailyGoal: parseInt(value) })
  }

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      updateUser({
        xp: 0,
        streak: 0,
        completedLessons: [],
        vocabulary: {},
        achievements: [],
        level: 'beginner',
      })
      alert('Progress has been reset.')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-transparent flex justify-center pb-20 md:pb-0 font-sans">
      {/* 1. LEFT SIDEBAR */}


      {/* 2. CENTER SETTINGS CONTENT */}
      <main className="flex-1 max-w-[720px] px-4 py-6 md:py-8 space-y-6">
        {/* Header Title */}
        <div className="soft-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sliders size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">Settings</h1>
              <p className="text-xs font-semibold text-slate-400">Personalize your learning preferences & experience</p>
            </div>
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full">
            v1.0.0
          </span>
        </div>

        {/* Bento Grid: Row 1 - Theme & Daily Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Appearance & Themes */}
          <div className="bento-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white mb-1">
                Visual Theme
              </h3>
              <p className="text-xs text-slate-400 mb-4">Select your preferred color mood</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {THEMES.map((th) => {
                const Icon = th.icon
                const isSelected = theme === th.id
                return (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id)}
                    className={`p-3 rounded-2xl border-2 text-center flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-200'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: th.color }}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="flex items-center gap-1">
                      {th.name}
                      {isSelected && <Check size={12} className="text-indigo-600 dark:text-indigo-400" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Daily Learning Goals */}
          <div className="bento-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white mb-1">Daily Learning Goal</h3>
              <p className="text-xs text-slate-400 mb-4">Set your daily commitment for streak maintenance</p>
            </div>

            <div className="space-y-2">
              {[
                { min: 5, xp: 5, label: 'Casual (5 mins)' },
                { min: 10, xp: 10, label: 'Regular (10 mins)' },
                { min: 15, xp: 15, label: 'Serious (15 mins)' },
                { min: 20, xp: 20, label: 'Intense (20 mins)' },
              ].map((goal) => {
                const isSelected = (user?.dailyGoal || 10) === goal.min
                return (
                  <button
                    key={goal.min}
                    type="button"
                    onClick={() => handleDailyGoalChange(goal.min)}
                    className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-200'
                    }`}
                  >
                    <span>{goal.label}</span>
                    <span className="text-[11px] font-black text-amber-500">+{goal.xp} XP</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Site Language & Active Course Bento Card */}
        <div className="soft-card p-6 space-y-5">
          <h3 className="text-base font-black text-slate-800 dark:text-white">Language Preferences</h3>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">
              UI Interface Language
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {languages.map((lang) => {
                const isSelected = siteLanguage === lang.id
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSiteLanguage(lang.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LanguageFlag languageId={lang.id} size={18} />
                      <span>{lang.name} ({lang.nativeName})</span>
                    </div>
                    {isSelected && <Check size={14} />}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">
              Active Target Language Course
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {languages.filter((l) => l.id !== 'en').map((lang) => {
                const isSelected = user?.learningLanguage === lang.id
                return (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange('learningLanguage', lang.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LanguageFlag languageId={lang.id} size={18} />
                      <span>{lang.name} ({lang.nativeName})</span>
                    </div>
                    {isSelected && <Check size={14} />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Audio & Speech Settings */}
        <div className="soft-card p-6 space-y-4">
          <h3 className="text-base font-black text-slate-800 dark:text-white mb-1">Audio & Speech Controls</h3>

          <div className="space-y-4">
            {/* Audio ON/OFF */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Text-to-Speech Playback</p>
                  <p className="text-[11px] text-slate-400">Audio playback for questions and vocabulary</p>
                </div>
              </div>
              <Toggle checked={audioEnabled} onChange={setAudioEnabled} label="Toggle audio" />
            </div>

            {/* Sound FX */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">
                  🎵
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Gamification Sound FX</p>
                  <p className="text-[11px] text-slate-400">Celebration chimes and answer feedback</p>
                </div>
              </div>
              <Toggle checked={soundFX} onChange={setSoundFX} label="Toggle sound effects" />
            </div>

            {/* Speaking practice */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  {speakingEnabled ? <Mic size={18} /> : <MicOff size={18} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Microphone Speaking Practice</p>
                  <p className="text-[11px] text-slate-400">
                    {asrSupported
                      ? 'Pronunciation evaluation via browser speech recognition'
                      : 'Speech recognition is not supported in this browser'}
                  </p>
                </div>
              </div>
              <Toggle checked={speakingEnabled && asrSupported} onChange={setSpeakingEnabled} label="Toggle speaking practice" />
            </div>
          </div>
        </div>

        {/* Free Public Language APIs Documentation */}
        <div className="soft-card p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Globe2 size={18} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-black text-slate-800 dark:text-white">Integrated Free Language APIs</h3>
          </div>
          <p className="text-xs text-slate-400">
            LangLearn utilizes production-ready, open language intelligence APIs:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {API_CATALOGUE.map((api, idx) => (
              <div
                key={idx}
                className="p-3.5 bento-card text-xs"
              >
                <div className="flex items-center justify-between font-black text-slate-800 dark:text-white">
                  <span>{api.name}</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-bold">FREE</span>
                </div>
                <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">{api.description}</p>
                <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                  Usage: {api.usageLocation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="soft-card p-6 space-y-3">
          <h3 className="text-base font-black text-slate-800 dark:text-white mb-2">Account Security & Actions</h3>
          <div className="flex gap-3">
            <Button variant="danger" className="flex-1 font-bold" onClick={handleResetProgress}>
              Reset Progress
            </Button>
            <Button variant="outline" className="flex-1 font-bold" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pt-2 pb-6">
          <p className="font-bold text-slate-500 dark:text-slate-400">LangLearn v1.0.0</p>
          <p>© {new Date().getFullYear()} LangLearn. All rights reserved.</p>
        </div>
      </main>
    </div>
  )
}
