import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trophy, Zap, Heart, RotateCcw, Search, Volume2, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../services/auth'
import { useProgress } from '../../services/progress'
import { getLanguageById } from '../../data/languages'
import { translateTextLive } from '../../services/freeLanguageApi'
import { speakText } from '../../services/aiService'
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown'
import StreakBadge from '../StreakBadge'
import XPBadge from '../XPBadge'

export default function RightSidebar() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { hearts, restoreHearts, gems, quests, claimQuestReward } = useProgress()

  const [queryText, setQueryText] = useState('')
  const [translatedResult, setTranslatedResult] = useState(null)
  const [isTranslating, setIsTranslating] = useState(false)

  const learningLang = getLanguageById(user?.learningLanguage) || { name: 'Hindi', flag: '🇮🇳', id: 'hi' }
  const preferredLang = getLanguageById(user?.preferredLanguage || 'en') || { name: 'English', id: 'en' }

  const handleLiveTranslate = async (e) => {
    e.preventDefault()
    if (!queryText.trim()) return

    setIsTranslating(true)
    const res = await translateTextLive(queryText, preferredLang.id, learningLang.id)
    setIsTranslating(false)
    setTranslatedResult(res)
  }

  const handlePlayAudio = (text) => {
    speakText(text, learningLang.id)
  }

  return (
    <aside className="w-80 hidden lg:flex flex-col space-y-5 shrink-0 py-6 pr-4">
      {/* 1. TOP HEADER STATUS BAR (Flag, Streak, XP, Gems, Hearts) */}
      <div className="flex items-center justify-between gap-1.5 p-2 soft-card">
        <LanguageDropdown />
        <StreakBadge streak={user?.streak || 0} />
        <XPBadge xp={user?.xp || 0} />
        <div className="flex items-center gap-1 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-1 rounded-xl border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300">
          <span className="text-xs">💎</span>
          <span className="text-xs font-black">{gems}</span>
        </div>
        <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-2 py-1 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
          <Heart size={14} className="text-rose-500 fill-rose-500" />
          <span className="text-xs font-black">{hearts}</span>
          {hearts < 5 && (
            <button
              onClick={restoreHearts}
              className="text-emerald-600 hover:scale-110 transition-transform ml-0.5"
              title="Refill Hearts"
            >
              <RotateCcw size={11} />
            </button>
          )}
        </div>
      </div>

      {/* 2. LIVE AI TRANSLATOR & WORD LOOKUP */}
      <div className="soft-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-indigo-500" />
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Live AI Translator
          </h4>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
          Translate into <span className="font-bold text-indigo-600 dark:text-indigo-400">{learningLang.name}</span> instantly
        </p>

        <form onSubmit={handleLiveTranslate} className="space-y-2.5">
          <div className="relative">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder={`Type in ${preferredLang.name}...`}
              className="w-full text-xs font-medium px-3 py-2.5 pr-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 dark:text-white"
            />
            <button
              type="submit"
              disabled={isTranslating || !queryText.trim()}
              className="absolute right-2 top-2 text-slate-400 hover:text-indigo-600"
            >
              <Search size={15} />
            </button>
          </div>
        </form>

        {translatedResult && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-black text-indigo-700 dark:text-indigo-300">{translatedResult.translatedText}</p>
              <p className="text-[9px] text-slate-400">via {translatedResult.provider}</p>
            </div>
            <button
              onClick={() => handlePlayAudio(translatedResult.translatedText)}
              className="p-1.5 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 shadow-sm hover:scale-105 transition-transform"
            >
              <Volume2 size={15} />
            </button>
          </motion.div>
        )}
      </div>

      {/* 3. DAILY QUESTS WIDGET */}
      <div className="soft-card p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Daily Quests
          </h4>
          <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
            <Zap size={13} fill="currentColor" />
            <span>Rewards</span>
          </span>
        </div>

        <div className="space-y-3">
          {quests.map((quest) => (
            <div key={quest.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  size={16}
                  className={quest.completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}
                />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{quest.title}</p>
                  <p className="text-[10px] text-slate-400">
                    {quest.current} / {quest.target}
                  </p>
                </div>
              </div>

              {quest.completed && !quest.claimed ? (
                <button
                  onClick={() => claimQuestReward(quest.id)}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[10px] shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  Claim!
                </button>
              ) : quest.claimed ? (
                <span className="text-[10px] font-bold text-emerald-500">Claimed ✓</span>
              ) : (
                <span className="font-extrabold text-amber-500 text-[11px]">
                  +{quest.rewardXP} XP
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. LEADERBOARD LEAGUE PREVIEW */}
      <div
        onClick={() => navigate('/leaderboard')}
        className="bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-amber-900/20 dark:to-slate-900 rounded-3xl border border-amber-500/30 p-5 shadow-sm cursor-pointer hover:border-amber-500 transition-all group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Trophy size={16} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Weekly League</p>
              <p className="text-[10px] text-slate-400">Rank #{user?.rank || 1} • Top 3 Advance</p>
            </div>
          </div>
        </div>
        <div className="w-full py-2 mt-2 bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs text-center rounded-xl transition-colors">
          View Leaderboard →
        </div>
      </div>
    </aside>
  )
}
