import axios from 'axios'
import React, { useEffect, useState } from 'react'



const VisiteursList = () => {

  const [visiteurs , setVisiteurs] = useState([])
  const [visLoading, setVisLoading] = useState(false)

  
  useEffect(() => {
    const fetchVisiteurs = async () => {
      setVisLoading(true)
      try {

        const response = await axios.get(
          'http://localhost:5000/api/agence', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
      })
      if(response.data.success){
        let sno= 1
        const data = await response.data.visiteurs.map((agen) =>(
          {
            _id: agen._id,
            sno: sno++,
            ag_nom: agen.ag_nom,
            ag_adresse: agen.ag_adresse,
            ag_region: agen.ag_region,
            
          }
        ))
        setVisiteurs(data);
      }
        
      } catch (error) {
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
      } finally{
        setVisLoading(false)
      }
     }
     fetchVisiteurs();
},[]);

  
  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'> Gestion des Visiteurs
        </h3>
      </div>
      <div className='flex items-center justify-between '>
        <input type="text" 
        placeholder='Recherche par Nom'
        className='px-4 py-0.5 border'
        />
      </div>
      
    </div>
  )
}

export default VisiteursList