import './App.css';
import './globals.css';

import { useState } from 'react';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';

function App() {
  const [count, setCount] = useState(0);

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
      <h1 className="mt-4 text-center text-3xl font-bold">Vite + React</h1>
      <div className="card mt-4 rounded-lg bg-white p-4 text-center shadow-md">
        <button
          className="rounded-xl border-2 border-blue-300 px-4 py-2 font-bold transition-colors hover:border-blue-700"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-4 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
