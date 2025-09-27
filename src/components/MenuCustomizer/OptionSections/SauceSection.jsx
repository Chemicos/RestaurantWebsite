import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'

export default function SauceSection({
    sosuri,
    selectedSosuri,
    toggleSos,
    updateSosuriQuantity
}) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
          <h3 className=' font-semibold text-xl'>
            Alege Sosuri
          </h3>
          <span className='ml-2 text-xs font-light bg-[#FFD980] px-2 py-0.5 rounded-full'>opțional</span>
        </div>

        <div>
          {sosuri.map(({ id, name, price }) => (
            <div
              key={id}
              onClick={() => toggleSos(id)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedSosuri[id] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              <div className='capitalize'>
                {name}
                <span className='text-sm text-custom-red'> + {price} RON</span>
              </div>
              
              {selectedSosuri[id] ? (
                <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => updateSosuriQuantity(id, -1)}>
                    <MinusIcon 
                      size={25} 
                      weight='bold' 
                      className='text-black bg-[#66635B]/30 rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60'  
                    />
                  </button>

                  <span>{selectedSosuri[id]}</span>

                  <button onClick={() => updateSosuriQuantity(id, 1)}>
                    <PlusIcon
                      size={25} 
                      weight='bold' 
                      className='text-white bg-custom-red rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-red-700' 
                    />
                  </button>
                </div>
              ) : (
                  <PlusIcon size={25} weight='bold' className='text-black bg-gray-300 rounded-full p-1 pointer-events-none' />
              )}
            </div>
          ))}
        </div>
    </div>
  )
}
