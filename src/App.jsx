// import { useState } from 'react'
import './App.css'

import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from "./Pages/AboutUs";
import Contact from './Pages/Contact';
import CourseDescription from './Pages/Course/CourseDescription';
// import CourseList from './Pages/Course/CourseList';
import CreateCourse from './Pages/Course/CreateCourse';
import Denied from './Pages/Denied';
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/login" element={<Login />} />
        
        <Route element = {<RequireAuth allowedRoles={["ADMIN"]} />} >
        <Route path="/course/create" element={<CreateCourse/>} />
        </Route>
        <Route path="*" element = {<NotFound />} /> 
      </Routes>
      
    </>
  )
}

export default App;
