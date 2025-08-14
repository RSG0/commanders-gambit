import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainPage from './MainPage.jsx'
import SearchCommanderPage from './SearchCommanderPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MainPage /> */}
    <SearchCommanderPage/>
    {/* <App /> */}
  </StrictMode>,
)
