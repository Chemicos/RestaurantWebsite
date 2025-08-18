import React, { useState } from 'react'
import FinishedOrderSummary from './FinishedOrderSummary'
import OrderList from './FinishOrderComponents/OrderList'
import CustomerDetailsForm from './FinishOrderComponents/CustomerDetailsForm'
import PaymentMethod from './FinishOrderComponents/PaymentMethod'
import OrderNote from './FinishOrderComponents/OrderNote'
import { ArrowUUpLeftIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import DeliveryDetails from './FinishOrderComponents/DeliveryDetails'
import { Switch } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'


export default function FinishOrderPage() {
  const navigate = useNavigate()
  const [isDelivery, setIsDelivery] = useState(true)

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

        <div>
          <h3 className='text-2xl font-semibold'>Metoda de livrare</h3>
          <div>
            <span className={isDelivery ? 'text-custom-red' : 'text-custom-gray'}>La adresa</span>
            <Switch checked={!isDelivery} onChange={(e) => setIsDelivery(!e.target.checked)} color='error' />
            <span className={!isDelivery ? 'text-custom-red' : 'text-custom-gray'}>Ridicare personala</span>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          {isDelivery && (
            <motion.div 
              key='delivery-details'
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.3}}
            >
              <DeliveryDetails />
            </motion.div>
          )
          }
        </AnimatePresence>
        <PaymentMethod />
        <OrderNote />
      </div>

      <div className='w-1/3 h-fit sticky top-24'>
        <FinishedOrderSummary />
      </div>
    </div>
  )
}
