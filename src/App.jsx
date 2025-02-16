import { useState } from 'react'
import Register from './components/Register'
import './App.css'
import { Routes, Route } from 'react-router'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} ></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>
    </>
  )
}

export default App
