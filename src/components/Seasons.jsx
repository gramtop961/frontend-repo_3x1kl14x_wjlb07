import { useEffect, useState } from 'react'

function Seasons({ onSelect }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSeasons = async () => {
      setLoading(true)
      setError('')
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/seasons?limit=80`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setError('Failed to load seasons')
      } finally {
        setLoading(false)
      }
    }
    fetchSeasons()
  }, [])

  if (loading) return <div className="p-4">Loading seasons...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {items.map((s) => (
        <button
          key={s.season}
          onClick={() => onSelect(s.season)}
          className="px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-blue-100 border border-blue-500/20 transition"
        >
          {s.season}
        </button>
      ))}
    </div>
  )
}

export default Seasons
