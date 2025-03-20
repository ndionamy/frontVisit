import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAgences } from '../../utils/AgentHelper'
import axios from 'axios'
const Edit = () => {

     const {id}= useParams()
     const [agent, setAgent] = useState({
        nom:'',
        prenom:'',
        genre:'',
        maritalStatus: '',
        designation:'',
        agence:''
     })
     const [agences, setAgences] = useState(null)

    const navigate = useNavigate()

     useEffect(() =>{
            const getAgences = async () => {
            const agences = await fetchAgences();
            setAgences(agences)
    
            }
            getAgences();
        },[]);
        
    useEffect(() =>{
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
               const agent= response.data.agent
              setAgent(prev => ({...prev, nom: agent.userId.nom,  
                prenom: agent.userId.prenom, 
                // email: agent.userId.email,  
                maritalStatus: agent.maritalStatus,
                designation: agent.designation,
                agence: agent.agence
                
               }))
            
               }
              
            } catch (error) {
              if(error.response && !error.response.data.success){
                  alert(error.response.data.error)
              }
            } 
          }
           fetchAgent();
    },[]);
    
    const handleChange = (e)  =>{
         const {name, value} = e.target;
      
            setAgent((prevData) => ({...prevData, [name] : value}))
    
    }

    const handleSubmit = async (e) => {
        e.preventDefault();            
        
        
        try {
                const response = await axios.put(
                  `http://localhost:5000/api/agent/${id}`, 
                
               agent, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/agents")
                
            }
            
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
            
        }
    }
    

  return (
    <>{agences && agent ? (
   
        <div className='max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md w-96'>
        <h2 className='mb-6 text-2xl font-bold'>Modifier Agent</h2>
        
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                    <label 
                    className='block text-sm font-medium text-gray-700'>
                        Nom</label>
                    <input type='text'
                    value={agent.nom}
                    name='nom'
                    onChange={handleChange}
                    placeholder="Entrer le nom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Prenom</label>
                    <input type='text'
                    value={agent.prenom}
                    name='prenom'
                    onChange={handleChange}
                    placeholder="Entrer le prenom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                {/* <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Email</label>
                    <input type='email'
                    value={agent.email}
                    name='email'
                    onChange={handleChange}
                    placeholder="Entrer l'email"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div> */}
                {/* <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Date de Naissance</label>
                    <input type='date'
                    value={agent.ddn}
                    name='ddn'
                    onChange={handleChange}
                    placeholder="Date de Naissance"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div> */}
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Genre</label>
                    <select
                    name='genre'
                    value={agent.genre}
                    onChange={handleChange}
                    placeholder="Entrer le prenom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required>
                        <option value="">Select Gender</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                </div>
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Status Matrimonial</label>
                    <select
                    name='maritalStatus'
                    value={agent.maritalStatus}
                    onChange={handleChange}
                    placeholder="Status Matrimonial"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required>
                        <option value="">Select Status</option>
                        <option value="celibataire">Célibatare</option>
                        <option value="marie">Marié</option>
                    </select>
                </div>
                <div>
                    <label 
                    className='block text-sm font-medium text-gray-700'>
                        Désignation</label>
                    <input type='text'
                    value={agent.designation}
                    name='designation'
                    onChange={handleChange}
                    placeholder="Désignation"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>

                {/* <div>
                    <label 
                    className='text-sm font-medium text-gray-700'
                    >Role</label>
                    <select 
                    name='role'
                    onChange={handleChange}
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                    </select>
                </div> */}
            </div>
            <div className='cols-span-2'>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Agence</label>
                    <select
                    name='agence'
                    value={agent.agence}
                    onChange={handleChange}
                    placeholder="Agence"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required>
                        <option value="">Select Agence</option>
                        {agences.map(agen => (
                            <option key={agen._id} value={agen._id}>{agen.ag_nom}</option>
                        ))}
                </select>
            </div>
            <button
            type='submit'
            className='w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded hover:bg-blue-700'
            >Ajouter</button>
        </form>
    </div>
    ): <div>Loading... </div>}</>
  
    )
}

export default Edit