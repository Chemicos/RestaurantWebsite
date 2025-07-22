import { CheckIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'

export default function GarnishSection({
    garnituri,
    selectedGarnitura,
    setSelectedGarnitura
}) {
  return (
    <div className='space-y-4'>
      <div className='flex flex-col'>
        <h3 className='font-semibold text-xl'>Alege Garnitura</h3>
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

              {isSelected ? (
                <CheckIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1' />
              ) : (
                <PlusIcon size={25} weight='bold' className='text-black bg-gray-300 rounded-full p-1' />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
