import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
        const AddAgence = () => {
        const [agence, setAgence] = useState({
            ag_nom: '',
            ag_adresse: '',
            ag_region: '',
            description: ''
        })
        const navigate = useNavigate()

        const handleChange = (e) =>{
            const {name, value} = e.target;
            setAgence({...agence, [name] : value})
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const response = await axios.post('http://localhost:5000/api/agence/add',agence, {
                    headers:{
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    navigate("/admin-dashboard/agences")
                    
                }
                
            } catch (error) {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
                
            }
        }
        

  return (
        <div className='max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md w-96'>
            <h2 className='mb-6 text-2xl font-bold'>Ajout Agence</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='ag_nom'
                    className='text-sm font-medium text-gray-700'
                    >Nom de l'agence</label>
                    <input type='text'
                    name='ag_nom'
                    onChange={handleChange}
                    placeholder="le nom de l'agence"
                    className='w-full p-2 mt-1 border-gray-300 rounded-md'/>
                </div>
                <div>
                    <label htmlFor='ag_adresse'
                     className='text-sm font-medium text-gray-700'
                    >Adresse de l'agence</label>
                    <input type='text'
                    name='ag_adresse'
                    onChange={handleChange}
                    placeholder="l'adresse de l'agence"
                    className='w-full p-2 mt-1 border-gray-300 rounded-md'/>
                </div>
                <div>
                    <label htmlFor='ag_region'
                      className='text-sm font-medium text-gray-700'
                    >Region de l'agence</label>
                    <input type='text'
                    name='ag_region'
                    onChange={handleChange}
                    placeholder="Region"
                    className='w-full p-2 mt-1 border-gray-300 rounded-md'/>
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea name='description'
                    onChange={handleChange}
                     placeholder="Description"
                    className='block w-full p-2 mt-1 border-gray-300 rounded-md'
                    ></textarea>
                </div>
                <button
                type='submit'
                className='w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded hover:bg-blue-700'
                >Ajouter</button>
            </form>
        </div>
  )
}

export default AddAgence