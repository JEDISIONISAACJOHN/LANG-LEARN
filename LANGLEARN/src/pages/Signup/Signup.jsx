import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import { useAppSound } from '../../services/sound'
import LangLearnLogo from '../../components/Logo/LangLearnLogo'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, loginWithGoogle } = useAuth()
  const { playClick, playSuccess, playError } = useAppSound()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGoogleSignup = async () => {
    playClick()
    setLoading(true)
    try {
      await loginWithGoogle()
      playSuccess()
      navigate('/dashboard')
    } catch (error) {
      playError()
      setErrors({ general: error.message || 'Google sign-in failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    playClick()
    
    if (!validate()) {
      playError()
      return
    }
    
    setLoading(true)
    try {
      await signup(formData.name, formData.email, formData.password)
      playSuccess()
      navigate('/login', {
        state: {
          successMessage: 'Account created successfully! Please log in with your credentials.',
          email: formData.email,
        },
      })
    } catch (error) {
      playError()
      setErrors({ general: error.message || 'Failed to create account. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Visual/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary to-accent-primary p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-accent-secondary opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white p-2 rounded-2xl">
              <LangLearnLogo size="small" />
            </div>
            <span className="text-white text-2xl font-black tracking-tight">LangLearn</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-bold uppercase tracking-wider backdrop-blur-md mb-6 border border-white/20">
              <Sparkles size={16} /> Begin Your Journey
            </div>
            <h1 className="text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
              Unlock the World of Indian Languages.
            </h1>
            <p className="text-white/80 text-xl font-medium max-w-md">
              Learn Hindi, Tamil, Telugu, and more with our adaptive AI and immersive stories.
            </p>
          </motion.div>
        </div>
        
        <div className="relative z-10 bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20 max-w-sm">
          <p className="text-white font-medium italic">"The gamified approach combined with cultural stories makes learning incredibly addictive."</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center text-white font-bold">A</div>
            <div>
              <p className="text-white font-bold text-sm">Anita K.</p>
              <p className="text-white/70 text-xs">Learning Telugu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div
          className="w-full max-w-md py-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <LangLearnLogo size="small" />
            <span className="text-text-primary text-3xl font-black tracking-tight">LangLearn</span>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-black text-text-primary mb-3">Create Account</h2>
            <p className="text-text-secondary text-lg font-medium">Start your learning journey today</p>
          </div>

          {errors.general && (
            <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} className="mb-6 p-4 bg-error/10 border border-error/20 rounded-[1rem] text-error text-sm font-medium flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-error"></div>
              {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-bold text-text-primary uppercase tracking-wider ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-surface-hover border-2 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-text-primary placeholder:text-text-muted ${
                  errors.name ? 'border-error' : 'border-border-subtle focus:border-primary'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-sm text-error font-medium ml-1">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-bold text-text-primary uppercase tracking-wider ml-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-surface-hover border-2 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-text-primary placeholder:text-text-muted ${
                  errors.email ? 'border-error' : 'border-border-subtle focus:border-primary'
                }`}
                placeholder="hello@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-error font-medium ml-1">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-bold text-text-primary uppercase tracking-wider ml-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-surface-hover border-2 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-text-primary placeholder:text-text-muted ${
                  errors.password ? 'border-error' : 'border-border-subtle focus:border-primary'
                }`}
                placeholder="Create a password (min. 6 chars)"
              />
              {errors.password && <p className="mt-1 text-sm text-error font-medium ml-1">{errors.password}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-text-primary uppercase tracking-wider ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-surface-hover border-2 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-text-primary placeholder:text-text-muted ${
                  errors.confirmPassword ? 'border-error' : 'border-border-subtle focus:border-primary'
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-error font-medium ml-1">{errors.confirmPassword}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 px-6 bg-primary hover:bg-accent-primary text-white rounded-[1.25rem] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-glow transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? 'Creating account...' : (
                <>Sign Up <ArrowRight size={20} /></>
              )}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-subtle" />
              </div>
              <div className="relative flex justify-center text-sm font-bold uppercase tracking-widest">
                <span className="px-4 bg-background text-text-muted">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-4 px-6 flex items-center justify-center gap-3 bg-surface hover:bg-surface-hover border-2 border-border-subtle text-text-primary rounded-[1.25rem] font-black transition-all active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          <p className="mt-8 text-center text-text-secondary font-medium">
            Already have an account?{' '}
            <Link to="/login" onClick={() => playClick()} className="text-primary font-black hover:text-accent-primary transition-colors">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
