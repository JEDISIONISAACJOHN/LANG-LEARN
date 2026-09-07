import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { languages } from '../../data/languages'
import LanguageCard from '../../components/LanguageCard'
import Button from '../../components/Button'
import BharatMascot from '../../components/Mascot/BharatMascot'
import LangLearnLogo from '../../components/Logo/LangLearnLogo'
import { Sparkles, ArrowRight, Check } from 'lucide-react'

const STEPS = {
  AGE:                0,
  PREFERRED_LANGUAGE: 1,
  TARGET_LANGUAGE:    2,
  GOAL:               3,
  DAILY_GOAL:         4,
}

const AGE_RANGES = [
  { id: 'child',       label: 'Under 13',  icon: '🌱', desc: 'Simple words & playful lessons' },
  { id: 'teen',        label: '13–17',      icon: '🎮', desc: 'Casual, engaging exercises' },
  { id: 'young-adult', label: '18–25',      icon: '💬', desc: 'Conversational & practical' },
  { id: 'adult',       label: '26–49',      icon: '💼', desc: 'Goal-focused, efficient' },
  { id: 'senior',      label: '50+',        icon: '🌸', desc: 'Clear pace, comfortable layout' },
]

const GOALS = [
  { id: 'travel',       name: 'Travel & Trips',       icon: '✈️', desc: 'Ask directions, order food & explore' },
  { id: 'conversation', name: 'Daily Conversations',  icon: '💬', desc: 'Chat naturally with friends & locals' },
  { id: 'work',         name: 'Career & Work',         icon: '💼', desc: 'Professional Indian communication' },
  { id: 'study',        name: 'Academics & Study',     icon: '📚', desc: 'Grammar, reading & script mastery' },
  { id: 'family',       name: 'Family & Heritage',     icon: '👨‍👩‍👧‍👦', desc: 'Connect with relatives & culture' },
  { id: 'culture',      name: 'Cinema & Literature',   icon: '🎭', desc: 'Enjoy songs, movies & books' },
]

const DAILY_GOALS = [
  { id: 5,  name: '5 minutes',  tag: 'Casual',   desc: 'Bite-sized daily habit' },
  { id: 10, name: '10 minutes', tag: 'Regular',  desc: 'Steady, continuous progress' },
  { id: 15, name: '15 minutes', tag: 'Serious',  desc: 'Recommended for rapid fluency' },
  { id: 20, name: '20 minutes', tag: 'Intense',  desc: 'Immersion & deep practice' },
]

const TOTAL_STEPS = Object.keys(STEPS).length

export default function Onboarding() {
  const navigate = useNavigate()
  const { updateUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(STEPS.AGE)
  const [selectedAge, setSelectedAge]                             = useState('')
  const [selectedPreferredLang, setSelectedPreferredLang]         = useState('en')
  const [selectedTargetLang, setSelectedTargetLang]               = useState('')
  const [selectedGoal, setSelectedGoal]                           = useState('')
  const [selectedDailyGoal, setSelectedDailyGoal]                 = useState(10)

  const handleNext = () => {
    if (currentStep < STEPS.DAILY_GOAL) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > STEPS.AGE) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async () => {
    await updateUser({
      ageRange: selectedAge,
      preferredLanguage: selectedPreferredLang,
      learningLanguage: selectedTargetLang,
      goal: selectedGoal,
      dailyGoal: selectedDailyGoal,
    })
    navigate('/assessment')
  }

  const isStepValid = () => {
    switch (currentStep) {
      case STEPS.AGE:                return !!selectedAge
      case STEPS.PREFERRED_LANGUAGE: return !!selectedPreferredLang
      case STEPS.TARGET_LANGUAGE:    return !!selectedTargetLang && selectedTargetLang !== selectedPreferredLang
      case STEPS.GOAL:               return !!selectedGoal
      case STEPS.DAILY_GOAL:         return !!selectedDailyGoal
      default:                       return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.AGE:
        return (
          <motion.div
            key="age"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                <Sparkles size={13} /> Step 1: Personalization
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                How old are you?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We tailor vocabulary, tone, and pacing specifically for your age group.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {AGE_RANGES.map((range) => {
                const isSelected = selectedAge === range.id
                return (
                  <motion.div
                    key={range.id}
                    onClick={() => setSelectedAge(range.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-md shadow-indigo-100 dark:shadow-none'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm">
                        {range.icon}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800 dark:text-white text-base leading-tight">
                          {range.label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {range.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case STEPS.PREFERRED_LANGUAGE:
        return (
          <motion.div
            key="preferred-language"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                <Sparkles size={13} /> Step 2: Interface Language
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                What's your preferred language?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We'll show translations, hints, and instructions in this language.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
              {languages.map((lang) => (
                <LanguageCard
                  key={lang.id}
                  language={lang}
                  selected={selectedPreferredLang === lang.id}
                  onClick={() => setSelectedPreferredLang(lang.id)}
                />
              ))}
            </div>
          </motion.div>
        )

      case STEPS.TARGET_LANGUAGE:
        return (
          <motion.div
            key="target-language"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                <Sparkles size={13} /> Step 3: Target Language
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                What do you want to learn?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Choose the Indian language you want to speak. You can add more later anytime!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
              {languages
                .filter((lang) => lang.id !== selectedPreferredLang)
                .map((lang) => (
                  <LanguageCard
                    key={lang.id}
                    language={lang}
                    selected={selectedTargetLang === lang.id}
                    onClick={() => setSelectedTargetLang(lang.id)}
                  />
                ))}
            </div>
          </motion.div>
        )

      case STEPS.GOAL:
        return (
          <motion.div
            key="goal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                <Sparkles size={13} /> Step 4: Motivation
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                Why are you learning?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We'll prioritize the topics and situations that matter most to you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {GOALS.map((goal) => {
                const isSelected = selectedGoal === goal.id
                return (
                  <motion.div
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-md shadow-indigo-100 dark:shadow-none'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm">
                        {goal.icon}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800 dark:text-white text-base leading-tight">
                          {goal.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {goal.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case STEPS.DAILY_GOAL:
        return (
          <motion.div
            key="daily-goal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                <Sparkles size={13} /> Step 5: Daily Commitment
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                How much time can you spend daily?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Consistency is key. Even 5 minutes a day builds lasting memory!
              </p>
            </div>

            <div className="space-y-3">
              {DAILY_GOALS.map((goal) => {
                const isSelected = selectedDailyGoal === goal.id
                return (
                  <motion.div
                    key={goal.id}
                    onClick={() => setSelectedDailyGoal(goal.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                      p-4.5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-md shadow-indigo-100 dark:shadow-none'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                      }
                    `}
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <p className="font-extrabold text-slate-800 dark:text-white text-base">
                          {goal.name}
                        </p>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] uppercase">
                          {goal.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {goal.desc}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-2xl space-y-6">
        {/* Top Header & Friendly Mascot Pill */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BharatMascot size={46} mood="waving" />
            <div>
              <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                LANGLEARN SETUP
              </span>
              <p className="text-xs text-slate-400">Step {currentStep + 1} of {TOTAL_STEPS}</p>
            </div>
          </div>

          {/* Smooth Step Indicator Pills */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <motion.div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'w-7 h-2 bg-indigo-600'
                    : i < currentStep
                    ? 'w-3 h-2 bg-indigo-300 dark:bg-indigo-800'
                    : 'w-2 h-2 bg-slate-200 dark:bg-slate-800'
                }`}
                layout
              />
            ))}
          </div>
        </div>

        {/* Bento Main Card */}
        <div className="soft-card p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-3xl">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800/80 mt-8">
            {currentStep > STEPS.AGE ? (
              <Button variant="ghost" onClick={handleBack}>
                ← Back
              </Button>
            ) : (
              <div />
            )}

            <Button
              variant="primary"
              size="large"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="gap-2"
            >
              <span>{currentStep === STEPS.DAILY_GOAL ? 'Start Assessment' : 'Continue'}</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
