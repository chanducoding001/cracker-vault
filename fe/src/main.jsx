import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CrackersContextProvider from './app/CrackersContextProvider.jsx'
// import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrackersContextProvider>
      <App />
    </CrackersContextProvider>
  </StrictMode>,
)
