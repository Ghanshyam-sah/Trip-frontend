import AppNavbar from '@/components/common/AppNavbar'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const AppLayout = ({role}) => {

  const adminRoutes = ['/trips', '/trips/add', '/trips/edit/:id', '/', '/dashboard', '/bookings',];
  const clientRoutes = ['/client/trips','/client/dashboard', '/client/bookings'];

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

    </>
  )
}

export default AppLayout