import { textToSpeech } from './server/services/speech.js'
import dotenv from 'dotenv'

dotenv.config()

async function test() {
  try {
    console.log('Testing textToSpeech...')
    const result = await textToSpeech('Hello, how are you?', 'hi')
    console.log('Success!', result.audioBase64 ? result.audioBase64.substring(0, 50) + '...' : 'No audioBase64')
  } catch (err) {
    console.error('Test failed:', err)
  }
}

test()
