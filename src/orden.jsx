import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OrdenPage from './OrdenPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrdenPage />
  </StrictMode>,
)
