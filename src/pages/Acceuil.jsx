import React from "react";
import NavbarVisiteur from "../utils/NavbarVisiteur";

import { Outlet } from 'react-router-dom'


const Accueil = () => {


    return  (
    <div className='flex-1 h-screen bg-gray-100'> 
      <NavbarVisiteur />

      <Outlet/>
    </div>)
  }
  
  export default Accueil;