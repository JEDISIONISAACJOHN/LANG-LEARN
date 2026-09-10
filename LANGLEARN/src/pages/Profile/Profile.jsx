import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { achievements } from '../../data/achievements'
import { getLanguageById } from '../../data/languages'

import RightSidebar from '../../components/RightSidebar/RightSidebar'
import Button from '../../components/Button'
import { Award, Flame, Zap, BookOpen, Calendar, Target } from 'lucide-react'

const AGE_LABELS = {
  'child':       'Under 13',
  'teen':        '13–17',
  'young-adult': '18–25',
  'adult':       '26–49',
  'senior':      '50+',
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const language = getLanguageById(user?.learningLanguage)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const unlockedAchievements = user
    ? achievements.filter((achievement) => achievement.condition(user))
    : []

  return (
    <div className="min-h-screen bg-transparent flex justify-center pb-20 md:pb-0 font-sans">
      {/* 1. LEFT SIDEBAR */}


      {/* 2. CENTER PROFILE CONTENT */}
      <main className="flex-1 max-w-[620px] px-4 py-6 md:py-8 space-y-6">
        {/* User Card */}
        <div className="soft-card p-6 md:p-8">
          <div className="flex items-center gap-5 mb-6">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || 'LangLearn'}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
              alt={user?.name}
              className="w-20 h-20 rounded-3xl border-2 border-indigo-500 p-1 bg-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">{user?.name}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <Calendar size={13} />
                <span>Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
              <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-xl">
                <Zap size={18} fill="currentColor" />
                <span>{user?.xp || 0}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Total XP</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
              <div className="flex items-center justify-center gap-1 text-rose-500 font-black text-xl">
                <Flame size={18} fill="currentColor" />
                <span>{user?.streak || 0}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Day Streak</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
              <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-xl">
                <BookOpen size={18} />
                <span>{user?.completedLessons?.length || 0}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Mastered</p>
            </div>
          </div>
        </div>

        {/* Learning Plan Summary (if available) */}
        {user?.learningPlan && (
          <div className="soft-card p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Target size={18} />
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wider">
                Personalized Learning Plan
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="font-black text-sm text-indigo-600 dark:text-indigo-400">{user.learningPlan.startingLevel}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">Level</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="font-black text-sm text-violet-600 dark:text-violet-400">{user.learningPlan.goal}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">Goal</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="font-black text-sm text-amber-500 dark:text-amber-400">{user.learningPlan.dailyPractice}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">Daily</p>
              </div>
            </div>
            {user.ageRange && (
              <p className="text-xs text-slate-400 font-medium">
                Age group: <span className="font-bold text-slate-700 dark:text-slate-200">{AGE_LABELS[user.ageRange] || user.ageRange}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              {(user.learningPlan.focusAreas || []).slice(0, 4).map((area, i) => (
                <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Showcase Bento Card */}
        <div className="soft-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center">
                <Award size={18} />
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wider">
                Achievements & Badges ({unlockedAchievements.length})
              </h3>
            </div>
          </div>

          {unlockedAchievements.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-slate-400 font-medium">
                Complete lessons and maintain daily streaks to unlock badges!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {unlockedAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="bento-card p-4 text-center space-y-1.5"
                >
                  <div className="text-3xl">{achievement.icon}</div>
                  <p className="font-black text-xs text-slate-800 dark:text-white">{achievement.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Log Out Action */}
        <div className="pt-2">
          <Button variant="danger" className="w-full font-bold" onClick={handleLogout}>
            Log Out Account
          </Button>
        </div>
      </main>

      {/* 3. RIGHT SIDEBAR */}
      <RightSidebar />
    </div>
  )
}
