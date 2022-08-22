import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Home from './pages/Home'

function App() {
  const user = localStorage.getItem("token")
  const [username, setUsername] = useState('')

  return (
   <Routes>
    {user && <Route path="/" exact element={<Home username={username} />} />}
    <Route path='/signup' exact element={<Signup />} />
    <Route path='/login' exact element={<Login setUsername={setUsername}/>} />
    <Route path='/' exact element={<Navigate replace to='/login' />} />
   </Routes>
  )
}

export default App
