// import { useState } from 'react'
import './App.css'

import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
      </Routes>
    </>
  )
}

export default App
