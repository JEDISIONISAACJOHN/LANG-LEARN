import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { useProgress } from '../../services/progress'
import { getLanguageById } from '../../data/languages'
import { fetchAssessmentQuestions, generatePersonalizedPlan } from '../../services/dynamicLessonService'
import QuestionCard from '../../components/QuestionCard'
import Button from '../../components/Button'
import ProgressBar from '../../components/ProgressBar'
import ListeningExercise from '../../components/ListeningExercise/ListeningExercise'
import SpeakingExercise from '../../components/SpeakingExercise/SpeakingExercise'
import AudioButton from '../../components/AudioButton'
import LanguageFlag from '../../components/LanguageFlag'
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Clock, Target, Award } from 'lucide-react'

// ── Personalized Plan Screen ─────────────────────────────────────────────────
function PersonalizedPlanScreen({ plan, user, onContinue }) {
  const language = getLanguageById(user?.learningLanguage)
  const levelColors = {
    Beginner:     'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
    Elementary:   'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    Intermediate: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    Advanced:     'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800',
  }
  const levelStyle = levelColors[plan?.startingLevel] || levelColors.Beginner

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="text-5xl mb-2"
        >
          🎯
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
          Your Personalized Path is Ready!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Based on your placement quiz, we crafted a learning roadmap for {language?.name || 'your language'}.
        </p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4.5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Award size={14} /> Starting Level
          </div>
          <span className={`inline-block text-xs font-black px-3 py-1 rounded-full border ${levelStyle}`}>
            {plan?.startingLevel || 'Beginner'}
          </span>
        </div>

        <div className="p-4.5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Sparkles size={14} /> Learning Style
          </div>
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 capitalize">
            {plan?.learningStyle || 'Balanced'}
          </p>
        </div>

        <div className="p-4.5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Target size={14} /> Primary Goal
          </div>
          <p className="text-sm font-extrabold text-slate-800 dark:text-white mt-1 capitalize">
            {plan?.goal || 'Conversation'}
          </p>
        </div>

        <div className="p-4.5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Clock size={14} /> Daily Commitment
          </div>
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {plan?.dailyPractice || '10 min/day'}
          </p>
        </div>
      </div>

      {/* Focus areas */}
      <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
        <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">
          Key Focus Areas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(plan?.focusAreas || []).map((area, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended first lesson */}
      <div className="p-4.5 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/80 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <BookOpen size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Recommended Starting Point
          </p>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">
            {plan?.recommendedFirstLesson || 'Greetings & Salutations'}
          </p>
        </div>
      </div>

      <Button onClick={onContinue} size="large" className="w-full justify-center gap-2">
        <span>Go to Dashboard</span>
        <ArrowRight size={18} />
      </Button>
    </motion.div>
  )
}

// ── Main Assessment component ─────────────────────────────────────────────────
export default function Assessment() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { addXP } = useProgress()

  const [questions, setQuestions]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [loadError, setLoadError]   = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers]       = useState([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showPlan, setShowPlan]     = useState(false)
  const [plan, setPlan]             = useState(null)
  const [generatingPlan, setGeneratingPlan] = useState(false)

  const language = getLanguageById(user?.learningLanguage)

  useEffect(() => {
    if (!user) return

    if (
      user.hasCompletedAssessment ||
      (user.assessmentScore !== null && user.assessmentScore !== undefined) ||
      (user.completedLessons && user.completedLessons.length > 0)
    ) {
      navigate('/dashboard')
      return
    }

    if (!user?.learningLanguage) {
      navigate('/onboarding')
      return
    }

    let cancelled = false
    async function loadQuestions() {
      try {
        setLoading(true)
        const qs = await fetchAssessmentQuestions({
          languageId: user.learningLanguage,
          ageRange: user.ageRange || 'adult',
          goal: user.goal || 'conversation',
          learningStyle: user.learningStyle || 'visual',
          interests: user.interests || 'culture',
          count: 5,
        })
        if (!cancelled) {
          setQuestions(qs || [])
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError('Failed to load questions. Please try again.')
          setLoading(false)
        }
      }
    }

    loadQuestions()
    return () => { cancelled = true }
  }, [user, navigate])

  const handleAnswer = useCallback((answer) => {
    if (showResult || !questions[currentQuestion]) return
    setSelectedAnswer(answer)
    const q = questions[currentQuestion]
    const isCorrect = answer.trim().toLowerCase() === (q.correctAnswer || '').trim().toLowerCase()
    setAnswers((prev) => [...prev, { question: currentQuestion, answer, isCorrect }])
    setShowResult(true)
    if (isCorrect) addXP(q.xp || 10)
  }, [showResult, questions, currentQuestion, addXP])

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setShowResult(false)
      setSelectedAnswer('')
    } else {
      await completeAssessment()
    }
  }

  const completeAssessment = async () => {
    const correctCount = answers.filter((a) => a.isCorrect).length
    const total = questions.length
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0

    let level
    if (percentage <= 30)      level = 'beginner'
    else if (percentage <= 60) level = 'elementary'
    else if (percentage <= 80) level = 'intermediate'
    else                       level = 'advanced'

    await updateUser({ level, assessmentScore: percentage, hasCompletedAssessment: true })

    setGeneratingPlan(true)
    try {
      const generatedPlan = await generatePersonalizedPlan({
        languageId: user.learningLanguage,
        ageRange: user.ageRange || 'adult',
        goal: user.goal || 'conversation',
        learningStyle: user.learningStyle || 'visual',
        interests: user.interests || 'culture',
        level,
        assessmentScore: percentage,
        dailyGoal: user.dailyGoal || 10,
      })
      await updateUser({ learningPlan: generatedPlan })
      setPlan(generatedPlan)
    } catch {
      const fallback = {
        startingLevel: level.charAt(0).toUpperCase() + level.slice(1),
        goal: (user.goal || 'conversation').charAt(0).toUpperCase() + (user.goal || 'conversation').slice(1),
        learningStyle: (user.learningStyle || 'visual').charAt(0).toUpperCase() + (user.learningStyle || 'visual').slice(1),
        dailyPractice: `${user.dailyGoal || 10} min`,
        focusAreas: ['Everyday conversation', 'Essential vocabulary', 'Listening', 'Speaking'],
        recommendedFirstLesson: 'Greetings & Salutations',
      }
      setPlan(fallback)
    } finally {
      setGeneratingPlan(false)
      setShowPlan(true)
    }
  }

  const handlePlanContinue = () => {
    sessionStorage.setItem('langlearn_just_assessed', '1')
    navigate('/dashboard')
  }

  const renderQuestion = () => {
    const q = questions[currentQuestion]
    if (!q) return null

    switch (q.type) {
      case 'multiple-choice':
      case 'fill-blank':
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white mb-4">
              {q.prompt}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(q.options || []).map((option, idx) => {
                const isSelected = selectedAnswer === option
                const isCorrect = option === q.correctAnswer
                let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-indigo-300'

                if (showResult) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                  }
                } else if (isSelected) {
                  btnStyle = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                }

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    className={`p-4 rounded-2xl border-2 text-left transition-all font-semibold text-sm ${btnStyle} ${
                      showResult ? 'cursor-default' : 'cursor-pointer'
                    }`}
                    onClick={() => !showResult && handleAnswer(option)}
                    whileHover={!showResult ? { y: -2 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )

      case 'listening':
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
              {q.prompt || 'Listen to the audio and select what you hear:'}
            </h3>
            <div className="flex justify-center my-4">
              <AudioButton
                text={q.audioText || q.correctAnswer}
                languageCode={language?.voiceCode || 'hi-IN'}
                size="large"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(q.options || []).map((option, idx) => {
                const isSelected = selectedAnswer === option
                const isCorrect = option === q.correctAnswer
                let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-indigo-300'

                if (showResult) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    className={`p-4 rounded-2xl border-2 text-left font-semibold text-sm transition-all ${btnStyle}`}
                    onClick={() => !showResult && handleAnswer(option)}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )

      case 'speaking':
        return (
          <div className="space-y-5 text-center">
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
              {q.prompt || 'Say this word aloud:'}
            </h3>
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1">
                {q.targetWord || q.correctAnswer}
              </p>
              {q.pronunciation && (
                <p className="text-xs text-slate-400">/{q.pronunciation}/</p>
              )}
            </div>
            <div className="flex justify-center">
              <SpeakingExercise
                targetWord={q.targetWord || q.correctAnswer}
                languageId={user?.learningLanguage || 'hi'}
                onSubmit={(answer) => {
                  handleAnswer(answer)
                }}
              />
            </div>
          </div>
        )

      case 'translation':
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white mb-4">
              {q.prompt}
            </h3>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              if (selectedAnswer.trim() && !showResult) handleAnswer(selectedAnswer);
            }}>
              <input 
                type="text" 
                autoFocus
                disabled={showResult}
                className="w-full p-4 text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="Type your answer here..."
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              
              {showResult && (
                <div className={`mt-4 p-4 rounded-xl border-2 font-bold ${
                  selectedAnswer.trim().toLowerCase() === (q.correctAnswer || '').trim().toLowerCase() 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                }`}>
                  {selectedAnswer.trim().toLowerCase() === (q.correctAnswer || '').trim().toLowerCase() 
                    ? '✓ Correct!' 
                    : `✗ Incorrect. Correct answer: ${q.correctAnswer}`}
                </div>
              )}
              
              {!showResult && (
                <button 
                  type="submit" 
                  disabled={!selectedAnswer.trim()} 
                  className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold disabled:opacity-50 transition-opacity"
                >
                  Submit Answer
                </button>
              )}
            </form>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{q.prompt}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(q.options || []).map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => !showResult && handleAnswer(opt)}
                  className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-left font-semibold"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-sm font-semibold text-slate-500">Preparing placement assessment...</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-4xl">⚠️</div>
          <p className="text-rose-500 font-semibold">{loadError}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (generatingPlan) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-sm font-semibold text-slate-500">
            Generating your personalized lesson plan...
          </p>
        </div>
      </div>
    )
  }

  if (showPlan && plan) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="w-full max-w-xl soft-card p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl">
          <PersonalizedPlanScreen plan={plan} user={user} onContinue={handlePlanContinue} />
        </div>
      </div>
    )
  }

  const q = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <LanguageFlag languageId={user?.learningLanguage} size={22} />
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Placement Assessment
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Evaluating your proficiency in {language?.name}</p>
          </div>
          <div className="text-xs font-bold text-slate-400 px-3 py-1 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
            Question {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        <ProgressBar progress={((currentQuestion + 1) / questions.length) * 100} showLabel={false} />

        {/* Question Bento Card */}
        <div className="soft-card p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderQuestion()}
            </motion.div>
          </AnimatePresence>

          {/* Action Row */}
          <div className="flex justify-end pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <Button onClick={handleNext} disabled={!showResult} size="large" className="gap-2">
              <span>{currentQuestion === questions.length - 1 ? 'View Learning Plan' : 'Next Question'}</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
