import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const fetchAgents = async () => {
    let agents
    try {

      const response = await axios.get(
        'http://localhost:5000/api/agent', {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.data.success){
        agents = response.data.agents
     
    }
      
    } catch (error) {
      if(error.response && !error.response.data.success){
          alert(error.response.data.error)
      }
    } 
    return agents
   } ;
export const columns = [
    {
        name: "S No",
        selector:(row) => row.sno,
        width: "70px"
    },
  
    {
        name: "Nom",
        selector:(row) => row.nom,
        sortable: true,
        width: "100px"
    },
    {
        name: "Prenom",
        selector:(row) => row.prenom,
        width: "130px"
    },
    {
        name: "Image",
        selector:(row) => row.profileImage,
        width: "90px"
    },
    // {
    //     name: "Email",
    //     selector:(row) => row.email,
    //     width: "100px"

    // },
    // {
    //     name: "Date de naissance",
    //     selector:(row) => row.ddn,
    //     width: "130px",
   //       sortable: true,

    // },
    {
        name: "Designation",
        selector:(row) => row.designation,
        width: "130px"

    },
    {
        name: "Agence",
        selector:(row) => row.ag_nom,
        width: "120px"

    },
    
    {
        name: "Action",
        selector:(row) => row.action,
        center: "true"
    }
]


export const VisiteurButtons = ({_id}) => {
    const navigate = useNavigate()

//     const handleDelete = async(_id) => {
//         const confirm= window.confirm("Voullez vous supprimé")
//         if(confirm)
//             {
               
//         try {
        
//              const response = await axios.delete(
//               `http://localhost:5000/api/agent/${id}`, 
//               {
//               headers: {
//                 Authorization : `Bearer ${localStorage.getItem('token')}`
//               }
//           })
        
//           if(response.data.success){
//             onAgentDelete(id)
          
//              }
            
//           } catch (error) {
//             if(error.response && !error.response.data.success){
//                 alert(error.response.data.error)
//             }
//           }
        
//     }
// }
    
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 text-white bg-blue-400" 
            onClick={()=> navigate(`/admin-dashboard/visiteur/${_id}`)}>
                View</button>
                <button className="px-3 py-1 text-white bg-yellow-400" 
            onClick={()=> navigate(`/admin-dashboard/visiteur/edit/${_id}`)}>
            Edit</button>
                <button className="px-3 py-1 text-white bg-green-400" 
            > Visit</button>
             
            <button className="px-3 py-1 text-white bg-red-400"
            >Delete</button>
        </div>
    )
}