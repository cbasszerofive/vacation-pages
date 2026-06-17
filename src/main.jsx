import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Berlin from './Berlin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/vacation-pages">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/berlin" element={<Berlin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
