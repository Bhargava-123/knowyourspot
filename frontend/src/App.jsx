import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  About  from '../src/pages/About'
import { Routes,Route,Link } from 'react-router-dom'
import Navbar from '../src/pages/Navbar'
import Home from '../src/pages/Home'
import Login from './pages/Login'
import ArtBoard from './pages/ArtBoard'
import { useEffect } from 'react'
import Statistics from './pages/Statistics'
function App() {
  
  return (
    <Routes>
      <Route path="/home/*" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/home/login" element={<Login/>} />
      <Route path = "/home/artboard" element = {<ArtBoard />} />
      <Route path="/home/statistics" element = { <Statistics/ >} />
    </Routes>

  )
}

export default App
