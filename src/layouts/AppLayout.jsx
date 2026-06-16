import AppNavbar from '@/components/common/AppNavbar'
import Footer from '@/components/common/Footer';
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const AppLayout = ({role}) => {

  const adminRoutes = ['/trips', '/trips/add', '/trips/edit/:id', '/', '/dashboard', '/bookings','/contact-list'];
  const clientRoutes = ['/client/trips','/client/dashboard', '/client/bookings', '/client/blogs','/client/blogs/add'];

  const pathname = useLocation().pathname;


  if(role == 'admin' && !adminRoutes.some(route => pathname.startsWith(route))){
    return <div>Unauthorized Access!!</div>
  }
  if(role == 'user' && !clientRoutes.some(route => pathname.startsWith(route))){
    return <div>Unauthorized Access!!</div>
  }



  return (
    <>

        <AppNavbar />
        <Outlet />
        <Footer/>

    </>
  )
}

export default AppLayout