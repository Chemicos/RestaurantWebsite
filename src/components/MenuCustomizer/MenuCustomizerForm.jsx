import { CheckIcon, PlusIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'

export default function MenuCustomizerForm() {
  const [selectedGarnish, setSelectedGarnish] = useState('Cartofi Frantuzesti')
  const garnituri = ['Cartofi Frantuzesti', 'Piure de Cartofi', 'Cartofi Natur']

  const [selectedSalad, setSelectedSalad] = useState([])
  const salate = ['Salata de vara', 'Salata verde', 'Salata de rosii']

  const toggleSalata = (salata) => {
    setSelectedSalad(prev => prev.includes(salata) ? prev.filter(s => s !== salata) : [...prev, salata])
  }


  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-row items-center'>
          <h3 className=' font-semibold text-xl'>
            Alege o Garnitura
          </h3>
          <span className='ml-2 text-xs font-light bg-[#FFD980] px-2 py-0.5 rounded-full'>optional</span>
        </div>
        
        <div>
          {garnituri.map((garnitura) => (
            <button
              key={garnitura}
              onClick={() => setSelectedGarnish(garnitura)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedGarnish === garnitura ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              {garnitura}
              
              {selectedGarnish === garnitura ? (
                <CheckIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1' />
              ): (
                <PlusIcon size={25} weight='bold' className='text-black bg-gray-300 rounded-full p-1' />
              )}
            </button>
          ))}
        </div>

        <div className='flex items-center'>
          <h3 className=' font-semibold text-xl'>
            Alege Salata
          </h3>
          <span className='ml-2 text-xs font-light bg-[#FFD980] px-2 py-0.5 rounded-full'>optional</span>
        </div>

        <div>
          {salate.map((salata) => (
            <button
              key={salata}
              onClick={() => toggleSalata(salata)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedSalad.includes(salata) ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              {salata}
              {selectedSalad.includes(salata) ? (
                <CheckIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1' />
              ): (
                <PlusIcon size={25} weight='bold' className='text-black bg-gray-300 rounded-full p-1' />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
