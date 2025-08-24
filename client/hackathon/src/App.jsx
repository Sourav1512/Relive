import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
