/**
 * Free Language APIs Service for LangLearn
 * 
 * APIs Utilized (100% Free, Zero API Keys Required):
 * 1. MyMemory Translation API (https://api.mymemory.translated.net/get)
 *    - Used for live sentence and phrase translations across supported languages.
 * 2. Wikimedia / Wiktionary REST API (https://en.wiktionary.org/api/rest_v1/page/definition)
 *    - Used for lexical word lookup, parts of speech, and dictionary definitions.
 * 3. Web Speech API (window.speechSynthesis & webkitSpeechRecognition)
 *    - Used for client-side Indian language Text-To-Speech and voice input scoring.
 * 4. DiceBear Avatars API (https://api.dicebear.com/7.x)
 *    - Used for generated avatars in leaderboards and user profiles.
 */

// Language ISO map for MyMemory Translation API
const myMemoryLangMap = {
  hi: 'hi',
  ta: 'ta',
  te: 'te',
  ml: 'ml',
  kn: 'kn',
  en: 'en',
}

/**
 * 1. Live Translation using MyMemory Free API
 * @param {string} text - text to translate
 * @param {string} fromLang - source language code
 * @param {string} toLang - target language code
 */
export async function translateTextLive(text, fromLang = 'en', toLang = 'hi') {
  if (!text || !text.trim()) return text

  const src = myMemoryLangMap[fromLang] || 'en'
  const tgt = myMemoryLangMap[toLang] || 'hi'

  if (src === tgt) return text

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${src}|${tgt}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Translation network error')

    const data = await response.json()
    if (data && data.responseData && data.responseData.translatedText) {
      return {
        translatedText: data.responseData.translatedText,
        matchScore: data.responseData.match || 1,
        provider: 'MyMemory Free Translation API',
      }
    }
  } catch (err) {
    console.warn('MyMemory Translation API fallback:', err)
  }

  return {
    translatedText: text,
    matchScore: 0,
    provider: 'Offline Fallback',
  }
}

/**
 * 2. Wiktionary Free Dictionary Lookup API
 * @param {string} word
 */
export async function fetchWordDefinition(word) {
  if (!word) return null
  try {
    const cleanWord = word.trim().toLowerCase()
    const url = `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(cleanWord)}`
    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    return data
  } catch (e) {
    return null
  }
}

/**
 * 3. Generate Free DiceBear Avatar URL
 * @param {string} seed
 */
export function getAvatarUrl(seed = 'Learner') {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`
}

export const API_CATALOGUE = [
  {
    name: 'MyMemory Translation API',
    description: 'Used for live sentence and phrase translations across supported languages.',
    usageLocation: 'Live Chat / Translation',
  },
  {
    name: 'Wikimedia / Wiktionary REST API',
    description: 'Used for lexical word lookup, parts of speech, and dictionary definitions.',
    usageLocation: 'Dictionary / Lexicon Lookup',
  },
  {
    name: 'Web Speech API',
    description: 'Used for client-side Indian language Text-To-Speech and voice input scoring.',
    usageLocation: 'Pronunciation / Conversation Tutor',
  },
  {
    name: 'DiceBear Avatars API',
    description: 'Used for generated avatars in leaderboards and user profiles.',
    usageLocation: 'Profiles / Leaderboards',
  },
];
