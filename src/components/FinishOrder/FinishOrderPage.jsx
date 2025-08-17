import React from 'react'
import FinishedOrderSummary from './FinishedOrderSummary'
import OrderList from './FinishOrderComponents/OrderList'
import CustomerDetailsForm from './FinishOrderComponents/CustomerDetailsForm'
import DeliveryMethod from './FinishOrderComponents/DeliveryMethod'
import PaymentMethod from './FinishOrderComponents/PaymentMethod'
import OrderNote from './FinishOrderComponents/OrderNote'
import { ArrowUUpLeftIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'


export default function FinishOrderPage() {
  const navigate = useNavigate()

  return (
  <div className='min-h-screen px-12 py-8 flex justify-between gap-10'>
      <div className='w-2/3 flex flex-col gap-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <button
              className='hover:bg-[#66635B]/10 active:bg-[#66635B]/30 rounded p-1 cursor-pointer transition-all'
              onClick={() => navigate('/meniuri')}
            >
              <ArrowUUpLeftIcon size={35} />
            </button>
            <h1 className='text-2xl font-semibold'>Finalizare Comanda</h1>
          </div>
          <OrderList />
        </div>
        <CustomerDetailsForm />
        <DeliveryMethod />
        <PaymentMethod />
        <OrderNote />
      </div>

      <div className='w-1/3 h-fit sticky top-24'>
        <FinishedOrderSummary />
      </div>
    </div>
  )
}
