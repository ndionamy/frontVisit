import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user}  = useAuth()

  return (
    <div className='flex items-center justify-between h-12 px-5 text-white bg-blue-600'>
        <p>Bienvenue {user.nom} </p>
        <button className='px-4 py-1 bg-blue-700 hover:bg-blue-800'>Logout</button>

    </div>
  )
}

export default Navbar