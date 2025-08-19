import React, { useContext, useEffect, useState } from 'react'
import { fetchOrders } from '../../MenusPage/utils/fetchOrders'
import { generateOrderDetailsText } from '../../MenusPage/utils/formatOrderDetails'
import { AuthContext } from '../../../contexts/AuthContext'

export default function OrderList() {
  const [orders, setOrders] = useState([])

  const {user} = useContext(AuthContext)

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders()
      setOrders(data)
    }
    loadOrders()
  }, [user])
  
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
              <p className='text-custom-gray text-sm'>{generateOrderDetailsText(order)}</p>
            </div>

            <p className='text-sm'>{Number(order.price).toFixed(2)} RON</p>
          </div>
        ))
      )}
    </div>
  )
}
