import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SaladSection({
    salate,
    selectedSalate,
    toggleSalata,
    updateSalataQuantity
}) {
  const {t} = useTranslation()
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h3 className="font-semibold text-xl">{t('customizer.salad.title')}</h3>
        <span className="ml-2 text-xs font-light bg-[#FFD980] px-2 py-0.5 rounded-full">{t('customizer.salad.optional')}</span>
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
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateSalataQuantity(id, -1)}>
                  <MinusIcon 
                    size={25} 
                    weight="bold" 
                    className="text-black bg-[#66635B]/30 rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60" 
                  />
                </button>
                <span>{selectedSalate[id]}</span>
                <button onClick={() => updateSalataQuantity(id, 1)}>
                  <PlusIcon 
                    size={25} 
                    weight="bold" 
                    className="text-white bg-custom-red rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-red-700" 
                  />
                </button>
              </div>
            ) : (
              <PlusIcon 
                size={25} 
                weight="bold" 
                className="text-black bg-gray-300 rounded-full p-1 pointer-events-none" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
