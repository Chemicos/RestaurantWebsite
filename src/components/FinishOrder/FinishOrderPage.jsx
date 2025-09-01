import React, { useEffect, useState } from 'react'
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
import { useOrders } from '../MenusPage/hooks/useOrders'
import { useUserDetails } from '../MenusPage/hooks/useUserDetails'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[0-9+\-\s]{8,}$/

export default function FinishOrderPage() {
  const navigate = useNavigate()
  const [isDelivery, setIsDelivery] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('Card')
  const {orders} = useOrders()

  const [customer, setCustomer] = useState({
    prenume: '', nume: '', telefon: '', email: ''
  })

  const [delivery, setDelivery] = useState({
    localitate: '', strada: '', codPostal: ''
  })

  const [errors, setErrors] = useState({
    customer: {}, delivery: {}
  })

  const { userDetails } = useUserDetails()

  useEffect(() => {
    if (userDetails) {
      setCustomer({
        prenume: userDetails.prenume || '',
        nume: userDetails.nume || '',
        telefon: userDetails.telefon || '',
        email: userDetails.email || ''
      })
    }
  }, [userDetails])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const validate = () => {
    const custErr = {}

    if (!customer.nume?.trim()) custErr.nume = 'Numele este obligatoriu'
    if (!customer.prenume?.trim()) custErr.prenume = 'Prenumele este obligatoriu'
    if (!customer.telefon?.trim()) custErr.telefon = 'Telefonul este obligatoriu'
    else if (!phoneRe.test(customer.telefon)) custErr.telefon = 'Telefon invalid'
    if (!customer.email?.trim()) custErr.email = 'Emailul este obligatoriu'
    else if (!emailRe.test(customer.email)) custErr.email = 'Email invalid'

    const delErr = {}
    if (isDelivery) {
      if (!delivery.localitate) delErr.localitate = 'Selectează localitatea'
      if (!delivery.strada?.trim()) delErr.strada = 'Strada este obligatorie'
      if (!delivery.codPostal?.trim()) delErr.codPostal = 'Codul poștal este obligatoriu'
    }

    setErrors({ customer: custErr, delivery: delErr })
    const ok = Object.keys(custErr).length === 0 && Object.keys(delErr).length === 0
    if (!ok) {
      const firstErrorId =
        Object.keys(custErr)[0] ? `customer-${Object.keys(custErr)[0]}` :
        Object.keys(delErr)[0] ? `delivery-${Object.keys(delErr)[0]}` : null
      if (firstErrorId) {
        const el = document.getElementById(firstErrorId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    return ok
  }

  const handleSubmitOrder = async () => {
    if (!validate()) return
  }

  return (
  <div className='flex flex-col lg:flex-row justify-between max-w-[1650px] px-4 py-8 mx-auto gap-10'>
      <div className='w-full flex flex-col gap-8'>
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
        <CustomerDetailsForm
          value={customer}
          onChange={setCustomer}
          errors={errors.customer}
          validators={{email: emailRe, telefon: phoneRe}}
        />

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
              <DeliveryDetails
                value={delivery}
                onChange={setDelivery}
                errors={errors.delivery}
              />
            </motion.div>
          )
          }
        </AnimatePresence>
        
        <PaymentMethod setPaymentMethod={setPaymentMethod} />
        <OrderNote />
      </div>
      
      <div className='relative'>
        <div className={`max-h-[calc(100vh-5rem)] sticky top-20
          transition-all duration-500 ease-out ${scrolled ? 'translate-y-[40px]' : 'translate-y-0'}
        `}>
          <FinishedOrderSummary
            orders={orders}
            paymentMethod={paymentMethod}
            isDelivery={isDelivery}
            onSubmit={handleSubmitOrder}
          />
        </div>
      </div>
    </div>
  )
}
