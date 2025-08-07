import React from 'react'
import CumComand from './InfoContent/CumComand'
import DetaliiLivrare from './InfoContent/DetaliiLivrare'
import DetaliiPlata from './InfoContent/DetaliiPlata'

export default function InfoContent({
    selectedTopic
}) {
  return (
    <div className='flex-1'>
        {selectedTopic === 'cum-comand' && <CumComand />}
        {selectedTopic === 'livrare' && <DetaliiLivrare />}
        {selectedTopic === 'plata' && <DetaliiPlata />}
    </div>
  )
}
