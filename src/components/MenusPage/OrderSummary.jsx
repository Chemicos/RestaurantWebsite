import { generateOrderDetailsText } from './utils/formatOrderDetails'
import { CircularProgress, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function OrderSummary({orders, onRequestDelete, onRequestEdit, orderLoading}) {
  const totalPrice = orders.reduce((acc, order) => acc + Number(order.price), 0)
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const navigate = useNavigate()
  
  const {t} = useTranslation()
  return (
    <div className={`bg-[#f9f9f9] rounded-xl p-6 w-full overflow-y-auto
      ${isMobile ? 'flex flex-col items-center justify-between h-full' : 'h-auto shadow-lg'}
    `}>
      <h2 className='font-semibold lg:font-bold text-4xl lg:text-xl mb-6 text-center'>{t('orderSummary.title')}</h2>


      {orderLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CircularProgress color="error" />
        </div>
      ) : (
        orders.length === 0 ? (
          <p className='text-center text-custom-gray'>{t('orderSummary.emptyOrder')}</p>
        ) : (
          <>
            <div className={`${isMobile ? 'w-full h-full' : 'h-[400px] w-[300px]'} flex flex-col gap-4 overflow-y-auto pr-1`}>
              {orders.map((order, index) => (
                <div key={index} className='flex justify-between border-b border-black/20 pb-4'>
                  <div className='flex flex-col items-start w-[200px]'>
                    <div className='flex gap-1'>
                      <span>x{order.quantity}</span> 
                      <p>{order.name}</p>
                    </div>
                    
                    <p className='text-sm text-custom-gray leading-relaxed'>{generateOrderDetailsText(order)}</p>
                    

                    <div className='flex gap-2'>
                      <button 
                      className='text-sm text-custom-red font-medium hover:underline cursor-pointer'
                      onClick={() => onRequestDelete(order)}
                      >
                        {t('orderSummary.delete')}
                      </button>

                      <button
                        className='text-sm text-custom-red font-medium hover:underline cursor-pointer'
                        onClick={() => onRequestEdit(order)}
                      >
                        {t('orderSummary.edit')}
                      </button>
                    </div>
                  </div>
            
                  <p className='text-md'>{Number(order.price).toFixed(2)} RON</p>
                </div>
              ))}
            </div>
          </>
        )
      )}

      {orders.length > 0 ? (
        <button 
          className='mt-6 bg-custom-red hover:bg-red-700 active:bg-red-700 active:scale-90 text-white py-4 lg:py-2 px-4 w-full rounded-full font-semibold cursor-pointer transition-all'
          onClick={() => navigate('/finalizare')}
        >
          {t('orderSummary.finish')} {totalPrice.toFixed(2)} RON
        </button>
      ) : (
        <span></span>
      )}
    </div>
  )
}
