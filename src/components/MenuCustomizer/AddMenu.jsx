import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function AddMenu({
    quantity, 
    setQuantity, 
    totalPrice, 
    handleAddOrder,
    isEditing,
    isInvalidGarnitura = false
}) {
    const {t} = useTranslation()
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
                onClick={handleAddOrder}
                disabled={isInvalidGarnitura} 
                className={`w-full mt-4 py-3 rounded-full text-white font-semibold bg-custom-red shadow-sm transition-all duration-300
                ${isInvalidGarnitura ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700 active:scale-90'}
                `}
            >
                {isEditing 
                    ? `${t('addMenu.save')} ${quantity} ${t('addMenu.for')} ${totalPrice.toFixed(2)} RON` 
                    : `${t('addMenu.add')} ${quantity} ${t('addMenu.addFor')} ${totalPrice.toFixed(2)} RON `}
            </button>
        </div>
    )
}
