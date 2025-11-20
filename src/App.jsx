import { useState } from 'react'
import Header from './components/Header'
import Seasons from './components/Seasons'
import SeasonDetails from './components/SeasonDetails'

function App() {
  const [season, setSeason] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Explore F1 Seasons</h2>
          <p className="text-blue-200/80 mb-4">Pick a season to see drivers, teams and race calendar.</p>
          <div className="bg-slate-900/60 rounded-2xl border border-blue-500/20 p-4">
            <Seasons onSelect={setSeason} />
          </div>
        </section>

        {season && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-semibold text-white">Season {season}</h3>
              <button onClick={() => setSeason(null)} className="text-sm px-3 py-1.5 rounded-md bg-slate-800/50 hover:bg-slate-800 border border-blue-500/20">Change</button>
            </div>
            <div className="bg-slate-900/60 rounded-2xl border border-blue-500/20 p-4">
              <SeasonDetails season={season} />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
