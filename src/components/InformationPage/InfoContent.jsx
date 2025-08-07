import React from 'react'
import CumComand from './InfoContent/CumComand'

export default function InfoContent({
    selectedTopic
}) {
  return (
    <div className='flex-1'>
        {selectedTopic === 'cum-comand' && <CumComand />}  
    </div>
  )
}
