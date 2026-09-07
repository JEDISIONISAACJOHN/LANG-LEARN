/**
 * SpeakingExercise — Complete speaking practice with real speech recognition
 *
 * Recording lifecycle: idle → requesting → recording → processing → result
 *
 * Features:
 * - Real browser SpeechRecognition API
 * - Animated waveform during recording
 * - Recording timer (max 15s)
 * - Speaking score with feedback
 * - Graceful fallback if ASR unavailable
 * - Microphone permission handling
 * - ASR failure ≠ wrong answer
 * - User can skip without penalty
 * - Microphone released after recording
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AudioButton from '../AudioButton/AudioButton'
import { speechRecognitionService, REC_STATE, calculateSpeakingScore } from '../../services/audio/SpeechRecognitionService'
import { ttsService } from '../../services/audio/AudioService'
import Button from '../Button'

const MAX_RECORDING_SECONDS = 15

// ── Animated microphone waveform ──────────────────────────────────────────────
function MicWaveform({ active }) {
  const bars = [2, 5, 8, 11, 8, 5, 2, 7, 4, 9]
  return (
    <div className="flex items-end justify-center gap-[3px] h-8" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[4px] bg-[#D84B42] rounded-full"
          animate={
            active
              ? { height: [`${h * 2}px`, `${Math.min(h * 2 + 10, 28)}px`, `${h * 2}px`] }
              : { height: '4px' }
          }
          transition={
            active
              ? { repeat: Infinity, duration: 0.3 + (i % 3) * 0.12, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  )
}

// ── Score display with Word-Level Phonetic Analysis ───────────────────────────
function ScoreDisplay({ score, grade, transcript, targetText, wordResults = [], wordsToImprove = [], feedbackMessage }) {
  const gradeColor = {
    'Excellent':       'text-emerald-600 dark:text-emerald-400',
    'Great':           'text-indigo-600 dark:text-indigo-400',
    'Keep practicing': 'text-amber-500 dark:text-amber-400',
    'Try again':       'text-rose-600 dark:text-rose-400',
  }[grade] || 'text-slate-500'

  const bgColor = {
    'Excellent':       'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800',
    'Great':           'bg-indigo-50/80 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800',
    'Keep practicing': 'bg-amber-50/80 border-amber-300 dark:bg-amber-950/40 dark:border-amber-800',
    'Try again':       'bg-rose-50/80 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800',
  }[grade] || 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-5 rounded-2xl border-2 max-w-md mx-auto space-y-3 ${bgColor}`}
    >
      <div className="text-center">
        <div className={`text-4xl font-black ${gradeColor}`}>{score}%</div>
        <div className={`text-sm font-black tracking-wide uppercase mt-0.5 ${gradeColor}`}>
          {grade} — {feedbackMessage || 'Pronunciation Assessment'}
        </div>
      </div>

      {/* Word-by-Word Granular Evaluation */}
      {wordResults && wordResults.length > 0 && (
        <div className="pt-2 border-t border-current/20">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 text-left">
            Word-by-Word Analysis:
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {wordResults.map((item, idx) => {
              const badgeClass =
                item.matchStatus === 'exact'
                  ? 'bg-emerald-600 text-white'
                  : item.matchStatus === 'close'
                  ? 'bg-amber-500 text-white'
                  : 'bg-rose-600 text-white'
              return (
                <span
                  key={idx}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm ${badgeClass}`}
                  title={`Spoken: "${item.spokenWord}" (${Math.round(item.similarity * 100)}%)`}
                >
                  {item.targetWord}
                  <span className="text-[10px] opacity-80">
                    {item.matchStatus === 'exact' ? '✓' : item.matchStatus === 'close' ? '≈' : '✗'}
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Words to improve alert */}
      {wordsToImprove && wordsToImprove.length > 0 && (
        <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-current/20 text-xs text-left">
          <span className="font-bold text-rose-600 dark:text-rose-400">Focus on these words: </span>
          <span className="font-semibold text-slate-800 dark:text-white">
            {wordsToImprove.map((w) => `"${w}"`).join(', ')}
          </span>
        </div>
      )}

      <div className="space-y-1 pt-1 text-xs text-left text-slate-500 dark:text-slate-400">
        <p>
          <span className="font-semibold">Heard:</span>{' '}
          <span className="text-slate-800 dark:text-white font-medium">{transcript || '—'}</span>
        </p>
        <p>
          <span className="font-semibold">Target:</span>{' '}
          <span className="text-slate-800 dark:text-white font-medium">{targetText}</span>
        </p>
      </div>
    </motion.div>
  )
}

// ── Fallback when ASR is unavailable ─────────────────────────────────────────
function AsrFallback({ targetText, languageId, onSkip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-4 space-y-4"
    >
      <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-md mx-auto">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
          Speaking practice isn't available on this device right now.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          You can still practice pronunciation:
        </p>
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">{targetText}</div>
        <AudioButton
          text={targetText}
          languageId={languageId}
          label="🔊 Listen"
          className="mx-auto"
        />
      </div>
      <Button variant="ghost" onClick={onSkip}>
        Continue without speaking
      </Button>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SpeakingExercise({
  prompt,
  targetWord,
  pronunciation,
  languageId = 'hi',
  onSubmit,
  disabled = false,
  showResult = false,
}) {
  const [recState, setRecState]     = useState(REC_STATE.IDLE)
  const [result, setResult]         = useState(null)
  const [errorMsg, setErrorMsg]     = useState(null)
  const [isTechError, setIsTechError] = useState(false)
  const [elapsed, setElapsed]       = useState(0)
  const timerRef  = useRef(null)
  const mountedRef = useRef(true)

  const asrSupported = speechRecognitionService.isSupported()

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      speechRecognitionService.destroy()
      ttsService.stop()
      clearInterval(timerRef.current)
    }
  }, [])

  // Reset when exercise changes
  useEffect(() => {
    setRecState(REC_STATE.IDLE)
    setResult(null)
    setErrorMsg(null)
    setIsTechError(false)
    setElapsed(0)
    clearInterval(timerRef.current)
    speechRecognitionService.stop()
  }, [targetWord, languageId])

  // Timer while recording
  useEffect(() => {
    if (recState === REC_STATE.RECORDING) {
      setElapsed(0)
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= MAX_RECORDING_SECONDS - 1) {
            // Auto-stop
            speechRecognitionService.stop()
            clearInterval(timerRef.current)
            return MAX_RECORDING_SECONDS
          }
          return prev + 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [recState])

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // ── Start recording ─────────────────────────────────────────────────────────
  const handleRecord = useCallback(() => {
    if (disabled || showResult) return
    if (recState === REC_STATE.RECORDING) {
      speechRecognitionService.stop()
      return
    }

    setResult(null)
    setErrorMsg(null)
    setIsTechError(false)

    speechRecognitionService.start(languageId, targetWord, {
      onStateChange: (s) => {
        if (mountedRef.current) setRecState(s)
      },
      onResult: (res) => {
        if (!mountedRef.current) return
        setResult(res)
        setRecState(REC_STATE.RESULT)
        clearInterval(timerRef.current)
      },
      onError: ({ message, isTechnicalFailure }) => {
        if (!mountedRef.current) return
        setErrorMsg(message)
        setIsTechError(!!isTechnicalFailure)
        setRecState(REC_STATE.ERROR)
        clearInterval(timerRef.current)
      },
    })
  }, [disabled, showResult, recState, languageId, targetWord])

  // ── Check pronunciation ─────────────────────────────────────────────────────
  const handleCheck = useCallback(() => {
    if (!result) return
    // Pass targetWord as "correct" if match, otherwise the transcript
    // Lesson engine uses this to determine isCorrect
    onSubmit(result.isMatch ? targetWord : result.transcript)
  }, [result, targetWord, onSubmit])

  // ── Skip speaking ────────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    // Skip does NOT penalize: pass targetWord so it's treated as correct
    // (ASR unavailable/failure should not remove hearts)
    onSubmit(targetWord)
  }, [targetWord, onSubmit])

  // ── Retry after error ────────────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setRecState(REC_STATE.IDLE)
    setResult(null)
    setErrorMsg(null)
    setIsTechError(false)
    setElapsed(0)
  }, [])

  // ── Mic button appearance ────────────────────────────────────────────────────
  const micBtnStyle = () => {
    switch (recState) {
      case REC_STATE.REQUESTING:  return 'bg-amber-400 cursor-wait'
      case REC_STATE.RECORDING:   return 'bg-rose-500 ring-8 ring-rose-500/30 shadow-lg shadow-rose-500/50'
      case REC_STATE.PROCESSING:  return 'bg-blue-500 cursor-wait'
      case REC_STATE.RESULT:      return 'bg-emerald-500'
      case REC_STATE.ERROR:       return 'bg-slate-400'
      default:                    return 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/30 hover:scale-105'
    }
  }

  const micLabel = () => {
    switch (recState) {
      case REC_STATE.REQUESTING:  return 'Allow microphone...'
      case REC_STATE.RECORDING:   return 'Listening...'
      case REC_STATE.PROCESSING:  return 'Checking...'
      case REC_STATE.RESULT:      return result?.isMatch ? '✓ Recording captured' : '✗ Try again'
      case REC_STATE.ERROR:       return 'Error'
      default:                    return 'Tap to speak'
    }
  }

  // ── ASR not supported fallback ───────────────────────────────────────────────
  if (!asrSupported && !showResult) {
    return (
      <div className="space-y-4 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{prompt}</h3>

        <div className="inline-flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 min-w-[280px]">
          <span className="text-3xl md:text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{targetWord}</span>
          {pronunciation && <span className="text-sm text-slate-400 mb-3">({pronunciation})</span>}
          <AudioButton text={targetWord} languageId={languageId} label="Listen" />
        </div>

        <AsrFallback targetText={targetWord} languageId={languageId} onSkip={handleSkip} />
      </div>
    )
  }

  return (
    <div className="space-y-5 text-center">
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{prompt}</h3>

      {/* Target word card */}
      <div className="inline-flex flex-col items-center p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 min-w-[260px]">
        <span className="text-3xl md:text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{targetWord}</span>
        {pronunciation && (
          <span className="text-sm text-slate-400 mb-3">({pronunciation})</span>
        )}
        <AudioButton
          text={targetWord}
          languageId={languageId}
          label="🔊 Listen"
          className="text-xs"
        />
      </div>

      {/* Microphone area */}
      {!showResult && (
        <div className="py-2 flex flex-col items-center gap-3">
          {/* Mic button */}
          <motion.button
            type="button"
            onClick={handleRecord}
            disabled={
              disabled ||
              recState === REC_STATE.REQUESTING ||
              recState === REC_STATE.PROCESSING
            }
            animate={
              recState === REC_STATE.RECORDING
                ? { scale: [1, 1.08, 1] }
                : {}
            }
            transition={
              recState === REC_STATE.RECORDING
                ? { repeat: Infinity, duration: 1.2 }
                : {}
            }
            className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${micBtnStyle()} ${
              disabled || recState === REC_STATE.REQUESTING || recState === REC_STATE.PROCESSING
                ? 'cursor-not-allowed opacity-70'
                : 'cursor-pointer'
            }`}
            aria-label={recState === REC_STATE.RECORDING ? 'Stop recording' : 'Start recording'}
          >
            {recState === REC_STATE.REQUESTING || recState === REC_STATE.PROCESSING ? (
              <motion.div
                className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              />
            ) : recState === REC_STATE.RECORDING ? (
              <MicIcon size={38} />
            ) : recState === REC_STATE.RESULT ? (
              <span className="text-3xl">✓</span>
            ) : (
              <MicIcon size={38} />
            )}
          </motion.button>

          {/* Label */}
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{micLabel()}</p>

          {/* Recording waveform + timer */}
          {recState === REC_STATE.RECORDING && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <MicWaveform active />
              <div className="text-sm font-mono font-bold text-rose-500">
                {formatTime(elapsed)}
                <span className="text-xs text-slate-400 ml-2">/ {formatTime(MAX_RECORDING_SECONDS)}</span>
              </div>
              <button
                type="button"
                onClick={() => speechRecognitionService.stop()}
                className="text-xs text-slate-400 underline hover:text-slate-600 dark:hover:text-slate-200"
              >
                Stop
              </button>
            </motion.div>
          )}

          {/* Privacy notice */}
          {recState === REC_STATE.IDLE && asrSupported && (
            <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
              Your recording is used only to check your pronunciation.
            </p>
          )}
        </div>
      )}

      {/* Score result */}
      <AnimatePresence>
        {result && recState === REC_STATE.RESULT && (
          <ScoreDisplay
            score={result.score}
            grade={result.grade}
            transcript={result.transcript}
            targetText={targetWord}
            wordResults={result.wordResults}
            wordsToImprove={result.wordsToImprove}
            feedbackMessage={result.feedbackMessage}
          />
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {errorMsg && recState === REC_STATE.ERROR && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-slate-800 dark:text-slate-100 text-sm rounded-xl max-w-md mx-auto"
          >
            <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">
              {isTechError ? 'Technical issue' : 'Could not understand'}
            </p>
            <p>{errorMsg}</p>
            {isTechError && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                This technical issue won't affect your score.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      {!showResult && (
        <div className="flex justify-between items-center max-w-md mx-auto pt-2 gap-3">
          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={disabled}
            className="text-xs"
          >
            {recState === REC_STATE.ERROR ? 'Skip' : "Can't speak now"}
          </Button>

          {recState === REC_STATE.ERROR && (
            <Button variant="outline" onClick={handleRetry}>
              Try again
            </Button>
          )}

          {result && recState === REC_STATE.RESULT && (
            <Button onClick={handleCheck} disabled={disabled}>
              Check Pronunciation →
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Mic SVG icon ──────────────────────────────────────────────────────────────
function MicIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}
