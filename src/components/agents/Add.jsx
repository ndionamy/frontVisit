import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAgences } from '../../utils/AgentHelper'

const Add = () => {

    const [agences, setAgences] = useState([])
    const [formData,setFormData] = useState({})
    const [agence, setAgence] = useState({})
    const navigate = useNavigate()
    

    useEffect(() =>{
        const getAgences = async () => {
        const agences = await fetchAgences();
        setAgences(agences)

        }
        getAgences();
    },[]);
    
    const handleChange = (e)  =>{
         const {name, value, files} = e.target;
         if (name=="image") {
            setFormData((prevData) => ({...prevData, [name] : files[0]}))
         }
         else {
            setFormData((prevData) => ({...prevData, [name] : value}))
         }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObjet = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObjet.append(key, formData[key])
            
        })
        
        try {
            const response = await axios.post('http://localhost:5000/api/agent/add',formDataObjet, {
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
    <div className='max-w-4xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md'>
        <h2 className='mb-6 text-2xl font-bold'>Nouveau Agent</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                    <label 
                    className='block text-sm font-medium text-gray-700'>
                        Nom</label>
                    <input type='text'
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
                    name='prenom'
                    onChange={handleChange}
                    placeholder="Entrer le prenom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Email</label>
                    <input type='email'
                    name='email'
                    onChange={handleChange}
                    placeholder="Entrer l'email"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                <div>
                    <label 
                    className='block text-sm font-medium text-gray-700'>
                        AgentId</label>
                    <input type='text'
                    name='agentId'
                    onChange={handleChange}
                    placeholder="Agent ID"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Date de Naissance</label>
                    <input type='date'
                    name='ddn'
                    onChange={handleChange}
                    placeholder="Date de Naissance"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Genre</label>
                    <select
                    name='genre'
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
                    name='designation'
                    onChange={handleChange}
                    placeholder="Désignation"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required/>
                </div>
                <div>
                    <label
                    className='block text-sm font-medium text-gray-700'>
                        Agence</label>
                    <select
                    name='agence'
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
                <div>
                    <label
                    className='text-sm font-medium text-gray-700'
                    >Password</label>
                    <input 
                    type='password'
                    name='password'
                    onChange={handleChange}
                    placeholder="*******"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'/>
                </div>
                <div>
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
                </div>
                <div>
                    <label
                    className='text-sm font-medium text-gray-700'
                    >Profile</label>
                    <input type='file'
                    name='image'
                    accept='image/*'
                    onChange={handleChange}
                    placeholder=" Upload Image"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'/>
                </div>
            </div>
            <button
            type='submit'
            className='w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded hover:bg-blue-700'
            >Ajouter</button>
        </form>
    </div>
)
}

export default Add