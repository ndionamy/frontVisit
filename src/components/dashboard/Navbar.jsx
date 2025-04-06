import React from 'react'
import { useAuth } from '../../context/authContext'
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {user, logout}  = useAuth()

  return (
    <div className='flex items-center justify-between h-12 px-5 text-black '>
      {/* bg-gradient-to-r from-[#01377D] to-green-800 */}
        <p className='text-xl'>Bienvenue {user.nom} </p>
        <Link className='flex px-4 py-2 text-center text-white bg-red-500 rounded flex-items' onClick={logout}><IoIosLogOut size={25} color="white" />
                  <span>Déconnexion</span></Link>

    </div>
  )
}

export default Navbar