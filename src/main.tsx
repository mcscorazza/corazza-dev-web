import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import { PostPage } from './pages/Post'
import { TrailPage } from './pages/Trail';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <header className="py-6 px-6 border-b border-slate-900 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-250 mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-black text-slate-50 tracking-tighter">
            CORAZZA<span className="text-blue-600">.DEV</span>
          </Link>
        </div>
      </header>

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/post/:trailSlug/:lineSlug/:postSlug" element={<PostPage />} />
          <Route path="/trail/:slug" element={<TrailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
)