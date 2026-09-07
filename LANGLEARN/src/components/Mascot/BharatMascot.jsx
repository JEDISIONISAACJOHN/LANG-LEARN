import { motion } from 'framer-motion'

export default function BharatMascot({
  size = 64,
  mood = 'happy',
  className = '',
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 600 120"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif" fontWeight="900" fontSize="85" fill="#1E293B">
          LANG<tspan fill="#4F46E5">LEARN</tspan>
        </text>
      </svg>
    </motion.div>
  )
}
