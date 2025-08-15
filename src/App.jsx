import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Route, BrowserRouter, Routes} from "react-router-dom" 
import './App.css'
import RandomizeCommandersPage from '../src/Pages/RandomizeCommandersPage.jsx'
import MainPage from "../src/Pages/MainPage.jsx"
import SearchCommanderPage from '../src/Pages/SearchCommanderPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<MainPage/>} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/randomize" element={<RandomizeCommandersPage />} />
      <Route path="/search" element={<SearchCommanderPage />} />
    </Routes>  
    </BrowserRouter>
  
    {/* <MainPage /> */}
    {/* <SearchCommanderPage/> */}
    {/* <RandomizeCommandersPage/> */}
  </StrictMode>,
)
