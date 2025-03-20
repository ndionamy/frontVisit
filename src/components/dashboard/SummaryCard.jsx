import React from 'react'

const SummaryCard = ({icon , text, number, color}) => {
  return (
    <div className='flex bg-white rounded'>
        <div className={`flex items-center justify-center px-4 text-3xl text-white ${color}`}>
            {icon}
        </div>
        <div className='py-1 pl-4'>
            <p className='text-lg font-semibold'>{text}</p>
            <p className='text-xl font-bold'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard