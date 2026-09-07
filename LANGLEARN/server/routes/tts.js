import express from 'express'
import { textToSpeech } from '../services/speech.js'

const router = express.Router()

router.post('/text-to-speech', async (req, res) => {
  try {
    const { text, language } = req.body
    
    if (!text || !language) {
      return res.status(400).json({ error: 'Missing required fields: text, language' })
    }

    const result = await textToSpeech(text, language)
    res.json(result)
  } catch (error) {
    console.error('TTS error:', error)
    res.status(500).json({ error: 'Text-to-speech service unavailable' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { text, language } = req.body
    
    if (!text || !language) {
      return res.status(400).json({ error: 'Missing required fields: text, language' })
    }

    const result = await textToSpeech(text, language)
    res.json(result)
  } catch (error) {
    console.error('TTS error:', error)
    res.status(500).json({ error: 'Text-to-speech service unavailable' })
  }
})

export default router
