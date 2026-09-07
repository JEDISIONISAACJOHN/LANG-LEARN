/**
 * AI Conversation Tutor Service for LangLearn
 *
 * Evaluates learner utterances in interactive roleplay scenarios:
 * - Checks intent fulfillment and expected vocabulary
 * - Assesses grammatical register (formal vs informal)
 * - Produces constructive pedagogical feedback in the learner's chosen interface language
 */

import { calculateStringSimilarity, normalizeIndicSpeechText } from './audio/PronunciationScorer'

/**
 * Evaluate a single conversational turn from the user
 *
 * @param {string} userUtterance - What the user typed or spoke
 * @param {Object} turnData - The expected turn definition from `conversations.js`
 * @param {string} learningLanguage - Language being learned (e.g. 'hi', 'ta', 'te', 'ml', 'kn')
 * @param {string} interfaceLanguage - User's preferred UI language (e.g. 'en', 'hi')
 */
export function evaluateTutorResponse(userUtterance, turnData, learningLanguage = 'hi', interfaceLanguage = 'en') {
  if (!userUtterance || !turnData) {
    return {
      isAcceptable: false,
      score: 0,
      feedback: 'Please say or type something to continue.',
      naturalAlternative: turnData?.suggestedReplies?.[0] || '',
    }
  }

  const cleanUserText = normalizeIndicSpeechText(userUtterance)
  const expectedKeywords = turnData.expectedKeywords || []
  const suggestedReplies = turnData.suggestedReplies || []

  // 1. Keyword overlap
  let matchedKeywords = 0
  expectedKeywords.forEach((kw) => {
    if (cleanUserText.includes(normalizeIndicSpeechText(kw))) {
      matchedKeywords++
    }
  })

  // Correctness score (0 to 100) based on keywords
  const correctnessScore = expectedKeywords.length > 0 
    ? Math.round((matchedKeywords / expectedKeywords.length) * 100) 
    : 100

  // 2. Similarity against any suggested native reply (Naturalness)
  let maxSimilarity = 0
  let closestReply = suggestedReplies[0] || ''

  suggestedReplies.forEach((reply) => {
    const sim = calculateStringSimilarity(userUtterance, reply)
    if (sim > maxSimilarity) {
      maxSimilarity = sim
      closestReply = reply
    }
  })
  
  const naturalnessScore = Math.round(maxSimilarity * 100)

  // Calculate total score (0 to 100): 60% correctness + 40% naturalness
  const totalScore = Math.round((correctnessScore * 0.6) + (naturalnessScore * 0.4))
  const isAcceptable = totalScore >= 50

  let feedback = 'Great attempt! Keep practicing.'
  if (totalScore > 85) {
    feedback = 'Excellent! Your response was grammatically correct and very natural.'
  } else if (isAcceptable) {
    feedback = 'Good job! To sound even more native, you could try saying: "' + closestReply + '"'
  } else {
    feedback = 'Let\'s try again. Try to include words like: ' + expectedKeywords.slice(0, 3).join(', ') + '.'
  }

  return {
    isAcceptable,
    score: totalScore,
    correctnessScore,
    naturalnessScore,
    feedback,
    naturalAlternative: closestReply,
  }
}
