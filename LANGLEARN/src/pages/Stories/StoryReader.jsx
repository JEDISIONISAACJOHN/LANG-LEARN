import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { useProgress } from '../../services/progress'
import { getStoryById } from '../../data/stories'
import { AudioService } from '../../services/audio/AudioService'
import { ArrowLeft, Volume2, Sparkles, CheckCircle2, XCircle, Trophy, BookOpen } from 'lucide-react'

export default function StoryReader() {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { addXP, addGems } = useProgress()

  const story = getStoryById(storyId)

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [checkpointStatus, setCheckpointStatus] = useState(null) // 'correct' | 'wrong' | null
  const [completed, setCompleted] = useState(false)
  const [showTranslation, setShowTranslation] = useState(true)

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent text-slate-900 dark:text-slate-100">
        <h2 className="text-xl font-bold mb-4">Story not found</h2>
        <button
          onClick={() => navigate('/stories')}
          className="px-6 py-2.5 rounded-full bg-amber-500 text-white font-bold"
        >
          Back to Stories
        </button>
      </div>
    )
  }

  const currentSegment = story.segments[currentStepIndex]
  const isCheckpoint = currentSegment?.isCheckpoint
  const progressPercent = Math.round(((currentStepIndex + 1) / story.segments.length) * 100)

  const playAudio = (text) => {
    if (!text) return
    AudioService.speak(text, story.languageId)
  }

  const handleNext = () => {
    if (currentStepIndex + 1 < story.segments.length) {
      const nextIndex = currentStepIndex + 1
      setCurrentStepIndex(nextIndex)
      setSelectedOption(null)
      setCheckpointStatus(null)

      // Auto play audio for next segment if it has audio text
      const nextSeg = story.segments[nextIndex]
      if (nextSeg && !nextSeg.isCheckpoint && nextSeg.audioText) {
        playAudio(nextSeg.audioText)
      }
    } else {
      handleComplete()
    }
  }

  const handleCheckpointSelect = (opt) => {
    if (checkpointStatus === 'correct') return
    setSelectedOption(opt)

    if (opt === currentSegment.correctAnswer) {
      setCheckpointStatus('correct')
      AudioService.playChime(true)
    } else {
      setCheckpointStatus('wrong')
      AudioService.playChime(false)
    }
  }

  const handleComplete = async () => {
    setCompleted(true)
    addXP(story.rewardXP || 30)
    addGems(story.rewardGems || 15)

    // Save story completion in user profile
    if (user && updateUser) {
      const existing = Array.isArray(user.completedStories) ? user.completedStories : []
      if (!existing.includes(story.id)) {
        await updateUser({ completedStories: [...existing, story.id] })
      }
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/stories')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300 shadow"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
              showTranslation
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
                : 'border-slate-300 dark:border-slate-700 text-slate-500'
            }`}
          >
            {showTranslation ? 'Hide English' : 'Show English'}
          </button>
        </div>
      </header>

      {/* Main Story Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {!completed ? (
          <div className="space-y-6">
            {/* Story Header info */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{story.coverEmoji || '📖'}</div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                {story.title}
              </h2>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                {story.titleEn}
              </p>
            </div>

            {/* Current Dialogue / Checkpoint Card */}
            {isCheckpoint ? (
              /* CHECKPOINT QUESTION CARD */
              <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-400/50 dark:border-amber-500/50 p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/50 mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Story Checkpoint
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6">
                  {currentSegment.question}
                </h3>

                <div className="space-y-3">
                  {currentSegment.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt
                    const isCorrectAnswer = opt === currentSegment.correctAnswer

                    let btnStyles =
                      'w-full text-left p-4 rounded-2xl border-2 font-medium text-sm md:text-base transition-all duration-200 flex items-center justify-between'

                    if (checkpointStatus === 'correct' && isCorrectAnswer) {
                      btnStyles += ' border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 shadow-md'
                    } else if (checkpointStatus === 'wrong' && isSelected) {
                      btnStyles += ' border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                    } else if (isSelected) {
                      btnStyles += ' border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                    } else {
                      btnStyles += ' border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleCheckpointSelect(opt)}
                        className={btnStyles}
                      >
                        <span>{opt}</span>
                        {checkpointStatus === 'correct' && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        )}
                        {checkpointStatus === 'wrong' && isSelected && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {checkpointStatus === 'correct' && (
                  <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    ✓ Correct! {currentSegment.explanation}
                  </div>
                )}
                {checkpointStatus === 'wrong' && (
                  <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-semibold">
                    ✗ Try again! Select the right answer to proceed.
                  </div>
                )}
              </div>
            ) : (
              /* REGULAR NARRATIVE/DIALOGUE CARD */
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {currentSegment.speaker ? (
                      <>
                        <span className="text-3xl p-2 rounded-2xl bg-amber-50 dark:bg-amber-950/50 shadow-inner">
                          {currentSegment.avatar || '👤'}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                            {currentSegment.speaker}
                          </h4>
                          <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Speaker</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-full">
                        <BookOpen className="w-4 h-4" /> Story Narrative
                      </div>
                    )}
                  </div>

                  {currentSegment.audioText && (
                    <button
                      onClick={() => playAudio(currentSegment.audioText)}
                      className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
                      title="Play pronunciation audio"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Main Native Dialogue/Narrative */}
                <div className="my-6 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 shadow-inner">
                  <p className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.4] tracking-tight">
                    {currentSegment.text}
                  </p>
                  {currentSegment.pronunciation && (
                    <p className="text-sm md:text-base font-bold text-amber-600 dark:text-amber-400 mt-4 italic tracking-wide">
                      "{currentSegment.pronunciation}"
                    </p>
                  )}
                </div>

                {/* English translation */}
                {showTranslation && currentSegment.translation && (
                  <div className="mt-4 p-5 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-300">
                      {currentSegment.translation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-end pt-4">
              {isCheckpoint ? (
                <button
                  disabled={checkpointStatus !== 'correct'}
                  onClick={handleNext}
                  className={`px-8 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg transition-all ${
                    checkpointStatus === 'correct'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/25 hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-full font-bold text-sm md:text-base bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {currentStepIndex + 1 === story.segments.length ? 'Finish Story 🏆' : 'Next Dialogue →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* COMPLETION CELEBRATION CARD */
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-5xl shadow-xl shadow-amber-500/30 mb-6">
              🎉
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
              Story Complete!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-8">
              You finished <span className="font-bold text-amber-600 dark:text-amber-400">"{story.title}"</span>. Great job!
            </p>

            {/* Rewards */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 min-w-[120px]">
                <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 font-black text-xl">
                  <Trophy className="w-5 h-5" /> +{story.rewardXP}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">XP Earned</div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/60 min-w-[120px]">
                <div className="flex items-center justify-center gap-1 text-cyan-600 dark:text-cyan-400 font-black text-xl">
                  💎 +{story.rewardGems}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">Gems Earned</div>
              </div>
            </div>

            <button
              onClick={() => navigate('/stories')}
              className="w-full max-w-sm mx-auto py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              Continue to Stories
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
