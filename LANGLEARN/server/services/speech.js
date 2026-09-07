import fs from 'fs'
import { SarvamAIClient } from 'sarvamai'

export async function textToSpeech(text, languageCode) {
  if (!process.env.SARVAM_API_KEY) {
    throw new Error('Missing SARVAM_API_KEY in environment variables')
  }

  const client = new SarvamAIClient({ apiSubscriptionKey: process.env.SARVAM_API_KEY })

  // Map our frontend language codes to Sarvam target_language_code
  // Sarvam supports: hi-IN, ta-IN, te-IN, bn-IN, etc.
  let targetLang = languageCode
  if (!targetLang.includes('-')) {
    targetLang = `${targetLang}-IN`
  }

  try {
    const response = await client.textToSpeech.convert({
      text: text,
      target_language_code: targetLang,
      speaker: 'ritu', // Changed from 'meera' to an available speaker
      model: 'bulbul:v3'
    })

    if (response.audios && response.audios.length > 0) {
      return { audioBase64: response.audios[0], source: 'sarvam' }
    } else {
      throw new Error('No audio returned from Sarvam AI')
    }
  } catch (error) {
    console.error('Sarvam TTS error:', error.message || error)
    throw error
  }
}

export async function speechToText(audioFilePath, languageCode) {
  if (!process.env.SARVAM_API_KEY) {
    throw new Error('Missing SARVAM_API_KEY in environment variables')
  }

  const client = new SarvamAIClient({ apiSubscriptionKey: process.env.SARVAM_API_KEY })

  try {
    const response = await client.speechToText.transcribe({
      file: fs.createReadStream(audioFilePath)
    })

    const text = response.transcript || response.text || ''
    return { text, source: 'sarvam' }
  } catch (error) {
    console.error('Sarvam STT error:', error.message || error)
    return { 
      text: '', 
      source: 'none',
      note: 'Speech recognition service unavailable: ' + (error.message || error)
    }
  }
}
