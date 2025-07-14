import { CheckIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

export default function MenuCustomizerForm({ onBauturaSelect, garnituri, salate, bauturi }) {
  const [selectedGarnitura, setSelectedGarnitura] = useState(null)
  const [selectedSalate, setSelectedSalate] = useState({})
  const [selectedBauturi, setSelectedBauturi] = useState({})

  const updateSalataQuantity = (salataId, delta) => {
    setSelectedSalate(prev => {
      const newQty = (prev[salataId] || 0) + delta
      if (newQty <= 0) {
        const { [salataId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [salataId]: newQty}
    })
  }

  const updateBauturaQuantity = (id, delta) => {
    setSelectedBauturi(prev => {
      const newQty = (prev[id] || 0) + delta
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newQty}
    })
  }

  useEffect(() => {
  const bauturiArray = Object.entries(selectedBauturi).map(([id, qty]) => {
    const bautura = bauturi.find(b => b.id === Number(id))
    return {
      id: Number(id),
      name: bautura?.name || '',
      price: Number(bautura?.price), 
      quantity: Number(qty) 
    }
  })
  onBauturaSelect(bauturiArray)
  }, [selectedBauturi, bauturi, onBauturaSelect])

  const toggleSalata = (id) => {
    setSelectedSalate(prev => {
      if (prev[id]) {
        const { [id]: _, ...rest} = prev
        return rest
      }
      return {...prev, [id]: 1}
    })
  }

  const toggleBautura = (id) => {
    setSelectedBauturi(prev => {
      if (prev[id]) {
        const { [id]: _, ...rest} = prev
        return rest
      }
      return { ...prev, [id]: 1}
    })
  }

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <h3 className=' font-semibold text-xl'>
            Alege Garnitura
          </h3>
          <p className='text-custom-gray text-sm font-semibold'>Alege 1</p>
        </div>
        
        <div>
          {garnituri.map(({ id, name }) => {
            const isSelected = selectedGarnitura === name
            const shouldDim = selectedGarnitura && !isSelected

            return (
            <button
              key={id}
              onClick={() => setSelectedGarnitura(name)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${isSelected ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}
                ${shouldDim ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
            >
              {name}
              
              {selectedGarnitura === name ? (
                <CheckIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1' />
              ) : (
                <PlusIcon size={25} weight='bold' className='text-black bg-gray-300 rounded-full p-1' />
              )}
            </button>
            )
          })}
        </div>

        <div className='flex items-center'>
          <h3 className=' font-semibold text-xl'>
            Alege Salata
          </h3>
          <span className='ml-2 text-xs font-light bg-[#FFD980] px-2 py-0.5 rounded-full'>optional</span>
        </div>

        <div>
          {salate.map(({ id, name }) => (
            <div
              key={id}
              onClick={() => toggleSalata(id)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedSalate[id] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              <span>{name}</span>

              {selectedSalate[id] ? (
                <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => updateSalataQuantity(id, -1)}>
                    <MinusIcon 
                      size={25} 
                      weight='bold' 
                      className='text-black bg-[#66635B]/30 rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60' 
                    />
                  </button>
                  <span>{selectedSalate[id]}</span>
                  <button onClick={() => updateSalataQuantity(id, 1)}>
                    <PlusIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-red-700' />
                  </button>
                </div>
              ) : (
                  <PlusIcon 
                    size={25} 
                    weight='bold' 
                    className='text-black bg-gray-300 rounded-full p-1 pointer-events-none' 
                  />
              )}
            </div>
          ))}
        </div>

        <div className='flex items-center'>
          <h3 className=' font-semibold text-xl'>
            Alege Bautura
          </h3>
          <span className='ml-2 text-xs font-light bg-[#FFD980] px-2 py-0.5 rounded-full'>optional</span>
        </div>

        <div>
          {bauturi.map(({ id, name, price }) => (
            <div
              key={id}
              onClick={() => toggleBautura(id, price, name)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedBauturi[id] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              <div>
                {name}
                <span className='text-sm text-custom-red'> + {price} RON</span>
              </div>
              
              {selectedBauturi[id] ? (
                <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => updateBauturaQuantity(id, -1)}>
                    <MinusIcon 
                      size={25} 
                      weight='bold' 
                      className='text-black bg-[#66635B]/30 rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60'  
                    />
                  </button>

                  <span>{selectedBauturi[id]}</span>

                  <button onClick={() => updateBauturaQuantity(id, 1)}>
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
    </div>
  )
}
