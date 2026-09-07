/**
 * AudioService — Central audio state machine for BharatLingo
 *
 * States: idle | loading | playing | paused | completed | error | unsupported
 *
 * All TTS goes through this service. Never scatter speechSynthesis.speak() in components.
 */

// ── Voice locale priority map ───────────────────────────────────────────────
export const voiceLocales = {
  en:  ['en-IN', 'en-US', 'en-GB', 'en-AU'],
  hi:  ['hi-IN'],
  mr:  ['mr-IN', 'hi-IN'],
  ta:  ['ta-IN'],
  te:  ['te-IN'],
  bn:  ['bn-IN', 'hi-IN'],
  pa:  ['pa-IN', 'hi-IN'],
  gu:  ['gu-IN', 'hi-IN'],
  raj: ['hi-IN'],
}

// ── Audio states ─────────────────────────────────────────────────────────────
export const AUDIO_STATE = {
  IDLE:        'idle',
  LOADING:     'loading',
  PLAYING:     'playing',
  PAUSED:      'paused',
  COMPLETED:   'completed',
  ERROR:       'error',
  UNSUPPORTED: 'unsupported',
}

// ── Simple LRU audio cache (key → result metadata) ──────────────────────────
class AudioCache {
  constructor(maxSize = 50) {
    this._map = new Map()
    this._max = maxSize
  }

  key(langId, locale, text) {
    return `${langId}:${locale}:${text}`
  }

  has(langId, locale, text) {
    return this._map.has(this.key(langId, locale, text))
  }

  get(langId, locale, text) {
    return this._map.get(this.key(langId, locale, text))
  }

  set(langId, locale, text, value) {
    const k = this.key(langId, locale, text)
    if (this._map.size >= this._max) {
      // Evict oldest
      const firstKey = this._map.keys().next().value
      this._map.delete(firstKey)
    }
    this._map.set(k, value)
  }
}

export const audioCache = new AudioCache()

class TTSService {
  constructor() {
    this._supported = typeof window !== 'undefined'
    this._listeners = new Set()
    this._currentState = AUDIO_STATE.IDLE
    this._audioElement = null
  }

  // ── State management ──────────────────────────────────────────────────────
  _setState(state) {
    this._currentState = state
    this._listeners.forEach((fn) => fn(state))
  }

  subscribe(fn) {
    this._listeners.add(fn)
    return () => this._listeners.delete(fn)
  }

  getState() {
    return this._currentState
  }

  // ── Main speak function ───────────────────────────────────────────────────
  async speak(text, langId = 'hi', { rate = 1.0, pitch = 1.0, onEnd } = {}) {
    if (!this._supported) {
      this._setState(AUDIO_STATE.UNSUPPORTED)
      return { success: false, reason: 'unsupported' }
    }

    if (!text || !text.trim()) {
      this._setState(AUDIO_STATE.ERROR)
      return { success: false, reason: 'no_text' }
    }

    // Cancel any ongoing speech
    this.stop()

    this._setState(AUDIO_STATE.LOADING)

    try {
      const response = await fetch('/api/tts/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, language: langId })
      })

      if (!response.ok) {
        throw new Error('TTS Backend request failed')
      }

      const data = await response.json()
      
      if (!data.audioBase64) {
        throw new Error('No audio returned from backend')
      }

      // Play the base64 audio
      const audioUrl = `data:audio/wav;base64,${data.audioBase64}`
      this._audioElement = new Audio(audioUrl)
      
      // We can adjust playback rate if needed (though Sarvam might have its own pace)
      this._audioElement.playbackRate = rate

      this._audioElement.onplay = () => {
        this._setState(AUDIO_STATE.PLAYING)
      }

      this._audioElement.onended = () => {
        this._setState(AUDIO_STATE.COMPLETED)
        if (onEnd) onEnd({ success: true, isFallback: false })
      }

      this._audioElement.onerror = () => {
        this._setState(AUDIO_STATE.ERROR)
        if (onEnd) onEnd({ success: false, reason: 'playback_error' })
      }

      await this._audioElement.play()

      return { success: true, isFallback: false, voice: 'sarvam', locale: langId }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('[TTS ERROR]', err)
      }
      
      // Fallback to window.speechSynthesis
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        console.warn('Falling back to Web Speech Synthesis API');
        return new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = langId === 'hi' ? 'hi-IN' : (langId === 'ta' ? 'ta-IN' : (langId === 'te' ? 'te-IN' : langId));
          utterance.rate = rate;
          utterance.pitch = pitch;
          
          utterance.onstart = () => this._setState(AUDIO_STATE.PLAYING);
          utterance.onend = () => {
            this._setState(AUDIO_STATE.COMPLETED);
            if (onEnd) onEnd({ success: true, isFallback: true });
            resolve({ success: true, isFallback: true, voice: 'browser', locale: utterance.lang });
          };
          utterance.onerror = (e) => {
            this._setState(AUDIO_STATE.ERROR);
            if (onEnd) onEnd({ success: false, reason: 'fallback_error' });
            resolve({ success: false, reason: e.error || 'fallback_error' });
          };
          
          window.speechSynthesis.speak(utterance);
        });
      }

      this._setState(AUDIO_STATE.ERROR)
      return { success: false, reason: err.message }
    }
  }

  // ── Slow speech (0.55x) ───────────────────────────────────────────────────
  async speakSlow(text, langId = 'hi', opts = {}) {
    return this.speak(text, langId, { ...opts, rate: 0.55 })
  }

  // ── Stop ──────────────────────────────────────────────────────────────────
  stop() {
    if (this._audioElement) {
      this._audioElement.pause()
      this._audioElement.currentTime = 0
    }
    this._audioElement = null
    
    if (
      this._currentState === AUDIO_STATE.PLAYING ||
      this._currentState === AUDIO_STATE.LOADING
    ) {
      this._setState(AUDIO_STATE.IDLE)
    }
  }

  isSupported() {
    return this._supported
  }
}

// ── Singleton export ──────────────────────────────────────────────────────────
export const ttsService = new TTSService()

// ── Web Audio Chime Synthesizer ───────────────────────────────────────────────
function playWebAudioChime(isSuccess = true) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const now = ctx.currentTime

    if (isSuccess) {
      // Pleasant two-tone success chord (C5 -> G5)
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.type = 'sine'
      osc2.type = 'sine'
      osc1.frequency.setValueAtTime(523.25, now) // C5
      osc1.frequency.setValueAtTime(783.99, now + 0.1) // G5
      osc2.frequency.setValueAtTime(659.25, now + 0.1) // E5

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now + 0.1)
      osc1.stop(now + 0.5)
      osc2.stop(now + 0.5)
    } else {
      // Gentle subtle error note
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(220, now) // A3
      osc.frequency.setValueAtTime(196, now + 0.1) // G3
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    }
  } catch (e) {
    // AudioContext blocked by browser policy until interaction
  }
}

// ── Unified AudioService API ──────────────────────────────────────────────────
export const AudioService = {
  speak: (text, langId = 'hi', opts = {}) => ttsService.speak(text, langId, opts),
  speakSlow: (text, langId = 'hi', opts = {}) => ttsService.speakSlow(text, langId, opts),
  stop: () => ttsService.stop(),
  isSupported: () => ttsService.isSupported(),
  playChime: (isSuccess = true) => playWebAudioChime(isSuccess),
}

// ── Convenience re-export for backward compat ─────────────────────────────────
export function speakText(text, langId = 'hi', onEnd = null) {
  return ttsService.speak(text, langId, { onEnd: onEnd ? () => onEnd() : undefined })
}

export default AudioService
