import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const {user } = useAuth()

  return (
<div className='flex'>
  <AdminSidebar
  />
  <div className='flex-1 h-screen ml-64 bg-gray-100'> 
  <Navbar/>
  
  <Outlet/>
  </div>
</div>

  )
}

export default AdminDashboard