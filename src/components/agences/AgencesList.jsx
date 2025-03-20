import React, { useEffect, useState } from 'react'
import {Link }  from 'react-router-dom';
import DataTable from 'react-data-table-component';
import  {AgenceButtons, colums} from "../../utils/AgenceHelper";
import axios from "axios"


const AgencesList = () => {

  const [agences , setAgences] = useState([])
  const [agLoading, setAgLoading] = useState(false)
  const [filteredAgences, setfilteredAgences] = useState([])

  const onAgenceDelete = async (id) => {
  const  data =  agences.filter(agen => agen._id !== id)
  setAgences(data)
 }
  useEffect(() => {
    const fetchAgences = async () => {
      setAgLoading(true)
      try {

        const response = await axios.get(
          'http://localhost:5000/api/agence', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
      })
      if(response.data.success){
        let sno= 1
        const data = await response.data.agences.map((agen) =>(
          {
            _id: agen._id,
            sno: sno++,
            ag_nom: agen.ag_nom,
            ag_adresse: agen.ag_adresse,
            ag_region: agen.ag_region,
            action :( <AgenceButtons _id={agen._id} onAgenceDelete={onAgenceDelete}/>)
            
          }
        ))
        setAgences(data);
        setfilteredAgences(data)
      }
        
      } catch (error) {
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
      } finally{
        setAgLoading(false)
      }
     }
     fetchAgences();
},[]);
  
const filterAgences = (e) => {
  const records = agences.filter((agen) => 
  agen.ag_nom.toLowerCase().includes(e.target.value.toLowerCase()))
  setfilteredAgences (records)

  
}
  return (
    <>{agLoading? <div>Loading ...</div> : 
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'> Gestion des Agences
        </h3>
      </div>
      <div className='flex items-center justify-between '>
        <input type="text" 
        placeholder='Recherche par Nom'
         className='px-4 py-0.5 border'
         onChange={filterAgences}/>
        <Link to="/admin-dashboard/add-agence" className='px-4 py-1 text-white bg-blue-600 rounded'
        >Ajouter une agence
        </Link>
      </div>
      <div className='mt-5'>
        <DataTable
        columns={colums} data = {filteredAgences} pagination/>
      </div>
    </div>
    }</>
  )
}

export default AgencesList