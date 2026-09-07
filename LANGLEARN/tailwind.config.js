/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // enable dark mode by class if needed
  theme: {
    extend: {
      colors: {
        'soft-bg': '#F4F7FC',
        'soft-card': '#FFFFFF',
        'pastel-blue': '#E5EFFF',
        'pastel-purple': '#F0E6FF',
        'pastel-green': '#E6F8F0',
        'pastel-orange': '#FFF0E5',
        'pastel-pink': '#FFE5F0',
        'brand-primary': '#5B66F6',
        'brand-primary-light': '#8A92FF',
        'brand-secondary': '#FF9E66',
        'brand-success': '#4CD964',
        'brand-error': '#FF4C4C',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(91, 102, 246, 0.08)',
        'soft-lg': '0 20px 40px rgba(91, 102, 246, 0.12)',
        'clay': 'inset -4px -4px 10px rgba(0,0,0,0.05), inset 4px 4px 10px rgba(255,255,255,0.8), 0 10px 20px rgba(91, 102, 246, 0.1)',
        'clay-active': 'inset 4px 4px 10px rgba(0,0,0,0.05), inset -4px -4px 10px rgba(255,255,255,0.8)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
