import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, X, Sparkles } from 'lucide-react'
import { alphabetDataByLanguage } from '../../data/alphabets'
import { speakText } from '../../services/aiService'

export default function AlphabetModal({ languageId = 'hi', languageName = 'Hindi', isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('vowels')
  const data = alphabetDataByLanguage[languageId] || alphabetDataByLanguage['hi']

  if (!isOpen) return null

  const handlePlayAudio = (char) => {
    speakText(char, languageId)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/25">
                अ
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white">{languageName} Script Chart</h3>
                <p className="text-xs text-slate-400 font-medium">{data.scriptName} • Tap any letter to hear authentic sound</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-2xl hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 pt-3 gap-3">
            <button
              onClick={() => setActiveTab('vowels')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'vowels'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles size={16} />
              <span>{data.vowelsTitle}</span>
            </button>
            <button
              onClick={() => setActiveTab('consonants')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'consonants'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles size={16} />
              <span>{data.consonantsTitle}</span>
            </button>
          </div>

          {/* Alphabet Grid */}
          <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {(activeTab === 'vowels' ? data.vowels : data.consonants).map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handlePlayAudio(item.char)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-400 rounded-3xl text-left shadow-xs hover:shadow-md transition-all group flex flex-col justify-between min-h-[108px] cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      {item.char}
                    </span>
                    <Volume2 size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">/{item.roman}/</p>
                    <p className="text-[11px] text-slate-400 truncate">{item.example}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            Tip: Listen carefully to the pronunciation and practice repeating each character!
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
