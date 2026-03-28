import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import VoiceBuddy from './VoiceBuddy.jsx'
import About from './About.jsx'
import Studio from './Studio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/voice-buddy" element={<VoiceBuddy />} />
        <Route path="/about" element={<About />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
