import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home/Home.tsx'
import ChangePoint from './components/ChangePoint/ChangePoint.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
    <ChangePoint />
  </StrictMode>,
)
