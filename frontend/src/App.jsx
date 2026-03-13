import { Routes, Route, Link } from "react-router"
import Home from './pages/HomePage'
import Create from './pages/CreatePage'

function App() {
  return (
    <div data-theme="cyberpunk" className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-6 border-b-2 border-b-slate-700">
        <Link to="/"><h1 className="text-xl font-bold">Habit Tracker</h1></Link>
        <Link to="/create"><button className="bg-blue-500 px-4 py-2 rounded">+ Add</button></Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  )
}

export default App