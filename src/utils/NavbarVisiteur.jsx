import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import SummaryCard from '../components/dashboard/SummaryCard';



const NavbarVisiteur = () => {
    return (
      <nav className="p-6 bg-gradient-to-r from-[#01377D] to-green-800">
        <div className="container flex items-center justify-between mx-auto">
            <div className='flex items-center justify-between h-12 px-5'>
                <div></div>
            <img className='space-y-6 w-15 h-15'
          src="../../assets/douane.jpg" 
        />

          <a href="/" className="p-6 text-xl text-white">Douane Sénégalaise</a>
            </div>
       
          <ul className="flex space-x-6">
          <div className='flex items-center justify-center px-4 text-xl text-white' >
          <IoIosLogOut size={30} color="white" />
          <span>Déconnexion</span>

        </div>
          

          </ul>
        </div>
      </nav>
    );
  }
  
  export default NavbarVisiteur;