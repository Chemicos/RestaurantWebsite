import React from 'react'
import FinishedOrderSummary from './FinishedOrderSummary'
import OrderList from './FinishOrderComponents/OrderList'
import CustomerDetailsForm from './FinishOrderComponents/CustomerDetailsForm'
import DeliveryMethod from './FinishOrderComponents/DeliveryMethod'
import PaymentMethod from './FinishOrderComponents/PaymentMethod'
import OrderNote from './FinishOrderComponents/OrderNote'

export default function FinishOrderPage() {
  return (
    <div className='bg-custom-yellow min-h-screen px-12 py-8 flex justify-between gap-10'>
      <div className='w-2/3 flex flex-col gap-8'>
        <OrderList />
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
