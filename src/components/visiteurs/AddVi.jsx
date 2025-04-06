import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import Cards from 'react-credit-cards';
import MaskedInput from 'react-input-mask';
import 'react-credit-cards/es/styles-compiled.css';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slider';
import "../../App.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Importer les icônes
import { fetchAgents } from '../../utils/VisiteurHelper';
const AddVi = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Informations personnelles",
    "Type de Document",
    "Scanner carte d'identité (recto)",
    "Scanner carte d'identité (verso)",
    "Nom de la personne à Visiter",
     "Résumé",
  ];
  const [agent, setAgent] = useState({})
  const navigate = useNavigate()
      const [agents, setAgents] = useState([])

  useEffect(() =>{
      const getAgents = async () => {
      const agents = await fetchAgents();
      setAgents(agents)

      }
      getAgents();
  },[]);
  
  // États pour chaque section du formulaire
     const [formData,setFormData] = useState({})

 
  const [recto, setRecto] = useState(null);
  const [verso, setVerso] = useState(null);
  const webcamRef = useRef(null);

  const captureImage = (setImage) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };
    // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };
  // Progression de la barre avec trait (trait de progression)
  const progressPercentage = ((step + 1) / steps.length) * 100;
  
     // Fonction pour revenir à l'étape précédente
     const prevStep = () => {
      if (step > 0) {
        setStep(step - 1);
      }
    };
      // Gestion des changements dans les champs de formulaire
  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name=="imageVerso" && name=="imageRecto")
     {
       setFormData((prevData) => ({...prevData, [name] : files[0]}))
    }
    else {
       setFormData((prevData) => ({...prevData, [name] : value}))
    }
  };
  // Fonction ajout visiteur
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObjet = new FormData()
    Object.keys(formData).forEach((key) => {
        formDataObjet.append(key, formData[key])
        
    })
    
    try {
        const response = await axios.post('http://localhost:5000/api/visiteur/add',formDataObjet, {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            navigate("/acceuil/visisteur-attente")
            
        }
        
    } catch (error) {
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
        
    }
}
      // Étape 1 : Informations personnelles
      const step1 = (
        <div>
      <h2>{steps[0]}</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
          <label 
                    className='block text-sm font-medium text-gray-700'>
                        Nom</label>
                    <input type='text'
                    name='nom'
                    placeholder="Entrer le nom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required
            onChange={handleChange}
          />
          </div>
          <div>
          <label 
                    className='block text-sm font-medium text-gray-700'>
                        Prénom</label>
                    <input type='text'
                    name='prenom'
                    placeholder="Entrer le prénom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required
            onChange={handleChange}
          />
          </div>
          <div>
          <label 
                    className='block text-sm font-medium text-gray-700'>
                        Tel</label>
                    <input type='text'
                    name='tel'
                    placeholder="Entrer votre nom"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required
            onChange={handleChange}
          />
          </div>
          <div>
             <label
                    className='block text-sm font-medium text-gray-700'>
                        Email</label>
                    <input type='email'
                    name='email'
                    placeholder="Entrer l'email"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
          onChange={handleChange}
        />
        </div>
        <div>
             <label
                    className='block text-sm font-medium text-gray-700'>
                        Adresse</label>
                    <input type='adresse'
                    name='adresse'
                    placeholder="Entrer votre adresse"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
          onChange={handleChange}
        />
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
                    {/* <div className="radio">
                    <label>
            <input type="radio" value="option1" checked={true} />
            Option 1
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option2" />
            Option 2
          </label>
        </div> */}
                </div>
        </div>
      </div>
    );
     // Étape 2: Choix de l'identifant
     const step2 = (
      
      <div className='p-6 px-2 shadow'>
              <h2>{steps[1]}</h2>
        <div className='grid gap-2 py-2 md:grid-cols-3'>
        <div className="w-1/2 p-6 text-gray-400 bg-gray-100 rounded-lg shadow-lg w-55 hover:bg-gradient-to-r from-[#01377D] to-green-800 hover:text-white">
        <input  class=" hover:text-white text-center inline-flex items-center me-2  " value="Carte d'identité" name='cni'
         />
          <p className='text-sm'>CNI ou carte consulaire</p>
        </div>
        <div className="w-1/2 p-6 text-gray-400 bg-gray-100 rounded-lg shadow-lg w-55 hover:bg-gradient-to-r from-[#01377D] to-green-800 hover:text-white">
       <input  class=" hover:text-white text-center inline-flex items-center me-2  " value="Passeport" name='passeport'
         />  
         <p className='text-sm'>Passeport valide</p>
        </div>
        <div className="w-1/2 p-6 text-gray-400 bg-gray-100 rounded-lg shadow-lg w-55 hover:bg-gradient-to-r from-[#01377D] to-green-800 hover:text-white">
        <input  class=" hover:text-white text-center inline-flex items-center me-2  " value="Autres" name='autre'
         />   
          <p className='text-sm'>Autre document officiel</p>
        </div>
      </div>
    </div>
  );
    

    // Étape 3 : Scanner recto de la carte d'identité
    const step3 = (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    <h2>{steps[2]}</h2>
    <label>Recto de la carte :</label>
      <div>
      <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            name='imageRecto'
            height={240}
          />
          <button type="button" onClick={() => captureImage(setRecto)}>Capturer Recto</button>
      </div>
         <div> 
          {recto && <img src={recto} alt="Recto de la carte" />}
          </div>
        </div>
      
  );
  // Étape 4 : Scanner verso de la carte d'identité
  const step4 = (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <h2>{steps[3]}</h2>
      <label>Verso de la carte :</label>
      <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
            name='imageVerso'
          />
           <button type="button" onClick={() => captureImage(setVerso)}>Capturer Verso</button>
         </div>
          <div>
          {verso && <img src={verso} alt="Verso de la carte" />}
        </div>
      
    </div>
  );
    
  const step5 = (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-1'>
          <h2>{steps[4]}</h2>
       <label
         className='block text-sm font-medium text-gray-700'>
           Liste des Agents</label>
          <select
                    name='agent'
                    onChange={handleChange}
                    placeholder="Agent"
                    className='block w-full p-2 mt-1 border border-gray-300 rounded-md'
                    required>
                        <option value="">Select Agent</option>
                        {agents.map(agen => (
                            <option key={agen._id} value={agen._id}>{agen.userId.prenom} {agen.userId.nom}
                            </option>
                        ))}
                </select>
                </div>
    );
      // Étape 6 : Résumé

    const step6 = (
      <div>
        <h2>{steps[5]}</h2>
        <p><strong>Nom:</strong> {formData.nom}</p>
        <p><strong>Prenom:</strong> {formData.nom}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Adresse:</strong> {formData.adresse}</p>
        <p><strong>Téléphone:</strong> {formData.tel}</p>
        <p><strong>Image recto de la carte d'identité:</strong></p>
      <img src={recto} alt="Recto carte" width="200" />
      <p><strong>Image verso de la carte d'identité:</strong></p>
      <img src={verso}alt="Verso carte" width="200" />
      </div>
    );
  return (
<div className='max-w-4xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md'>
  
<h2 className='mb-6 text-2xl font-bold'>Nouveau Visiteur</h2>

 {/* Barre de progression */}
 <div className="progress-bar-container">
        <div  className="progress-bar bg-gradient-to-r from-[#01377D] to-green-800"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
   {/* Glisseur */}
   <Slider
        min={0}
        max={steps.length - 1}
        value={step}
        onChange={(value) => setStep(value)}
        renderMark={(props) => <div {...props} />}
        className='font-bold text-Xl'
      />
  {/* // Rendu conditionnel en fonction de l'étape */}
  <div style={{ marginTop: '20px' }}>
        {step === 0 && step1}
        {step === 1 && step2}
        {step === 2 && step3}
        {step === 3 && step4}
        {step === 4 && step5}
        {step === 5 && step6}
        {/* {step === 6 && step6} */}

      {/* {step === 4 && step4} */}

      <div className='flex items-center gap-4 p-6 px-6'>
          {step ==0  && <button  className='flex items-center px-4 py-2 mt-6 text-gray-800 bg-gray-100 rounded bton'
      onClick={()=> navigate(`/acceuil`)}>Annuler</button>}
            {step > 0 && <button  className='flex items-center px-4 py-2 mt-6 text-gray-800 bg-gray-100 rounded bton'
      onClick={prevStep} disabled={step === 0}><FaArrowLeft /> Retour</button>}
      
      
        {step < 5 ? (
          <button  className='px-4 py-2 mt-6 text-white bg-gradient-to-r from-[#01377D] to-green-800 rounded  flex items-center bton'
          onClick={nextStep} disabled={step === steps.length - 1}> Suivant <FaArrowRight /></button>
        ) : (
          <button className='px-4 py-2 mt-6 text-white bg-gradient-to-r from-[#01377D] to-green-800 rounded  flex items-center bton' type='submit' onClick={handleSubmit}>Confirmer l'entrée</button>
        )}
      </div>
      </div>
    
        </div>
  )
}

export default AddVi