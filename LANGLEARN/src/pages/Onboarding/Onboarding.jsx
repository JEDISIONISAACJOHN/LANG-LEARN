import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { useAppSound } from '../../services/sound'
import { languages } from '../../data/languages'
import LanguageCard from '../../components/LanguageCard'
import Button from '../../components/Button'
import BharatMascot from '../../components/Mascot/BharatMascot'
import { Sparkles, ArrowRight, Check } from 'lucide-react'

const STEPS = {
  AGE:                0,
  PREFERRED_LANGUAGE: 1,
  TARGET_LANGUAGE:    2,
  GOAL:               3,
  LEARNING_STYLE:     4,
  INTERESTS:          5,
  DAILY_GOAL:         6,
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

const LEARNING_STYLES = [
  { id: 'visual', name: 'Visual', icon: '👀', desc: 'Reading, pictures, and translation' },
  { id: 'auditory', name: 'Auditory', icon: '🎧', desc: 'Listening and repeating sounds' },
  { id: 'kinesthetic', name: 'Kinesthetic', icon: '👋', desc: 'Interactive speaking & matching' },
]

const INTERESTS = [
  { id: 'tech', name: 'Tech & Science', icon: '💻', desc: 'Gadgets, coding, discovery' },
  { id: 'arts', name: 'Arts & Music', icon: '🎨', desc: 'Songs, paintings, theatre' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', desc: 'Games, health, exercise' },
  { id: 'food', name: 'Food & Cooking', icon: '🍳', desc: 'Recipes, restaurants, flavors' },
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
  const { playClick, playSuccess } = useAppSound()
  const [currentStep, setCurrentStep] = useState(STEPS.AGE)
  const [selectedAge, setSelectedAge]                             = useState('')
  const [selectedPreferredLang, setSelectedPreferredLang]         = useState('en')
  const [selectedTargetLang, setSelectedTargetLang]               = useState('')
  const [selectedGoal, setSelectedGoal]                           = useState('')
  const [selectedLearningStyle, setSelectedLearningStyle]         = useState('')
  const [selectedInterest, setSelectedInterest]                   = useState('')
  const [selectedDailyGoal, setSelectedDailyGoal]                 = useState(10)

  const handleNext = () => {
    playClick()
    if (currentStep < STEPS.DAILY_GOAL) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    playClick()
    if (currentStep > STEPS.AGE) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelection = (setter, value) => {
    playClick()
    setter(value)
  }

  const completeOnboarding = async () => {
    await updateUser({
      ageRange: selectedAge,
      preferredLanguage: selectedPreferredLang,
      learningLanguage: selectedTargetLang,
      goal: selectedGoal,
      learningStyle: selectedLearningStyle,
      interests: selectedInterest,
      dailyGoal: selectedDailyGoal,
    })
    playSuccess()
    navigate('/assessment')
  }

  const isStepValid = () => {
    switch (currentStep) {
      case STEPS.AGE:                return !!selectedAge
      case STEPS.PREFERRED_LANGUAGE: return !!selectedPreferredLang
      case STEPS.TARGET_LANGUAGE:    return !!selectedTargetLang && selectedTargetLang !== selectedPreferredLang
      case STEPS.GOAL:               return !!selectedGoal
      case STEPS.LEARNING_STYLE:     return !!selectedLearningStyle
      case STEPS.INTERESTS:          return !!selectedInterest
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 1: Personalization
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                How old are you?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                We tailor vocabulary, tone, and pacing specifically for your age group.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AGE_RANGES.map((range) => {
                const isSelected = selectedAge === range.id
                return (
                  <motion.div
                    key={range.id}
                    onClick={() => handleSelection(setSelectedAge, range.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border-subtle bg-surface hover:bg-surface-hover hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-border-subtle flex items-center justify-center text-3xl shadow-sm">
                        {range.icon}
                      </div>
                      <div>
                        <p className="font-extrabold text-text-primary text-lg leading-tight mb-1">
                          {range.label}
                        </p>
                        <p className="text-sm text-text-secondary font-medium">
                          {range.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check size={16} strokeWidth={3} />
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 2: Interface Language
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                What's your preferred language?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                We'll show translations, hints, and instructions in this language.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <LanguageCard
                  key={lang.id}
                  language={lang}
                  selected={selectedPreferredLang === lang.id}
                  onClick={() => handleSelection(setSelectedPreferredLang, lang.id)}
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 3: Target Language
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                What do you want to learn?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                Choose the Indian language you want to speak. You can add more later!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages
                .filter((lang) => lang.id !== selectedPreferredLang)
                .map((lang) => (
                  <LanguageCard
                    key={lang.id}
                    language={lang}
                    selected={selectedTargetLang === lang.id}
                    onClick={() => handleSelection(setSelectedTargetLang, lang.id)}
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 4: Motivation
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                Why are you learning?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                We'll prioritize the topics and situations that matter most to you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOALS.map((goal) => {
                const isSelected = selectedGoal === goal.id
                return (
                  <motion.div
                    key={goal.id}
                    onClick={() => handleSelection(setSelectedGoal, goal.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border-subtle bg-surface hover:bg-surface-hover hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-border-subtle flex items-center justify-center text-3xl shadow-sm">
                        {goal.icon}
                      </div>
                      <div>
                        <p className="font-extrabold text-text-primary text-lg leading-tight mb-1">
                          {goal.name}
                        </p>
                        <p className="text-sm text-text-secondary font-medium">
                          {goal.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case STEPS.LEARNING_STYLE:
        return (
          <motion.div
            key="learning-style"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 5: Learning Style
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                How do you learn best?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                We'll adapt the lesson exercises to your natural learning style.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LEARNING_STYLES.map((style) => {
                const isSelected = selectedLearningStyle === style.id
                return (
                  <motion.div
                    key={style.id}
                    onClick={() => handleSelection(setSelectedLearningStyle, style.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center
                      ${isSelected
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border-subtle bg-surface hover:bg-surface-hover hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-border-subtle flex items-center justify-center text-3xl shadow-sm mb-3 relative">
                      {style.icon}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <p className="font-extrabold text-text-primary text-lg leading-tight mb-1">
                      {style.name}
                    </p>
                    <p className="text-xs text-text-secondary font-medium">
                      {style.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case STEPS.INTERESTS:
        return (
          <motion.div
            key="interests"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 6: Interests
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                What are you interested in?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                We'll weave vocabulary related to your hobbies into your daily lessons.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INTERESTS.map((interest) => {
                const isSelected = selectedInterest === interest.id
                return (
                  <motion.div
                    key={interest.id}
                    onClick={() => handleSelection(setSelectedInterest, interest.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border-subtle bg-surface hover:bg-surface-hover hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-border-subtle flex items-center justify-center text-3xl shadow-sm">
                        {interest.icon}
                      </div>
                      <div>
                        <p className="font-extrabold text-text-primary text-lg leading-tight mb-1">
                          {interest.name}
                        </p>
                        <p className="text-sm text-text-secondary font-medium">
                          {interest.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check size={16} strokeWidth={3} />
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                <Sparkles size={13} /> Step 7: Daily Commitment
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                How much time can you spend daily?
              </h2>
              <p className="text-base text-text-secondary font-medium">
                Consistency is key. Even 5 minutes a day builds lasting memory!
              </p>
            </div>

            <div className="space-y-4">
              {DAILY_GOALS.map((goal) => {
                const isSelected = selectedDailyGoal === goal.id
                return (
                  <motion.div
                    key={goal.id}
                    onClick={() => handleSelection(setSelectedDailyGoal, goal.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                      p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border-subtle bg-surface hover:bg-surface-hover hover:border-primary/50'
                      }
                    `}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-extrabold text-text-primary text-xl">
                          {goal.name}
                        </p>
                        <span className={`px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider ${
                          isSelected ? 'bg-primary text-white' : 'bg-surface-hover text-text-secondary border border-border-subtle'
                        }`}>
                          {goal.tag}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary font-medium">
                        {goal.desc}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check size={16} strokeWidth={3} />
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden relative">
      {/* Background decorations */}
      <div className="fixed top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-3xl space-y-8 relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-surface rounded-full border border-border-subtle flex items-center justify-center shadow-lg">
              <BharatMascot size={46} mood="waving" />
            </div>
            <div>
              <span className="text-sm font-black tracking-widest text-primary uppercase drop-shadow-sm">
                Setup Profile
              </span>
              <p className="text-sm text-text-secondary font-bold">Step {currentStep + 1} of {TOTAL_STEPS}</p>
            </div>
          </div>

          {/* Smooth Step Indicator Pills */}
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <motion.div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  i === currentStep
                    ? 'w-10 h-3 bg-primary shadow-glow'
                    : i < currentStep
                    ? 'w-4 h-3 bg-primary/40'
                    : 'w-3 h-3 bg-surface border border-border-subtle'
                }`}
                layout
              />
            ))}
          </div>
        </div>

        {/* Bento Main Card */}
        <div className="p-6 sm:p-8 md:p-12 bg-surface/80 backdrop-blur-xl border-2 border-border-subtle shadow-2xl rounded-[2.5rem] relative overflow-hidden">
          {/* Inner highlight */}
          <div className="absolute inset-0 border-t border-white/5 pointer-events-none rounded-[2.5rem]"></div>
          
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-10 mt-10 border-t-2 border-border-subtle">
            {currentStep > STEPS.AGE ? (
              <button 
                onClick={handleBack}
                className="py-3 px-6 rounded-2xl font-black text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="py-4 px-8 bg-primary hover:bg-accent-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-glow transition-all active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-primary disabled:active:scale-100 disabled:shadow-none"
            >
              <span>{currentStep === STEPS.DAILY_GOAL ? 'Start Journey' : 'Continue'}</span>
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
