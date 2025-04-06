import React from 'react'
import { IoMdPersonAdd ,IoMdCheckboxOutline} from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ButtonAcc = () => {
    const navigate = useNavigate()

  return (
    <div>
    
    <div className="flex flex-col items-center justify-center p-10 space-y-6 gray-100">
    <h2 className='text-4xl text-[#01377D]'>Systéme d'enregistrement des Visiteurs IVISIT
    </h2> 
    <h4 className="text-gray-500">Bonjour et bienvenue dans le systéme de gestion des Douanes Sénégalaise</h4>  
    <div className="flex justify-between gap-6 from-90% to-gray-100 to-90% space-y-6">
    <div className="w-1/2 p-6 text-gray-400 bg-gray-100 rounded-lg shadow-lg w-70">
    <button type="button" class="text-white bg-[#01377D] hover:bg-[#01377D] font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-[#01377D]-600 " 
    onClick={()=> navigate(`/acceuil/add-visiteur`)}><IoMdPersonAdd size={60} />
    </button>         
    <p>Enregistrer un nouveau visiteur.</p>
    </div>
    <div className="w-1/2 p-6 text-gray-400 bg-gray-100 rounded-lg shadow-lg h-39 w-70">
    <button type="button" class="text-white bg-[#01377D] hover:bg-[#01377D] font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-[#01377D]-600 "><IoMdCheckboxOutline size={60} /></button>
    <p>Terminer une Visite.</p>
</div>
    </div>
  </div>
  </div>
  )
}

export default ButtonAcc