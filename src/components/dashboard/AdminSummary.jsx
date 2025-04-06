import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBell, FaUser,  FaBuilding, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaUsers } from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div className='p-6'>
        <h3 className='text-2xl font-bold'>Dashbboard Overview</h3>
        <div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-4'>
            <SummaryCard icon= {<FaUser/>} text="Agents" number={14} color="bg-blue-600"/>
            <SummaryCard icon= {<FaBuilding/>} text="Agences" number={5} color="bg-yellow-600"/>
            <SummaryCard icon= {<FaUsers/>} text="Total Visiteurs" number={100}color="bg-teal-600"/>
            <SummaryCard icon= {<FaBell/>} text="Alerts" number={8} color="bg-red-600"/>

        </div>
        <div className='mt-12'>
            <h4 className='text-2xl font-bold text-center'>Details des Vistes</h4>
            <div className='grid grid-cols-1 gap-6 mt-6 md:grid-cols-4 ' >
            {/* <SummaryCard icon= {<FaCheckCircle/>} text="Total Agents" number={14} color="bg-blue-600"/>
            <SummaryCard icon= {<FaCheckCircle/>} text="Visites Acceptés" number={14} color="bg-green-600"/>
            <SummaryCard icon= {<FaHourglassHalf/>} text="Visites en Cours" number={14} color="bg-yellow-600"/>
            <SummaryCard icon= {<FaTimesCircle/>} text="Visites Rejetés" number={14} color="bg-red-600"/> */}
            </div>
        </div>
        <div className='mt-12'>
        <h4 className='text-2xl font-bold text-center'>STATS</h4>
        </div>
        <div>
        </div>

    </div>

)
}

export default AdminSummary