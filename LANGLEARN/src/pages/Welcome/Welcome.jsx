import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import LangLearnLogo from '../../components/Logo/LangLearnLogo'
import BharatMascot from '../../components/Mascot/BharatMascot'
import { Sparkles, BookOpen, Mic, Trophy, Heart, ArrowRight, BookA, Layers, CheckCircle2, Star } from 'lucide-react'
import './Welcome.css'

export default function Welcome() {
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()

  const bentoFeatures = [
    {
      title: 'Bite-Sized Gamified Lessons',
      desc: 'Learn practical conversation, grammar, and essential vocabulary in 5-minute interactive daily sessions.',
      icon: Layers,
      accent: 'from-pink-500 to-rose-500',
      tag: 'Adaptive Units',
    },
    {
      title: 'Real-Time Voice AI',
      desc: 'Practice speaking aloud with instant phonetic scoring, pronunciation analysis, and native voice playback.',
      icon: Mic,
      accent: 'from-violet-500 to-fuchsia-500',
      tag: 'Phonetic Feedback',
    },
    {
      title: 'Cultural Indian Stories',
      desc: 'Explore folklore like Akbar & Birbal, Tenali Rama, and Panchatantra with dual-language line-by-line audio.',
      icon: BookOpen,
      accent: 'from-amber-500 to-orange-500',
      tag: 'Bilingual Reader',
    },
    {
      title: 'Authentic Script Charts',
      desc: 'Master Devanagari, Tamil, Telugu, Malayalam, and Kannada alphabets with audio pronunciation and stroke cards.',
      icon: BookA,
      accent: 'from-blue-500 to-cyan-500',
      tag: 'Aksharamala',
    },
  ]

  return (
    <div className="min-h-screen aurora-bg flex flex-col font-sans overflow-hidden">
      {/* Sticky Header - Glassmorphic */}
      <header className="p-4 fixed top-0 w-full z-50">
        <nav className="container mx-auto max-w-6xl glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
          <Link to="/" className="hover:scale-105 transition-transform drop-shadow-md">
            {/* The Logo itself needs to be visible on dark/vibrant backgrounds. The existing logo might be dark, but let's wrap it nicely */}
            <div className="bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl backdrop-blur-md">
              <LangLearnLogo size="medium" />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="btn-gamified secondary">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn-gamified">
                Get Started
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - Centered Immersive */}
      <main className="flex-1 pt-32 pb-20 relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="space-y-8 flex flex-col items-center"
          >
            {/* Super Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white shadow-lg border border-slate-200 dark:border-white/40">
              <Sparkles size={16} className="text-yellow-500 dark:text-yellow-300" />
              <span>The Next Generation of Language Learning</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] drop-shadow-md dark:drop-shadow-2xl">
              Fluency <br className="hidden md:block"/> Starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-yellow-300 dark:to-amber-400">Here.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 dark:text-white/90 max-w-2xl leading-relaxed font-medium drop-shadow-sm dark:drop-shadow-md">
              Master Hindi, Tamil, Telugu, Malayalam, Kannada & English with an AI tutor that listens, speaks, and guides you through India's rich linguistic heritage.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center">
              <Link to="/signup">
                <button className="btn-gamified w-full sm:w-auto">
                  <span>Start For Free</span>
                  <ArrowRight size={22} />
                </button>
              </Link>
              <button
                onClick={async () => {
                  await loginWithGoogle()
                  navigate('/dashboard')
                }}
                className="btn-gamified secondary w-full sm:w-auto"
              >
                <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google Sign In</span>
              </button>
            </div>
          </motion.div>

          {/* Center Mascot / Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
            className="mt-20 relative w-full max-w-2xl mx-auto h-64 md:h-80 flex items-center justify-center"
          >
            {/* The Mascot */}
            <div className="relative z-10 p-8 glass-panel rounded-full shadow-2xl border border-white/50">
               <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
                 <BharatMascot size={180} mood="happy" />
               </motion.div>
            </div>

            {/* Orbiting Language Badges */}
            <div className="absolute inset-0 orbit-container">
              <div className="absolute top-0 left-10 md:left-20 floating-badge">
                <div className="glass-panel px-4 py-2 rounded-2xl font-black text-slate-800 dark:text-white text-lg rotate-12 shadow-lg border-white/50">हिन्दी</div>
              </div>
              <div className="absolute bottom-10 left-0 md:left-10 floating-badge">
                <div className="glass-panel px-4 py-2 rounded-2xl font-black text-slate-800 dark:text-white text-lg -rotate-12 shadow-lg border-white/50">தமிழ்</div>
              </div>
              <div className="absolute top-10 right-5 md:right-16 floating-badge">
                <div className="glass-panel px-4 py-2 rounded-2xl font-black text-slate-800 dark:text-white text-lg -rotate-6 shadow-lg border-white/50">తెలుగు</div>
              </div>
              <div className="absolute bottom-0 right-10 md:right-20 floating-badge">
                <div className="glass-panel px-4 py-2 rounded-2xl font-black text-slate-800 dark:text-white text-lg rotate-12 shadow-lg border-white/50">മലയാളം</div>
              </div>
              <div className="absolute top-1/2 -left-4 md:-left-12 floating-badge">
                <div className="glass-panel px-4 py-2 rounded-2xl font-black text-slate-800 dark:text-white text-lg rotate-6 shadow-lg border-white/50">ಕನ್ನಡ</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Zig-Zag Features Section */}
        <div className="mt-32 relative z-10 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg">Designed for Success</h2>
              <p className="text-slate-600 dark:text-white/80 mt-4 text-lg max-w-2xl mx-auto font-medium">Experience a revolutionary way to learn regional languages with cutting-edge AI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {bentoFeatures.map((feat, i) => {
                const Icon = feat.icon
                const isEven = i % 2 === 0
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`glass-panel p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between overflow-hidden relative group ${i === 1 || i === 2 ? 'md:translate-y-16' : ''}`}
                  >
                    {/* Background Glow */}
                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${feat.accent} rounded-full blur-3xl opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-12">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feat.accent} flex items-center justify-center text-white shadow-xl shadow-black/10 dark:shadow-black/20`}>
                          <Icon size={32} />
                        </div>
                        <span className="glass-panel px-4 py-1.5 rounded-full text-xs font-black uppercase text-slate-700 dark:text-white tracking-wider border border-white/30 dark:border-white/20">
                          {feat.tag}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                          {feat.title}
                        </h3>
                        <p className="text-slate-600 dark:text-white/80 leading-relaxed font-medium text-lg">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div className="mt-40 mb-10 max-w-4xl mx-auto px-4 relative z-10">
          <div className="glass-panel rounded-[3rem] p-12 text-center border-t border-l border-white/50 dark:border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 dark:from-white/10 to-transparent pointer-events-none" />
            <Trophy size={64} className="text-yellow-500 dark:text-yellow-300 mx-auto mb-6 relative z-10" />
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight relative z-10">Ready to start your journey?</h2>
            <Link to="/signup" className="relative z-10">
              <button className="btn-gamified">
                <span>Start Learning Now</span>
                <Star className="text-yellow-200" fill="currentColor" size={24}/>
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-8 glass-panel border-t border-white/20 mt-auto">
        <div className="container mx-auto text-center text-slate-500 dark:text-white/70 text-sm font-medium">
          <p>© {new Date().getFullYear()} LangLearn. Built with <Heart size={14} className="inline text-rose-500 mx-1"/> for Indian Languages.</p>
        </div>
      </footer>
    </div>
  )
}
