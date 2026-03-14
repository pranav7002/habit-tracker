import { useState } from 'react'
import { useNavigate } from "react-router"

const Create = () => {
    const nav = useNavigate()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    var [freq, setFreq] = useState("daily")

    const submit = async (e) => {
        e.preventDefault()
        if (!title) return

        const apiUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
        await fetch(`${apiUrl}/api/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description: desc, frequency: freq })
        })
        nav("/")
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">New Habit</h2>
            <form onSubmit={submit} className="flex flex-col gap-4">
                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="input input-bordered"
                />
                <textarea
                    placeholder="desc..."
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className="textarea textarea-bordered"
                />
                <select value={freq} onChange={e => setFreq(e.target.value)} className="select select-bordered">
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                </select>
                <button type="submit" className="bg-blue-500 py-2 rounded mt-2">Create</button>
            </form>
        </div>
    )
}

export default Create;
