import { useLocation } from 'react-router-dom'
import AppSidebar from '../Navigation/AppSidebar'

export default function AppLayout({ children }) {
  const location = useLocation()
  
  // Exclude AppLayout on these routes (e.g. they handle their own immersive UI)
  const isExcluded = ['/', '/login', '/signup', '/onboarding'].includes(location.pathname) || location.pathname.startsWith('/lesson')

  if (isExcluded) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</div>
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 relative aurora-bg">
      <AppSidebar />
      {/* 
        Main Content Area 
        Left margin matches sidebar width + padding for desktop.
      */}
      <main className="flex-1 w-full md:ml-64 md:pl-8 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-7xl mx-auto w-full pt-6 px-4">
          {children}
        </div>
      </main>
    </div>
  )
}
