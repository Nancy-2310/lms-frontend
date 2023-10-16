// import { useState } from 'react'
import './App.css'

import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom';

import AboutUs from "./Pages/AboutUs";
import HomePage from './Pages/HomePage';
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  )
}

export default App
