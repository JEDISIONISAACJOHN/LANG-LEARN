import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import LangLearnLogo from '../../components/Logo/LangLearnLogo'
import BharatMascot from '../../components/Mascot/BharatMascot'
import { Sparkles, BookOpen, Mic, Trophy, Heart, ArrowRight, BookA, Layers, CheckCircle2 } from 'lucide-react'
import './Welcome.css'

export default function Welcome() {
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()

  const bentoFeatures = [
    {
      title: 'Bite-Sized Gamified Lessons',
      desc: 'Learn practical conversation, grammar, and essential vocabulary in 5-minute interactive daily sessions.',
      icon: Layers,
      accent: 'from-indigo-500 to-violet-500',
      tag: 'Adaptive Units',
      badgeBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400',
    },
    {
      title: 'Real-Time Voice & Speech AI',
      desc: 'Practice speaking aloud with instant phonetic scoring, pronunciation analysis, and native voice playback.',
      icon: Mic,
      accent: 'from-violet-500 to-fuchsia-500',
      tag: 'Phonetic Feedback',
      badgeBg: 'bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400',
    },
    {
      title: 'Cultural Indian Stories',
      desc: 'Explore folklore like Akbar & Birbal, Tenali Rama, and Panchatantra with dual-language line-by-line audio.',
      icon: BookOpen,
      accent: 'from-emerald-500 to-teal-500',
      tag: 'Bilingual Reader',
      badgeBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
    },
    {
      title: 'Authentic Script Charts',
      desc: 'Master Devanagari, Tamil, Telugu, Malayalam, and Kannada alphabets with audio pronunciation and stroke cards.',
      icon: BookA,
      accent: 'from-amber-500 to-orange-500',
      tag: 'Aksharamala',
      badgeBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col transition-colors">
      {/* Sticky Header */}
      <header className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center max-w-6xl">
          <Link to="/">
            <LangLearnLogo size="medium" />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="px-5 py-2 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2 rounded-2xl font-bold text-sm bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Hero Pitch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles size={13} />
                <span>The Modern Way to Learn Indian Languages</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                Master Indian Languages with <span className="text-indigo-600 dark:text-indigo-400">LangLearn</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-medium">
                Meet <span className="font-bold text-indigo-600 dark:text-indigo-400">Mayur</span>, your cheerful language tutor. Learn Hindi, Tamil, Telugu, Malayalam, Kannada & English through playful micro-lessons and interactive voice practice.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/signup">
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-extrabold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <span>Start Learning Free</span>
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-extrabold hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all active:scale-95">
                    I Already Have an Account
                  </button>
                </Link>
              </div>

              <div className="pt-2">
                <button
                  onClick={async () => {
                    await loginWithGoogle()
                    navigate('/dashboard')
                  }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Quick Sign-in with Google</span>
                </button>
              </div>
            </motion.div>

            {/* Right Mascot & Script Animation Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/50 to-violet-200/50 rounded-full blur-3xl opacity-60" />
                <div className="relative soft-card p-8 h-full flex flex-col items-center justify-center text-center space-y-5">
                  {/* Mayur Mascot */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  >
                    <BharatMascot size={150} mood="waving" />
                  </motion.div>

                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 rounded-xl text-xs font-bold border border-indigo-100 dark:border-indigo-800/60">हिन्दी</span>
                    <span className="px-3 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 rounded-xl text-xs font-bold border border-violet-100 dark:border-violet-800/60">தமிழ்</span>
                    <span className="px-3 py-1 bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-300 rounded-xl text-xs font-bold border border-fuchsia-100 dark:border-fuchsia-800/60">తెలుగు</span>
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-800/60">മലയാളം</span>
                    <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 rounded-xl text-xs font-bold border border-amber-100 dark:border-amber-800/60">ಕನ್ನಡ</span>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-bold border border-blue-100 dark:border-blue-800/60">English</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    6 Rich Indian Languages • Open Speech APIs • Bento Gamification
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bento Grid Feature Showcase */}
          <div className="mt-20 pt-12 border-t border-slate-200/80 dark:border-slate-800">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                Everything You Need for True Fluency
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Built with modern cognitive science, spaced repetition, and real-time audio analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bentoFeatures.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="soft-card p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feat.badgeBg} shadow-sm`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {feat.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 border-t border-slate-100 dark:border-slate-800/80 text-center text-slate-400 text-xs">
        <p>© {new Date().getFullYear()} LangLearn. Master Indian languages with joy and confidence.</p>
      </footer>
    </div>
  )
}
