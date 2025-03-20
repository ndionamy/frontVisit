import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const colums = [
    {
        name: "S No",
        selector:(row) => row.sno
    },
    {
        name: "Nom",
        selector:(row) => row.ag_nom,
        sortable: true
    },
    {
        name: "Adresse",
        selector:(row) => row.ag_adresse
    },
    {
        name: "Region",
        selector:(row) => row.ag_region
    },
    {
        name: "Action",
        selector:(row) => row.action
    }
]


export const AgenceButtons = ({_id, onAgenceDelete}) => {
    const navigate = useNavigate()

    const handleDelete = async(id) => {
        const confirm= window.confirm("Voullez vous supprimé")
        if(confirm)
            {
               
        try {
        
             const response = await axios.delete(
              `http://localhost:5000/api/agence/${id}`, 
              {
              headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              }
          })
        
          if(response.data.success){
            onAgenceDelete(id)
          
             }
            
          } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
          }
        
    }
}
    
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 text-white bg-blue-600" 
            onClick={()=> navigate(`/admin-dashboard/agence/${_id}`)}>
                Edit</button>
            <button className="px-3 py-1 text-white bg-red-600"
            onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    )
}