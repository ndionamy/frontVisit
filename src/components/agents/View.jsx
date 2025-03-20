import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const View = () => {
    const {id}= useParams()
    const [agent, setAgent] = useState(null)

    useEffect(() => {
        const fetchAgent = async () => {
          try {
    
            const response = await axios.get(
              `http://localhost:5000/api/agent/${id}`, 
              {
              headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              }
          })
          if(response.data.success){
            setAgent(response.data.agent)
          
             }
            
          } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
          } 
        }
         fetchAgent();
    },
    []);
  return (
    <>{ agent ? (
    <div className='max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md'>
    <h2 className='mb-8 text-2xl font-bold text-center'>View Agent</h2>
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
        
         <img width={40} src={`http://localhost:5000/${agent.userId.profileImage}`}
        className='border rounded-full w-72'/>
        </div>
        <div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Nom:</p>
                <p className='font-medium'>{agent.userId.nom}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Prenom:</p>
                <p className='font-medium'>{agent.userId.prenom}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Agent ID:</p>
                <p className='font-medium'>{agent.agentId}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Date de Naissance:</p>
                <p className='font-medium'>{new Date (agent.ddn).toLocaleDateString()}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Genre:</p>
                <p className='font-medium'>{agent.genre}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Agence:</p>
                <p className='font-medium'>{agent.agence.ag_nom}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Situation Matrimoniale:</p>
                <p className='font-medium'>{agent.maritalStatus}</p>
            </div>
            <div className='flex mb-5 space-x-3'>
                <p className='text-lg font-bold'>Email:</p>
                <p className='font-medium'>{agent.userId.email}</p>
            </div>
        </div>
    </div>
</div>  

): <div>Loading... </div>}</>
  )
}

export default View