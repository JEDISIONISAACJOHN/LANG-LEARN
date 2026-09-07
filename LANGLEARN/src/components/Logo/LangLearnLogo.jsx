import React from 'react'

export default function LangLearnLogo({ size = 'medium', showText = true, className = '' }) {
  const sizeMap = {
    small: { text: 'text-lg', sub: 'text-[10px]' },
    medium: { text: 'text-2xl', sub: 'text-[11px]' },
    large: { text: 'text-4xl', sub: 'text-xs' },
  }

  const currentSize = sizeMap[size] || sizeMap.medium

  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer ${className}`}>
      {/* Brand Typography Only */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={`font-black tracking-tight ${currentSize.text} text-slate-800 dark:text-white leading-none font-heading`}>
              LANG<span className="text-indigo-600 dark:text-indigo-400">LEARN</span>
            </span>
          </div>
          <span className={`font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ${currentSize.sub} mt-1`}>
            Learn Indian Languages
          </span>
        </div>
      )}
    </div>
  )
}
