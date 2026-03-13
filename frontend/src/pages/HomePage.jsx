import { useState, useEffect } from "react"

export default function Home() {
    let [habits, setHabits] = useState([])
    const [stats, setStats] = useState({ totalHabits: 0, completedHabits: 0 })

    function loadData() {
        fetch("http://localhost:3001/api/habits").then(r => r.json()).then(setHabits)
        fetch("http://localhost:3001/api/habits/stats").then(res => res.json()).then(data => setStats(data))
    }

    useEffect(() => {
        loadData()
    }, [])

    const markDone = async (id) => {
        await fetch(`http://localhost:3001/api/habits/${id}/complete`, { method: "POST" })
        loadData()
    }

    const deleteHabit = async (id) => {
        await fetch(`http://localhost:3001/api/habits/${id}`, { method: "DELETE" })
        loadData()
    }

    return (
        <div className="p-6">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '20px' }}>
                <div className="bg-gray-800 p-4 flex-1 rounded">
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-2xl font-bold">{stats.totalHabits}</p>
                </div>
                <div className="bg-gray-800 p-4 flex-1 rounded">
                    <p className="text-gray-400 text-sm">Done Today</p>
                    <p className="text-2xl font-bold">{stats.completedHabits}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {habits.map(h => {
                    let isDone = false
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)

                    h.completedDates?.forEach(d => {
                        let date = new Date(d)
                        date.setHours(0, 0, 0, 0)
                        if (h.frequency === 'daily' && date.getTime() == today.getTime()) isDone = true
                        if (h.frequency == 'weekly' && today.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) isDone = true
                    })

                    return (
                        <div key={h._id} className="card bg-gray-800 p-4">
                            <h2 className="text-xl font-bold">{h.title}</h2>
                            <p className="text-gray-400 text-sm">{h.description}</p>
                            <span className="text-xs bg-gray-700 rounded px-2 py-1 w-max mt-2 block">{h.frequency}</span>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => markDone(h._id)}
                                    className={`px-3 py-1 rounded text-sm ${isDone ? 'bg-green-800 text-green-300' : 'bg-green-600'}`}
                                    disabled={isDone}>
                                    {isDone ? '✓' : 'Done'}
                                </button>
                                <button onClick={() => deleteHabit(h._id)} className="px-3 py-1 rounded text-sm bg-red-600">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
