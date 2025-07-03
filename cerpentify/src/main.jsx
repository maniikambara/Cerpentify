import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BackgroundPattern from './Component/Background.jsx'
import Card from './Component/Whitecard.jsx'
import Navbar from './Component/Navbar.jsx'
import Dashboard from './Pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Dashboard />
  </StrictMode>,
)
