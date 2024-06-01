import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './globals.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center space-x-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="w-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-20" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold text-center mt-4">Vite + React</h1>
      <div className="card p-4 bg-white shadow-md rounded-lg text-center mt-4">
        <button
          className="font-bold py-2 px-4 rounded-xl border-2 border-blue-300 hover:border-blue-700 transition-colors"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center mt-4">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App