import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Route, BrowserRouter, Routes} from "react-router-dom" 
import './style/App.css'
import MainPage from './Pages/MainPage.jsx'
import SearchCommanderPage from './Pages/SearchCommanderPage.jsx'
import RandomizeCommandersPage from './Pages/RandomizeCommandersPage.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<MainPage/>} />
      <Route path="/home" element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/randomize" element={<RandomizeCommandersPage />} />
      <Route path="/search" element={<SearchCommanderPage />} />
    </Routes>  
    </BrowserRouter>
  
    {/* <MainPage /> */}
    {/* <SearchCommanderPage/> */}
    {/* <RandomizeCommandersPage/> */}
  </StrictMode>,
)
