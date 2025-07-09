import { CheckIcon, PlusIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

export default function MenuCustomizerForm({ menuId, onBauturaSelect }) {
  const [garnituri, setGarnituri] = useState([])
  const [salate, setSalate] = useState([])
  const [bauturi, setBauturi] = useState([])

  const [selectedGarnitura, setSelectedGarnitura] = useState(null)
  const [selectedSalata, setSelectedSalata] = useState([])
  const [selectedBautura, setSelectedBautura] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchCustomizeOptions = async () => {
      try {
        const [garnituriRes, salateRes, bauturiRes] = await Promise.all([
          fetch(`${API_URL}/api/garnituri`),
          fetch(`${API_URL}/api/salate`),
          fetch(`${API_URL}/api/bauturi`)
        ])

        const [garnituriData, salateData, bauturiData] = await Promise.all([
          garnituriRes.json(),
          salateRes.json(),
          bauturiRes.json()
        ])

        setGarnituri(garnituriData.filter(g => g.menu_id === menuId))
        setSalate(salateData.filter(s => s.menu_id === menuId))
        setBauturi(bauturiData.filter(b => b.menu_id === menuId))
      } catch (err) {
        console.error('Eroare la incarcarea optiunilor:', err)
      }
    }
    if (menuId) fetchCustomizeOptions()
  }, [menuId])

  const toggleSalata = (salata) => {
    setSelectedSalata(prev => prev.includes(salata)
      ? prev.filter(s => s !== salata)
      : [...prev, salata])
  }

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-row items-center'>
          <h3 className=' font-semibold text-xl'>
            Alege o Garnitura
          </h3>
        </div>
        
        <div>
          {garnituri.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => setSelectedGarnitura(name)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedGarnitura === name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              {name}
              
              {selectedGarnitura === name ? (
                <CheckIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1' />
              ) : (
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
          {salate.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => toggleSalata(name)}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedSalata.includes(name) ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              {name}
              {selectedSalata.includes(name) ? (
                <CheckIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1' />
              ): (
                <PlusIcon size={25} weight='bold' className='text-black bg-gray-300 rounded-full p-1' />
              )}
            </button>
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
            <button
              key={id}
              onClick={() => {
                setSelectedBautura(name)
                onBauturaSelect({ name, price: Number(price) })
              }}
              className={`w-full border rounded-lg px-4 py-4 flex justify-between items-center mb-3 cursor-pointer
                ${selectedBautura === name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              <div>
                {name} 
                <span className='text-sm text-custom-red'> + {price} RON</span>
              </div>
              
              {selectedBautura === name ? (
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
