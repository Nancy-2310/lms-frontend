// import { useState } from 'react'
import './App.css'

import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom';

import AboutUs from "./Pages/AboutUs";
import HomePage from './Pages/HomePage';
import NotFound from './Pages/NotFound';
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element = {<NotFound />}> </Route>
      </Routes>
      
    </>
  )
}

export default App
