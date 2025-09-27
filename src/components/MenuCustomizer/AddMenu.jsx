import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'

export default function AddMenu({
    quantity, 
    setQuantity, 
    totalPrice, 
    handleAddOrder,
    isEditing
}) {
  return (
    <div className="flex flex-col w-full">
        <div className="flex items-center justify-center gap-6">
            <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="bg-[#66635B]/30 text-gray-600 p-2 rounded-full cursor-pointer
            transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60"
            >
            <MinusIcon size={25} weight="bold" />
            </button>

            <span className="text-xl font-semibold">{quantity}</span>

            <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="bg-custom-red text-white p-2 rounded-full cursor-pointer
            transition-all duration-100 active:scale-90 hover:bg-red-700"
            >
            <PlusIcon size={25} weight="bold" />
            </button>
        </div>

        <button 
            className="w-full mt-4 py-3 rounded-full text-white font-semibold bg-custom-red shadow-sm
            hover:bg-red-700 active:scale-90 transition-all duration-300 cursor-pointer"
            onClick={handleAddOrder}
        >
            {isEditing 
                ? `Salvează ${quantity} pentru ${totalPrice.toFixed(2)} RON` 
                : `Adaugă ${quantity} pentru ${totalPrice.toFixed(2)} RON `}
        </button>
    </div>
  )
}
