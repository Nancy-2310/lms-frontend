// import { useState } from 'react'
import './App.css'

import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom';

import AboutUs from "./Pages/AboutUs";
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element = {<NotFound />} /> 
      </Routes>
      
    </>
  )
}

export default App
