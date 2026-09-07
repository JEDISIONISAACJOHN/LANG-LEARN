import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function MatchingExercise({
  prompt,
  pairs = [],
  onSubmit,
  disabled = false,
  showResult = false,
}) {
  const [leftSelected, setLeftSelected] = useState(null)
  const [rightSelected, setRightSelected] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [wrongMatch, setWrongMatch] = useState(null)
  const [shuffledRight, setShuffledRight] = useState([])

  useEffect(() => {
    setMatchedPairs([])
    setLeftSelected(null)
    setRightSelected(null)
    setWrongMatch(null)
    // Shuffle right column
    const rights = pairs.map((p) => p.meaning).sort(() => Math.random() - 0.5)
    setShuffledRight(rights)
  }, [pairs])

  const handleLeftClick = (word) => {
    if (disabled || showResult || matchedPairs.includes(word)) return
    setLeftSelected(word)
    if (rightSelected) {
      checkMatch(word, rightSelected)
    }
  }

  const handleRightClick = (meaning) => {
    if (disabled || showResult) return
    const matchedWord = pairs.find((p) => p.meaning === meaning)?.word
    if (matchedWord && matchedPairs.includes(matchedWord)) return

    setRightSelected(meaning)
    if (leftSelected) {
      checkMatch(leftSelected, meaning)
    }
  }

  const checkMatch = (word, meaning) => {
    const isPair = pairs.some((p) => p.word === word && p.meaning === meaning)
    if (isPair) {
      const newMatched = [...matchedPairs, word]
      setMatchedPairs(newMatched)
      setLeftSelected(null)
      setRightSelected(null)
      setWrongMatch(null)

      if (newMatched.length === pairs.length) {
        setTimeout(() => {
          onSubmit('matched_all')
        }, 500)
      }
    } else {
      setWrongMatch({ word, meaning })
      setTimeout(() => {
        setLeftSelected(null)
        setRightSelected(null)
        setWrongMatch(null)
      }, 700)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl md:text-2xl font-semibold text-[#25231F] text-center mb-4">
        {prompt}
      </h3>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {/* Left Column (Target words) */}
        <div className="space-y-3">
          {pairs.map((pair, idx) => {
            const isMatched = matchedPairs.includes(pair.word)
            const isSelected = leftSelected === pair.word
            const isWrong = wrongMatch?.word === pair.word

            return (
              <motion.button
                key={`left-${idx}`}
                onClick={() => handleLeftClick(pair.word)}
                disabled={disabled || showResult || isMatched}
                whileTap={!isMatched ? { scale: 0.96 } : {}}
                className={`
                  w-full p-4 rounded-2xl border-2 text-center font-bold text-lg transition-all
                  ${isMatched
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 opacity-90 cursor-default'
                    : isWrong
                    ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 animate-shake'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 ring-2 ring-indigo-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 text-slate-800 dark:text-slate-100'
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{pair.word}</span>
                  {isMatched && <Check size={18} strokeWidth={2.5} />}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Right Column (Preferred meanings) */}
        <div className="space-y-3">
          {shuffledRight.map((meaning, idx) => {
            const matchedWord = pairs.find((p) => p.meaning === meaning)?.word
            const isMatched = matchedWord && matchedPairs.includes(matchedWord)
            const isSelected = rightSelected === meaning
            const isWrong = wrongMatch?.meaning === meaning

            return (
              <motion.button
                key={`right-${idx}`}
                onClick={() => handleRightClick(meaning)}
                disabled={disabled || showResult || isMatched}
                whileTap={!isMatched ? { scale: 0.96 } : {}}
                className={`
                  w-full p-4 rounded-2xl border-2 text-center font-bold text-base transition-all
                  ${isMatched
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 opacity-90 cursor-default'
                    : isWrong
                    ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 animate-shake'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 ring-2 ring-indigo-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 text-slate-800 dark:text-slate-100'
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{meaning}</span>
                  {isMatched && <Check size={18} strokeWidth={2.5} />}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
