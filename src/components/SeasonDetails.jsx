import { useEffect, useState } from 'react'

function SeasonDetails({ season }) {
  const [drivers, setDrivers] = useState([])
  const [constructors, setConstructors] = useState([])
  const [races, setRaces] = useState([])
  const [tab, setTab] = useState('drivers')

  useEffect(() => {
    if (!season) return
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const load = async () => {
      const [d, c, r] = await Promise.all([
        fetch(`${baseUrl}/api/${season}/drivers`).then(r => r.json()),
        fetch(`${baseUrl}/api/${season}/constructors`).then(r => r.json()),
        fetch(`${baseUrl}/api/${season}/races`).then(r => r.json()),
      ])
      setDrivers(d.items || [])
      setConstructors(c.items || [])
      setRaces(r.items || [])
    }
    load()
  }, [season])

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        {['drivers','constructors','races'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 rounded-lg border transition ${tab===t? 'bg-blue-600 text-white border-blue-600':'bg-slate-800/50 text-blue-100 border-blue-500/20 hover:bg-slate-800'}`}>
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'drivers' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {drivers.map((d) => (
            <div key={d.driverId} className="p-4 rounded-xl bg-slate-800/50 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{d.givenName} {d.familyName}</p>
                  <p className="text-blue-300/70 text-sm">{d.code || '—'} • {d.nationality}</p>
                </div>
                <FavoriteDriverButton d={d} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'constructors' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {constructors.map((c) => (
            <div key={c.constructorId} className="p-4 rounded-xl bg-slate-800/50 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{c.name}</p>
                  <p className="text-blue-300/70 text-sm">{c.nationality}</p>
                </div>
                <FavoriteConstructorButton c={c} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'races' && (
        <div className="space-y-3">
          {races.map((r) => (
            <div key={r.round} className="p-4 rounded-xl bg-slate-800/50 border border-blue-500/20">
              <p className="text-white font-semibold">Round {r.round}: {r.raceName}</p>
              <p className="text-blue-300/70 text-sm">{r.Circuit?.circuitName} • {new Date(r.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FavoriteDriverButton({ d }) {
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const save = async () => {
    setSaving(true)
    try {
      await fetch(`${baseUrl}/api/favorites/drivers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver_id: d.driverId,
          code: d.code,
          given_name: d.givenName,
          family_name: d.familyName,
          nationality: d.nationality,
        })
      })
      setDone(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <button disabled={saving || done} onClick={save} className={`px-3 py-1.5 rounded-md text-sm border transition ${done? 'bg-emerald-600 text-white border-emerald-600':'bg-slate-700 text-blue-100 border-blue-500/20 hover:bg-slate-600'}`}>
      {done ? 'Saved' : (saving ? 'Saving...' : 'Save')}
    </button>
  )
}

function FavoriteConstructorButton({ c }) {
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const save = async () => {
    setSaving(true)
    try {
      await fetch(`${baseUrl}/api/favorites/constructors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          constructor_id: c.constructorId,
          name: c.name,
          nationality: c.nationality,
        })
      })
      setDone(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <button disabled={saving || done} onClick={save} className={`px-3 py-1.5 rounded-md text-sm border transition ${done? 'bg-emerald-600 text-white border-emerald-600':'bg-slate-700 text-blue-100 border-blue-500/20 hover:bg-slate-600'}`}>
      {done ? 'Saved' : (saving ? 'Saving...' : 'Save')}
    </button>
  )
}

export default SeasonDetails
