import Sidebar from "./components/sidebar/Sidebar"
import Charts from "./pages/Charts"
import Filter from "./pages/Filter"
import { Routes, Route } from "react-router-dom"

function App() {


  return (
    <div className="flex min-h-screen w-full gap-4">
      <div className="min-h-screen bg-violet-300 sticky h-full w-[15%] top-0">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path='/' element={<Charts />} />
          <Route path='/filter' element={<Filter />} />
        </Routes>
      </div>
    </div>

  )
}

export default App
