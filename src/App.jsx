import React, {useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import useAuth from './Hooks/useAuth'
import { jwtDecode } from 'jwt-decode'
import AppLayout from './layouts/AppLayout'
import AddTrip from './pages/trip/AddTrip'
import Bookings from './pages/bookings/bookings'
import EditTrip from './pages/trip/EditTrip'
import Trips from './pages/trip/Trips'
import ViewTrips from './pages/clients/ViewTrips'
import Mybookings from './pages/clients/Mybookings'

const App = () => {

const { token, logout } = useAuth();


  const ProtectedRoutes = () => {
    try {
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken?.userId;


      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000;
        if (currentTime > decodedToken?.exp) {
          logout();
          return <Navigate to="/login" />;
        }
      }


      if (!token || !userId) {
        logout();
        return <Navigate to="/login" />;
      }


      return <AppLayout role={decodedToken.role} />;
    } catch (err) {
      console.error(err);
      logout();
      return <Navigate to="/login" />;
    }
  };


  return (
   <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login/>}/>
          


          <Route element={<ProtectedRoutes/>} >

          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/trips/add" element={<AddTrip/>}/>
          <Route path="/trips/edit/:id" element={<EditTrip/>}/>
          <Route path="/trips" element={<Trips/>}/>
          <Route path="/bookings" element={<Bookings />}/>

          <Route path='/client/trips' element={<ViewTrips/>}/>
          <Route path='/client/bookings' element={<Mybookings/>}/>

          </Route>

          <Route path="*" element={<div>Not Found</div>} />
          
      </Routes>
   </BrowserRouter>
  )
}

export default App