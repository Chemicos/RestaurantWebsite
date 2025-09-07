import { useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import OrderSummary from './OrderSummary'
import { XIcon } from '@phosphor-icons/react'

export default function OrderSummaryMobileWrapper({orders, onRequestDelete, onRequestEdit, onClose}) {
    const isMobile = useMediaQuery('(max-width: 1024px)')
    
    useEffect(() => {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
    }, [])

    if(!isMobile) return null

    const handleEdit = (order) => {
      if (typeof onClose === 'function') onClose()
      if (typeof onRequestEdit === 'function') onRequestEdit(order)
    }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-custom-white z-[1300] p-4 overflow-y-auto animate-fade-in">
      <div className="flex justify-end">
        <button
            onClick={onClose} 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-[#66635B]/30 cursor-pointer
            transition-all hover:bg-red-600 active:bg-red-600 hover:shadow-lg"
        >
            <XIcon size={20} weight="bold" />
        </button>
      </div>
      <OrderSummary
        orders={orders}
        onRequestDelete={onRequestDelete}
        onRequestEdit={handleEdit}
      />
    </div>
  )
}
