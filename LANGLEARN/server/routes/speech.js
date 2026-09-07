import express from 'express'
import multer from 'multer'
import { speechToText, textToSpeech } from '../services/speech.js'
import fs from 'fs'

const router = express.Router()

// Setup multer to store audio files temporarily
const upload = multer({ dest: 'uploads/' })

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

// Use multer to parse the uploaded file named 'audio'
router.post('/speech-to-text', upload.single('audio'), async (req, res) => {
  try {
    const { language } = req.body
    const audioFile = req.file
    
    if (!audioFile || !language) {
      return res.status(400).json({ error: 'Missing required fields: audio (file), language' })
    }

    const result = await speechToText(audioFile.path, language)
    
    // Clean up temporary file
    fs.unlinkSync(audioFile.path)
    
    res.json(result)
  } catch (error) {
    console.error('Speech recognition error:', error)
    // Attempt cleanup if file exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({ error: 'Speech recognition service unavailable' })
  }
})

export default router
