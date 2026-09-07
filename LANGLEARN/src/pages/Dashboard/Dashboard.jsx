import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { useProgress } from '../../services/progress'
import { useTheme } from '../../services/themeContext'
import { getLessonsForLanguage } from '../../data/lessons'
import { fetchDynamicLessons } from '../../services/dynamicLessonService'
import { getLanguageById } from '../../data/languages'
import AppSidebar from '../../components/Navigation/AppSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import AlphabetModal from '../../components/AlphabetModal/AlphabetModal'
import LanguageFlag from '../../components/LanguageFlag'
import { audioFX } from '../../utils/audioFX'
import { triggerConfetti } from '../../utils/confetti'
import { BookA, Gift, Lock, CheckCircle2, Sparkles, Target, BookOpen, Bot, Play, LayoutGrid } from 'lucide-react'

// Animation Variants for Bento Grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addXP } = useProgress()
  const { t } = useTheme()
  const [lessons, setLessons] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [showAlphabetModal, setShowAlphabetModal] = useState(false)
  
  const [openedChests, setOpenedChests] = useState(() => {
    try {
      const stored = localStorage.getItem('langlearn_opened_chests')
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    if (!user?.learningLanguage || !user?.goal) {
      navigate('/onboarding')
      return
    }

    async function loadLessons() {
      const preferredLang = user.preferredLanguage || 'en'

      let languageLessons = []
      try {
        languageLessons = await fetchDynamicLessons({
          languageId: user.learningLanguage,
          goal: user.goal,
          ageRange: user.ageRange || 'adult',
          level: user.level || 'beginner',
          count: 15,
        })
      } catch {
        languageLessons = getLessonsForLanguage(user.learningLanguage, preferredLang)
      }

      if (!languageLessons || languageLessons.length === 0) {
        languageLessons = getLessonsForLanguage(user.learningLanguage, preferredLang)
      }

      setLessons(languageLessons)

      const completedIds = Array.isArray(user.completedLessons) ? user.completedLessons : []
      const nextIncomplete = languageLessons.find((lesson) => !completedIds.includes(lesson.id))
      setCurrentLesson(nextIncomplete || languageLessons[languageLessons.length - 1])
    }

    loadLessons()
  }, [user, navigate])

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`)
  }

  const handleOpenChest = (unitId, xpReward = 50) => {
    if (openedChests.includes(unitId)) return
    audioFX.playChestOpen()
    triggerConfetti()
    addXP(xpReward)

    const updated = [...openedChests, unitId]
    setOpenedChests(updated)
    localStorage.setItem('langlearn_opened_chests', JSON.stringify(updated))
  }

  const learningLang = getLanguageById(user?.learningLanguage)
  const preferredLang = getLanguageById(user?.preferredLanguage || 'en')

  if (!user || !learningLang) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--text-light)]">Loading...</p>
      </div>
    )
  }

  const completedCount = (user.completedLessons || []).length
  const totalLessons = Math.max(1, lessons.length)
  const progressPercent = Math.min(Math.round((completedCount / totalLessons) * 100), 100)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center pb-20 md:pb-0 font-sans">
      <AppSidebar />

      <main className="flex-1 max-w-[800px] md:ml-64 px-4 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              {t('welcome_back')}, {user.name?.split(' ')[0] || 'Learner'} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {t('ready_to_master')} <span className="font-semibold text-indigo-600 dark:text-indigo-400">{learningLang.name}</span> {t('today')}
            </p>
          </div>
          <div className="drop-shadow-sm">
            <LanguageFlag languageId={user?.learningLanguage} size={48} />
          </div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          
          {/* Main Action Block - Spans 8 cols */}
          <motion.div variants={itemVariants} className="md:col-span-8">
            <div className="soft-card h-full p-8 bg-gradient-to-br from-indigo-500 to-violet-600 text-white relative overflow-hidden group cursor-pointer" onClick={() => currentLesson && handleLessonClick(currentLesson.id)}>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-4">
                    <Sparkles size={14} /> {t('next_up')}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {currentLesson?.title || t('daily_practice')}
                  </h2>
                  <p className="text-indigo-100 max-w-sm">
                    {currentLesson?.description || t('continue_learning')}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {/* Simulated users also learning */}
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-indigo-500"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-indigo-500"></div>
                    <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-indigo-500"></div>
                  </div>
                  <button className="bg-white text-brand-primary hover:bg-slate-50 px-8 py-3.5 rounded-3xl font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_6px_0_rgba(255,255,255,0.5)] active:shadow-none active:translate-y-[6px] transition-all">
                    <Play size={20} fill="currentColor" /> {t('start')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Block - Spans 4 cols */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <div className="soft-card h-full p-6 bg-white dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Target size={16} /> {t('course_progress')}
                </h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-slate-800 dark:text-white">{progressPercent}%</span>
                </div>
                <p className="text-sm text-slate-500">{completedCount} {t('of')} {totalLessons} {t('lessons_completed')}</p>
              </div>
              
              <div className="mt-6">
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small Feature Blocks */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <div 
              onClick={() => navigate('/stories')}
              className="soft-card p-6 bg-white dark:bg-slate-900 cursor-pointer group hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">{t('stories')}</h3>
              <p className="text-xs text-slate-500">{t('read_listen')}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-4">
            <div 
              onClick={() => navigate('/tutor')}
              className="soft-card p-6 bg-white dark:bg-slate-900 cursor-pointer group hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot size={24} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">{t('tutor')}</h3>
              <p className="text-xs text-slate-500">{t('practice_conv')}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-4">
            <div 
              onClick={() => setShowAlphabetModal(true)}
              className="soft-card p-6 bg-white dark:bg-slate-900 cursor-pointer group hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookA size={24} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">{t('letters')}</h3>
              <p className="text-xs text-slate-500">{t('learn_script')}</p>
            </div>
          </motion.div>

          {/* All Lessons List (Bento style row) */}
          <motion.div variants={itemVariants} className="md:col-span-12 mt-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <LayoutGrid size={20} className="text-indigo-500" /> {t('syllabus')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {lessons.slice(0, 9).map((lesson, idx) => {
                const isCompleted = (user.completedLessons || []).includes(lesson.id)
                const isLocked = !isCompleted && currentLesson?.id !== lesson.id
                
                return (
                  <div 
                    key={lesson.id}
                    onClick={() => !isLocked && handleLessonClick(lesson.id)}
                    className={`p-4 rounded-2xl border ${
                      isCompleted ? 'bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800' : 
                      isLocked ? 'bg-slate-50 border-slate-100 opacity-60 dark:bg-slate-900 dark:border-slate-800' : 
                      'bg-white border-indigo-200 shadow-sm dark:bg-slate-800 dark:border-indigo-700 cursor-pointer hover:border-indigo-400'
                    } flex items-center gap-4 transition-all`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted ? 'bg-indigo-100 text-indigo-600' :
                      isLocked ? 'bg-slate-200 text-slate-400' :
                      'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={18} /> : isLocked ? <Lock size={18} /> : <span className="font-bold">{idx + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm truncate ${isLocked ? 'text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{lesson.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </main>

      <RightSidebar />

      <AlphabetModal
        languageId={user.learningLanguage}
        languageName={learningLang.name}
        isOpen={showAlphabetModal}
        onClose={() => setShowAlphabetModal(false)}
      />
    </div>
  )
}
