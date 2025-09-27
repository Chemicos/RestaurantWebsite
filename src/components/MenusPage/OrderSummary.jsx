import { generateOrderDetailsText } from './utils/formatOrderDetails'
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function OrderSummary({orders, onRequestDelete, onRequestEdit}) {
  const totalPrice = orders.reduce((acc, order) => acc + Number(order.price), 0)
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const navigate = useNavigate()
  
  return (
    <div className={`bg-custom-white rounded-xl p-6 w-auto overflow-y-auto
      ${isMobile ? 'flex flex-col items-center justify-between h-full' : 'h-auto shadow-lg'}
    `}>
      <h2 className='font-semibold lg:font-bold text-4xl lg:text-xl mb-6 text-center'>Comanda ta</h2>

      {orders.length === 0 ? (
        <p className='text-center text-custom-gray'>Încă nu ai adaugat un meniu.</p>
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
                      Șterge
                    </button>

                    <button
                      className='text-sm text-custom-red font-medium hover:underline cursor-pointer'
                      onClick={() => onRequestEdit(order)}
                    >
                      Editează
                    </button>
                  </div>
                </div>
          
                <p className='text-md'>{Number(order.price).toFixed(2)} RON</p>
              </div>
            ))}
          </div>
        </>
      )}

      {orders.length > 0 ? (
        <button 
          className='mt-6 bg-custom-red hover:bg-red-700 active:bg-red-700 active:scale-90 text-white py-4 lg:py-2 px-4 w-full rounded-full font-semibold cursor-pointer transition-all'
          onClick={() => navigate('/finalizare')}
        >
          Finalizează pentru {totalPrice.toFixed(2)} RON
        </button>
      ) : (
        <span></span>
      )}
    </div>
  )
}
