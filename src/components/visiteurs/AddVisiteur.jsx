import React, { useEffect, useRef, useState } from 'react'
import { FaImages } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam';



const AddVisiteur = () => {

      const [agences, setAgences] = useState([])
      const [formData,setFormData] = useState({})
      const [agence, setAgence] = useState({})
      const navigate = useNavigate()
      const webcamRef = React.useRef(null);

      const captureImage = () => {
          const imageSrc = webcamRef.current.getScreenshot();
          if (capturingRecto) {
            setRectoImage(imageSrc);
          } else {
            setVersoImage(imageSrc);
          }
        };
        const toggleCaptureSide = () => {
          setCapturingRecto(!capturingRecto);
        };     
  
      useEffect(() =>{
          const getAgences = async () => {
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
          <h2 className='mb-6 text-2xl font-bold'>Nouveau Visiteur</h2>
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
                      >Profile</label>
                 <div>
          {/* <h2>{capturingRecto ? 'Capturer Recto' : 'Capturer Verso'}</h2> */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="50%"
            
            videoConstraints={{
              facingMode: "environment"
            }}
          />
          <button type="button" onClick={captureImage}>
            {/* {capturingRecto ? 'Capturer Recto' : 'Capturer Verso'} */}
          </button>
          {/* {capturingRecto && rectoImage && (
            <div>
              <h3>Recto Image:</h3>
              <img src={rectoImage} alt="Recto" width="200" />
            </div>
          )}
          {!capturingRecto && versoImage && (
            <div>
              <h3>Verso Image:</h3>
              <img src={versoImage} alt="Verso" width="200" />
            </div>
          )} */}
        </div>

        <div>
          <button type="button" onClick={toggleCaptureSide}>
            {/* {capturingRecto ? 'Passer au verso' : 'Passer au recto'} */}
          </button>
        </div>

        <div></div>
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
  

export default AddVisiteur