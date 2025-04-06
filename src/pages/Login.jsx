import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useAuth } from '../context/authContext'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const {login} = useAuth ()
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{

        e.preventDefault()
        try {
            const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {email, password}
                
    );
            if(response.data.success){
                login(response.data.user)
                
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                } else {
                    navigate("/acceuil")
                }
            }

        } 
        catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            } 
            else{
                setError("Server Error")
            } 
                    
        }

    }
  return (
    //     className='flex flex-col items-center h-screen justify-center 
    // bg-gradient-to-b from-[#01377D] from-20% to-gray-100 to-50% space-y-6'>
    <div
    className='flex flex-col items-center h-screen justify-center 
    bg-gradient-to-b from-[#01377D] from-30% to-10% space-y-6'>
         <h2 className='text-3xl text-white font-sevillana'>IVisit Management System

         </h2>
         <div className='p-6 bg-white shadow w-80'>
         <h2 className='mb-4 text-2xl font-bold'>Se connecter</h2>
         {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>Email</label>
                <input type='email'
                className='w-full px-3 py-2 border rounded'
                placeholder='Entrer votre email'
                onChange={(e) =>setEmail(e.target.value)}
                required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'
                >Password</label>
                <input 
                type='password'
               className='w-full px-3 py-2 border rounded'
                placeholder='********'
                onChange={(e) =>setPassword(e.target.value)}
                required
/>
            </div>
            <div className='flex items-center justify-between mb-4'>
                <label className='inline-flex items-center'>
                    <input type='checkbox' className='form-checkbox' />
                    <span className='ml-2 text-gray-700'>Remember me</span>
                </label>
                <br/>
                <a href='#' className='text-blue-400'>
                    mot de passe oublié
                </a>
            </div>
            <div className='mb-4'>
            <button
            type='submit'
            className='w-20 h-10 bg-[#01377D] rounded text-white'>
                Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login