import { CheckIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function GarnishSection({
    garnituri,
    selectedGarnitura,
    setSelectedGarnitura
}) {
  const {t} = useTranslation()

  return (
    <div className='space-y-4'>
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <h3 className='font-semibold text-xl'>{t('customizer.garnish.title')}</h3>
          <span className="ml-2 text-xs text-white font-light bg-custom-red px-2 py-0.5 rounded-full">{t('customizer.garnish.required')}</span>
        </div>
        <p className='text-custom-gray text-sm font-semibold'>{t('customizer.garnish.subtitle')}</p>
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
