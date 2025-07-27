import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import ConfirmDelete from './ConfirmDelete'

export default function OrderSummary({orders, onRequestDelete}) {

  const totalPrice = orders.reduce((acc, order) => acc + Number(order.price), 0)
  
  return (
    <div className='shadow bg-custom-white rounded-xl p-6 w-[auto] h-auto overflow-y-auto'>
      <h2 className='font-bold text-xl mb-6 text-center'>Comanda ta</h2>

      {orders.length === 0 ? (
        <p className='text-center text-custom-gray'>Inca nu ai adaugat un meniu.</p>
      ): (
        <>
          <div className='flex flex-col gap-4 h-[400px] w-[300px] overflow-y-auto pr-1'>
            {orders.map((order, index) => (
              <div key={index} className='flex justify-between border-b border-black/20 pb-4'>
                <div className='flex flex-col items-start w-[200px]'>
                  <div className='flex gap-1'>
                    <span>x{order.quantity}</span> 
                    <p>{order.name}</p>
                  </div>
                  
                  <p className='text-sm text-custom-gray leading-relaxed'>{order.details}</p>

                  <div className='flex flex-row gap-2'>
                    <button className='text-sm text-custom-red font-medium hover:underline cursor-pointer'>
                      Editeaza
                    </button>
                    <button 
                    className='text-sm text-custom-red font-medium hover:underline cursor-pointer'
                    onClick={() => onRequestDelete(order.name)}
                    >
                      Sterge
                    </button>
                  </div>
                </div>
          
                <p className='text-lg'>{order.price} RON</p>
              </div>
            ))}
          </div>

          <button className='mt-6 bg-custom-red hover:bg-red-700 text-white py-2 px-4 w-full rounded-full font-semibold cursor-pointer transition-all'>
            Finalizeaza pentru {totalPrice.toFixed(2)} RON
          </button>
        </>
      )}
    </div>
  )
}
