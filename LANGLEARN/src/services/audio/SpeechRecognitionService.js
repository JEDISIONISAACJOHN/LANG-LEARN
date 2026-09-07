/**
 * SpeechRecognitionService — Speech-to-text for speaking exercises
 *
 * Priority:
 *   1. Browser SpeechRecognition (webkitSpeechRecognition / SpeechRecognition)
 *   2. Manual fallback (shows pronunciation guide)
 *
 * Recording states: idle | requesting | recording | processing | result | error | unsupported
 */

import { voiceLocales } from './AudioService'

export const REC_STATE = {
  IDLE:        'idle',
  REQUESTING:  'requesting',
  RECORDING:   'recording',
  PROCESSING:  'processing',
  RESULT:      'result',
  ERROR:       'error',
  UNSUPPORTED: 'unsupported',
}

// ── Text normalization for Indic scripts ──────────────────────────────────────
export function normalizeText(text) {
  if (!text) return ''
  return text
    .trim()
    // Normalize Unicode (NFC)
    .normalize('NFC')
    // Remove common punctuation (but NOT Indic characters)
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"।॥]/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

// ── Token similarity ──────────────────────────────────────────────────────────
function tokenSimilarity(a, b) {
  const tokensA = new Set(a.split(' ').filter(Boolean))
  const tokensB = new Set(b.split(' ').filter(Boolean))
  if (tokensA.size === 0 && tokensB.size === 0) return 100
  if (tokensA.size === 0 || tokensB.size === 0) return 0

  let matches = 0
  tokensA.forEach((t) => { if (tokensB.has(t)) matches++ })
  return Math.round((matches / Math.max(tokensA.size, tokensB.size)) * 100)
}

// ── Levenshtein character similarity ─────────────────────────────────────────
function charSimilarity(s1, s2) {
  if (s1 === s2) return 100
  if (!s1 || !s2) return 0

  const len1 = s1.length
  const len2 = s2.length
  const matrix = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0))

  for (let i = 0; i <= len1; i++) matrix[i][0] = i
  for (let j = 0; j <= len2; j++) matrix[0][j] = j

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }

  const dist = matrix[len1][len2]
  const maxLen = Math.max(len1, len2)
  return Math.max(0, Math.round(((maxLen - dist) / maxLen) * 100))
}

import { evaluatePronunciation } from './PronunciationScorer'

// ── Combined similarity score & Detailed Pronunciation Scorer ────────────────
export function calculateSpeakingScore(recognized, expected) {
  const normR = normalizeText(recognized)
  const normE = normalizeText(expected)

  const detailedEval = evaluatePronunciation(expected, recognized)

  const tokenScore = tokenSimilarity(normR, normE)
  const charScore  = charSimilarity(normR, normE)

  // Use the higher-accuracy composite score
  const score = Math.max(detailedEval.score, Math.round((tokenScore + charScore) / 2))

  let grade
  if (score >= 90)      grade = 'Excellent'
  else if (score >= 75) grade = 'Great'
  else if (score >= 50) grade = 'Keep practicing'
  else                  grade = 'Try again'

  return {
    score,
    grade,
    isMatch: score >= 65,
    normR,
    normE,
    wordResults: detailedEval.wordResults || [],
    wordsToImprove: detailedEval.wordsToImprove || [],
    feedbackMessage: detailedEval.feedbackMessage || grade,
  }
}

// ── SpeechRecognitionService ──────────────────────────────────────────────────
class SpeechRecognitionService {
  constructor() {
    this._SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
    this._supported = !!this._SpeechRecognition
    this._state = REC_STATE.IDLE
    this._listeners = new Set()
    
    this._recognition = null
    
    this._targetText = ''
    this._langId = 'hi'
    this._onResult = null
    this._onError = null
    this._onStateChange = null
  }

  isSupported() {
    return this._supported
  }

  getState() {
    return this._state
  }

  _setState(state) {
    this._state = state
    this._listeners.forEach((fn) => fn(state))
    if (this._onStateChange) this._onStateChange(state)
  }

  subscribe(fn) {
    this._listeners.add(fn)
    return () => this._listeners.delete(fn)
  }

  // ── Start recording ─────────────────────────────────────────────────────
  async start(langId, targetText, { onResult, onError, onStateChange } = {}) {
    if (!this._supported) {
      this._setState(REC_STATE.UNSUPPORTED)
      if (onError) onError({ type: 'unsupported', message: 'Speech recognition is not supported in this browser.' })
      return
    }

    this._cleanup()

    this._targetText = targetText
    this._langId = langId
    this._onResult = onResult
    this._onError = onError
    this._onStateChange = onStateChange

    this._setState(REC_STATE.REQUESTING)

    try {
      this._recognition = new this._SpeechRecognition()
      this._recognition.continuous = false
      this._recognition.interimResults = false
      
      // Determine language code based on langId. We can use a basic map.
      const langMap = { hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', en: 'en-IN', mr: 'mr-IN', bn: 'bn-IN', pa: 'pa-IN', gu: 'gu-IN' }
      this._recognition.lang = langMap[langId] || 'hi-IN'

      this._recognition.onstart = () => {
        this._setState(REC_STATE.RECORDING)
      }

      this._recognition.onresult = (event) => {
        this._setState(REC_STATE.PROCESSING)
        
        try {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript
          }
          
          const confidence = event.results[0]?.[0]?.confidence || 0.9
          const scoring = calculateSpeakingScore(transcript, this._targetText)

          this._setState(REC_STATE.RESULT)
          if (this._onResult) {
            this._onResult({ transcript, confidence, ...scoring })
          }
        } catch (err) {
          console.error('[ASR ERROR]', err)
          this._setState(REC_STATE.ERROR)
          if (this._onError) this._onError({ type: 'error', message: 'Failed to process speech result.' })
        } finally {
          this._cleanup(false)
        }
      }

      this._recognition.onerror = (event) => {
        console.error('[ASR ERROR]', event.error)
        this._setState(REC_STATE.ERROR)
        if (this._onError) this._onError({ type: 'error', message: `Speech recognition error: ${event.error}`, isTechnicalFailure: true })
        this._cleanup()
      }

      this._recognition.onend = () => {
        // If it ended while recording and we didn't process a result or error
        if (this._state === REC_STATE.RECORDING) {
           this._cleanup()
        }
      }

      this._recognition.start()

    } catch (err) {
      console.error('[ASR ERROR]', err)
      this._setState(REC_STATE.ERROR)
      if (onError) onError({ type: 'error', message: 'Could not start speech recognition.', isTechnicalFailure: true })
      this._cleanup()
    }
  }

  // ── Stop recording ────────────────────────────────────────────────────────
  stop() {
    if (this._recognition && this._state === REC_STATE.RECORDING) {
      this._recognition.stop()
    }
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────
  _cleanup(resetState = true) {
    this._recognition = null
    
    if (resetState && this._state !== REC_STATE.IDLE) {
      this._setState(REC_STATE.IDLE)
    }
  }

  destroy() {
    this.stop()
    this._cleanup()
    this._listeners.clear()
  }
}

export const speechRecognitionService = new SpeechRecognitionService()
