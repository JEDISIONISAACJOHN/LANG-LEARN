/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // enable dark mode by class
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        surface: 'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        'surface-elevated': 'var(--surface-elevated)',
        
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        
        accent: 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)'
        },
        
        border: 'var(--border-subtle)',
        'border-light': 'rgba(255, 255, 255, 0.04)'
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'elevated': 'var(--shadow-elevated)',
        'glow': 'var(--glow-primary)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Malayalam', 'Noto Sans Kannada', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
