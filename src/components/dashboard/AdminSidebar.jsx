import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaTachometerAlt, FaUsers, FaBuilding, FaCogs, FaChartBar, FaUser} from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 w-64 h-screen space-y-2 text-white bg-gray-700'>
      <div className='flex items-center justify-center h-12 bg-blue-600'>
        <h3 className='text-center tect-2xl font-pacific'>IVISIT</h3>
      </div>
      <div>
        <NavLink to="/admin-dashboard" 
        className={({isActive}) => `${isActive ? "bg-blue-400 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        end >
          <FaTachometerAlt/>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/agents" className={({isActive}) => `${isActive ? "bg-blue-400 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaUser/>
          <span>Agents</span>
        </NavLink>
        <NavLink to="/admin-dashboard/agences"className={({isActive}) => `${isActive ? "bg-blue-400 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`
      }>
          <FaBuilding/>
          <span>Agences</span>
        </NavLink>
        <NavLink to="/admin-dashboard/visiteurs"className={({isActive}) => `${isActive ? "bg-blue-400 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaUsers/>
          <span>Visiteurs</span>
        </NavLink>
        <NavLink to="/admin-dashboard/statistiques" className={({isActive}) => `${isActive ? "bg-blue-400 " : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaChartBar/>
          <span>Statisques</span>
        </NavLink>
        <NavLink to="/admin-dashboard/settings" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
        <FaCogs/>
          <span>Paramétres</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar