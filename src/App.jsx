import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="font-bold text-center justify-center items-center">Commander's Gambit</p>
    <div className="flex justify-center items-center bg-amber-200">
      <div className="bg-red-500 w-2 h-2"></div>
      <div className="bg-green-500 w-2 h-2 mx-1"></div>
      <div className="bg-blue-500 w-2 h-2"></div>
      </div>
    </>
  )
}

export default App
