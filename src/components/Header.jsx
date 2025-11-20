import { useMemo } from 'react'

function Header() {
  const year = useMemo(() => new Date().getFullYear(), [])
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="F1" className="w-8 h-8" />
          <h1 className="text-xl font-semibold text-slate-800">F1 Explorer</h1>
        </div>
        <p className="text-sm text-slate-600">Live data via Ergast • {year}</p>
      </div>
    </header>
  )
}

export default Header
