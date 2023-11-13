import './App.css';

// import React from "react";
import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from "./Pages/AboutUs";
import Contact from './Pages/Contact';
import CourseDescription from './Pages/Course/CourseDescription';
import CreateCourse from './Pages/Course/CreateCourse';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Checkout from './Pages/Payment/Checkout';
import SignUp from './Pages/SignUp';
import EditProfile from './Pages/User/EditProfile';
import Profile from './Pages/User/Profile';
function App() {
  return (
    <>

    <Routes>
     
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/login" element={<Login />} />

      {/* Use the Route component within the Routes component for nested routes */}
      <Route
        path="/course/create"
        element={<RequireAuth allowedRoles={["ADMIN"]} />}
      >
        <Route index element={<CreateCourse />} />
      </Route>

      {/* Use the Route component within the Routes component for nested routes */}
      <Route
        path="/user/profile"
        element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}
      >
        <Route index element={<Profile />} />
      </Route>
      
      <Route
        path="/user/editprofile"
        element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}
      >
        <Route index element={<EditProfile />} />
      </Route>
      <Route
        path="/checkout"
        element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}
      >
        <Route index element={<Checkout />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
