import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'

const orders = [
  {id: 1, quantity: 1, name: 'Pizza Casei', details: 'Fuzetea, Sos Dulce', price: 40},
  {id: 2, quantity: 2, name: 'Ceafa de porc la gratar', details: 'Cartofi prajiti, Pepsi, Salata Verde', price: 37},
  {id: 3, quantity: 1, name: 'Pizza Ton', details: 'Fuzetea, Ketchup', price: 40},
  {id: 4, quantity: 1, name: 'Mici', details: 'Cartofi natur, Fuzetea', price: 35},
  {id: 5, quantity: 1, name: 'Pizza Quattro Stagionni', details: 'Sos picant, Mirinda', price: 40}
]
export default function OrderSummary() {
  return (
    <div className='shadow bg-custom-white rounded-xl p-6 w-[auto] h-auto overflow-y-auto'>
      <h2 className='font-bold text-xl mb-6 text-center'>Comanda ta</h2>

      <div className='flex flex-col gap-4 h-[400px] overflow-y-auto'>
        {orders.map((order) => (
          <div key={order.id} className='flex justify-between border-b border-black/20 pb-4'>
            <div className='flex flex-col items-start'>
              <p>{order.name}</p>
              <p className='text-sm text-custom-gray'>{order.details}</p>
              <button className='text-sm text-custom-red font-medium hover:underline cursor-pointer'>
                Editare
              </button>
            </div>

            <div className='flex flex-col items-end justify-between'>
              <p className='text-lg'>{order.price} RON</p>
              
              <div className='flex items-center gap-2'>
                <button>
                  <MinusIcon size={25} weight='bold' className='text-black bg-[#66635B]/30 rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60' />
                </button>
                <span>{order.quantity}</span>
                <button>
                  <PlusIcon size={25} weight='bold' className='text-white bg-custom-red rounded-full p-1 cursor-pointer transition-all duration-100 active:scale-90 hover:bg-red-700' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className='mt-6 bg-custom-red hover:bg-red-700 text-white py-2 px-4 w-full rounded-full font-semibold cursor-pointer'>
        Finalizeaza Comanda 136 RON
      </button>
    </div>
  )
}
