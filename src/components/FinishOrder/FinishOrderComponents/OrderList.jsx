// import { fetchOrders } from '../../MenusPage/utils/fetchOrders'
import { generateOrderDetailsText } from '../../MenusPage/utils/formatOrderDetails'
// import { AuthContext } from '../../../contexts/AuthContext'
import { useOrders } from '../../MenusPage/hooks/useOrders'

export default function OrderList() {
  const {orders} = useOrders()
  
  return (
    <div className='flex flex-col gap-6'>
      {orders.length === 0 ? (
        <p className='text-custom-gray'>Nu ai meniuri adaugate.</p>
      ) : (
        orders.map((order, index) => (
          <div 
            key={index}
            className='flex justify-between border-b border-black/10 pb-2 text-sm'
          >
            <div className=''>
              <div className='flex gap-1 items-center'>
                <span>X{order.quantity}</span>
                <p className='font-medium text-lg'>{order.name}</p>
              </div>
              <p className='text-custom-gray w-[250px] sm:w-auto text-[12px] md:text-sm'>{generateOrderDetailsText(order)}</p>
            </div>

            <p className='text-sm md:text-[18px]'>{Number(order.price).toFixed(2)} RON</p>
          </div>
        ))
      )}
    </div>
  )
}
