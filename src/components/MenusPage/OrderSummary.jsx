import { MinusIcon, PlusIcon } from '@phosphor-icons/react'

export default function OrderSummary({orders}) {

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
                <div className='flex flex-col items-start w-full'>
                  <p>{order.name}</p>
                  <p className='text-sm text-custom-gray'>{order.details}</p>
                  <button className='text-sm text-custom-red font-medium hover:underline cursor-pointer'>
                    Editare
                  </button>
                </div>

                <div className='flex flex-col items-end w-full justify-between'>
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
            Finalizeaza pentru {totalPrice.toFixed(2)} RON
          </button>
        </>
      )}
    </div>
  )
}
