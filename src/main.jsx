import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PortfolioV3 from './PortfolioV3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {window.location.pathname === '/v2' ? <App /> : <PortfolioV3 />}
  </StrictMode>,
)
