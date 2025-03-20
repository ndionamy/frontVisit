import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AgentButtons, columns } from '../../utils/AgentHelper';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const List = () => {
  
  const [agentLoading, setAgentLoading] = useState(false)
  const [agents, setAgents] = useState([])
  const [filteredAgents, setfilteredAgents] = useState([])

//  const onAgentDelete = async (id) = {
//    const  data =  agents.filter(agen => agen._id !== id)
//    setAgents(data)
//  }


  useEffect(() => {
    const fetchAgents = async () => {
      setAgentLoading(true)
      try {

        const response = await axios.get(
          'http://localhost:5000/api/agent', {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
      });
      if(response.data.success){
        let sno= 1
        const data = await response.data.agents.map((age) =>(
          {
            _id: age._id,
            sno: sno++,
            profileImage: <img width={40} className='rounded-full' src={`http://localhost:5000/${age.userId.profileImage}`} /> ,
            nom: age.userId.nom,
            prenom:age.userId.prenom,
            email:age.userId.email,
            designation: age.designation,
            ag_nom: age.agence.ag_nom,
            ddn:new Date(age.ddn).toLocaleDateString(),
            action: (<AgentButtons _id = {age._id}/>)
           
            
          }

        ))
        setAgents(data);
        setfilteredAgents(data)
      }
        
      } catch (error) {
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
      } finally{
        setAgentLoading(false)
      }
     }
     fetchAgents();
},[]);
  
const handleFilter = (e) => {
  const records = agents.filter((age) => 
  age.nom.toLowerCase().includes(e.target.value.toLowerCase()))
  setfilteredAgents (records)


}
    
    return (
      <div className='p-6'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'> Gestion des Agents
          </h3>
        </div>
        <div className='flex items-center justify-between '>
          <input type="text" 
          placeholder='Recherche par Nom'
          className='px-4 py-0.5 border'
          onChange={handleFilter}
          />
          <Link to="/admin-dashboard/add-agent" className='px-4 py-1 text-white bg-blue-600 rounded'
          >Ajouter un agent
          </Link>
      </div>
      <div className='mt-6'>
        <DataTable
        columns={columns} data = {filteredAgents} pagination/>
      </div>
         
      </div>
    )
}

export default List;