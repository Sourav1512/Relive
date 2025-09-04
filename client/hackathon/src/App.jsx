import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Donar from './components/dashboard/donar/Donar.jsx'
import ProfileUpdate from './components/dashboard/donar/ProfileUpdate.jsx'
import { DonarProvider } from './context/DonarContext'
import Patient from './components/dashboard/Patient/Patient.jsx'


function App() {
  

  return (
    <DonarProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/donar' element={<Donar/>}/>
        <Route path='/donar/update-profile' element={<ProfileUpdate/>}/>
        <Route path='/patient' element={<Patient/>}/>
        

      </Routes>
    </DonarProvider>
  )
}

export default App
