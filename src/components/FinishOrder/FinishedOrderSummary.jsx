import { CircularProgress } from '@mui/material'
import { BowlFoodIcon, WarningCircleIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

export default function FinishedOrderSummary({orders, paymentMethod, isDelivery, onSubmit}) {
  const totalProducts = orders.reduce((acc, item) => acc + Number(item.price), 0)
  const deliveryTax = isDelivery && totalProducts < 50 ? 8 : 0
  const totalFinal = totalProducts + deliveryTax
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <div className='bg-custom-white rounded-xl p-6 shadow-lg h-auto w-[400px]'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-2xl font-semibold'>Rezumat comanda</h3>
        <BowlFoodIcon size={35} weight='duotone' />
      </div>

      <hr className="border-[#66635B]/40 mb-4" />

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress color="error" />
          </div>
        ) : (
          <>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span>Produse: </span>
                <span>{totalProducts.toFixed(2)} RON</span>
              </div>
              
              {isDelivery && (
                <div className='flex justify-between'>
                  <span>Livrare la adresa</span>
                  <span>{deliveryTax} RON</span>
                </div>
              )}

              <div className='flex justify-between'>
                <span>Metoda de plata:</span>
                <span>{
                  paymentMethod === 'Card' ? 'Card' : 'Numerar'  
                }</span>
              </div>
            </div>

            {isDelivery && totalProducts < 50 && (
              <div className='flex gap-2 items-center bg-yellow-100 p-2 rounded mt-4 text-sm'>
                <WarningCircleIcon size={20} color='#E7272C' weight='fill' />
                <span>
                  Comanda de minim <strong>50 RON</strong> pentru a beneficia de livrare gratuita.
                </span>
              </div>
            )}

            <div className='flex justify-between mt-6 text-xl font-bold'>
              <span className='uppercase'>Total:</span>
              <span>{totalFinal.toFixed(2)} RON</span>
            </div>
          </> 
        )}

      <button
        className='bg-custom-red hover:bg-red-700 active:bg-red-700 active:scale-90 text-white py-4 lg:py-2 
        px-4 mt-6 w-full rounded-full font-semibold cursor-pointer transition-all'
        onClick={onSubmit}
      >
        Trimite Comanda
      </button>
    </div>
  )
}
