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
import ConfirmOrder from './FinishOrderComponents/ConfirmOrder'
import { useCart } from '../../contexts/CartContext'
import { useTranslation } from 'react-i18next'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[0-9+\-\s]+$/
const normalizeSpaces = (s) => s.replace(/\s+/g, ' ').trim()
const stradaAllowedRe = /^[A-Za-z0-9 .,'/-]+$/
const stradaHasDigitRe = /\d/
const codPostalRe = /^\d{6}$/

export default function FinishOrderPage() {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL
  const {fetchCartItems, setCartItemCount} = useCart()
  const {orders, refreshOrders, setOrders} = useOrders()

  const [isDelivery, setIsDelivery] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('')

  const [customer, setCustomer] = useState({
    prenume: '', nume: '', telefon: '', email: ''
  })

  const [delivery, setDelivery] = useState({
    localitate: '', strada: '', codPostal: ''
  })

  const [errors, setErrors] = useState({
    customer: {}, delivery: {}, payment: ''
  })
  const [note, setNote] = useState('')

  const { userDetails } = useUserDetails()

  const totalProducts = orders.reduce((acc, it) => acc + Number(it.price || 0), 0)
  const deliveryTax = isDelivery && totalProducts < 50 ? 8 : 0
  const totalFinal = totalProducts + deliveryTax

  useEffect(() => {
    if (userDetails) {
      setCustomer({
        prenume: userDetails.prenume || '',
        nume: userDetails.nume || '',
        telefon: userDetails.telefon || '',
        email: userDetails.email || ''
      })

      setDelivery({
        localitate: userDetails.localitate || '',
        strada: userDetails.strada || '',
        codPostal: userDetails.cod_postal || ''
      })

      setErrors(prev => ({...prev, delivery: {}}))
    } else {
      setCustomer({
        prenume: '', nume: '', telefon: '', email: ''
      })

      setDelivery({localitate: '', strada: '', codPostal: ''})
    }
  }, [userDetails])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const isValidStrada = (raw) => {
    const s = normalizeSpaces(raw || '')
    if (s.length < 5 || s.length > 80) return false
    if (!stradaAllowedRe.test(s)) return false
    if (!stradaHasDigitRe.test(s)) return false

    return true
  }

  const validate = () => {
    const custErr = {}
    if (!customer.nume?.trim()) custErr.nume = t('finishOrder.customerDetails.requiredLastName')
    if (!customer.prenume?.trim()) custErr.prenume = t('finishOrder.customerDetails.requiredFirstName')
    if (!customer.telefon?.trim()) custErr.telefon = t('finishOrder.customerDetails.requiredPhone')
    else if (!phoneRe.test(customer.telefon)) custErr.telefon = t('finishOrder.customerDetails.invalidPhone')
    if (!customer.email?.trim()) custErr.email = t('finishOrder.customerDetails.requiredEmail')
    else if (!emailRe.test(customer.email)) custErr.email = t('finishOrder.customerDetails.invalidEmail')

    const delErr = {}
    if (isDelivery) {
      if (!delivery.localitate) delErr.localitate = t('finishOrder.deliveryDetails.requiredCity')

      if (!delivery.strada?.trim()) {
        delErr.strada = t('finishOrder.deliveryDetails.requiredStreet')
      } else if (!isValidStrada(delivery.strada)) {
        delErr.strada = t('finishOrder.deliveryDetails.invalidStreet')
      }

      if (!delivery.codPostal?.trim()) {
        delErr.codPostal = t('finishOrder.deliveryDetails.requiredPostalCode')
      } else if (!codPostalRe.test(delivery.codPostal)) {
        const onlyDigits = /^\d+$/.test(delivery.codPostal)
        delErr.codPostal = onlyDigits
          ? t('finishOrder.deliveryDetails.sixDigitsPostalCode')
          : t('finishOrder.deliveryDetails.invalidPostalCode')
      }
    }

    let paymentErr = ''
    if (!['Card', 'Numerar'].includes(paymentMethod)) {
      paymentErr = t('finishOrder.paymentRequired')
    }

    setErrors({ customer: custErr, delivery: delErr, payment: paymentErr })

    const ok = 
      Object.keys(custErr).length === 0 && 
      Object.keys(delErr).length === 0 &&
      !paymentErr

    if (!ok) {
      const firstErrorId =
        Object.keys(custErr)[0] ? `customer-${Object.keys(custErr)[0]}` :
        Object.keys(delErr)[0] ? `delivery-${Object.keys(delErr)[0]}` : 
        paymentErr ? 'payment-method' : null

      if (firstErrorId) {
        const el = document.getElementById(firstErrorId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    return ok
  }

  const handleSubmitOrder = async () => {
    if (!validate()) return
    
    const session_id = sessionStorage.getItem('session_id')
    const orderDraft = {
      session_id,
      customer,
      delivery: isDelivery ? delivery : null,
      payment_method: 'Card',
      note: note.trim() || null,
      summary: { totalProducts, deliveryTax, totalFinal }
    }
    
    try {
      setSubmitting(true)

      if (paymentMethod === 'Card') {
        sessionStorage.setItem('order_draft', JSON.stringify(orderDraft))

        const stripeRes = await fetch(`${API_URL}/api/stripe/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: Math.round(totalFinal * 100),
            metadata: {
              customer_email: customer.email
            }
          })
        })
        
        const stripeData = await stripeRes.json()
        
        if (!stripeRes.ok || !stripeData.url) {
          console.error('Stripe error:', stripeData.error)
          setSubmitting(false)
          return
        }
        
        window.location.href = stripeData.url
        return
      }
      
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          session_id,
          customer,
          delivery: isDelivery ? delivery : null,
          payment_method: 'Numerar',
          note: note.trim() || null,
          summary: { totalProducts, deliveryTax, totalFinal }
        })
      })
      const data = await res.json()
      if (!res.ok) {
        console.error(data.error)
        setSubmitting(false)
        return
      }

      setOrders([])
      setCartItemCount(0)
      await Promise.all([refreshOrders(), fetchCartItems()])
      setShowConfirm(true)
      setSubmitting(false)
    } catch (error) {
      console.error('Eroare order fetch:', error)
      setSubmitting(false)
    }
  }

  const handleCloseConfirm = () => {
    setShowConfirm(false)
  }

  const handleConfirmOk = async () => {
    await Promise.all([refreshOrders(), fetchCartItems()])
    navigate('/meniuri')
  }

  return (
  <div className='flex flex-col lg:flex-row justify-between max-w-[1440px] px-8 lg:px-4 mt-36 mx-auto gap-10
    pb-28 lg:pb-8
  '>
      <div className='w-full flex flex-col gap-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <button
              className='hover:bg-[#66635B]/10 active:bg-[#66635B]/30 rounded p-1 cursor-pointer transition-all'
              onClick={() => navigate('/meniuri')}
            >
              <ArrowUUpLeftIcon size={35} />
            </button>
            <h1 className='text-2xl font-semibold'>{t('finishOrder.title')}</h1>
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
          <h3 className='text-2xl font-semibold'>{t('finishOrder.deliveryMethod')}</h3>
          <div>
            <span className={isDelivery ? 'text-custom-red' : 'text-custom-gray'}>{t('finishOrder.atAddress')}</span>
            <Switch checked={!isDelivery} onChange={(e) => setIsDelivery(!e.target.checked)} color='error' />
            <span className={!isDelivery ? 'text-custom-red' : 'text-custom-gray'}>{t('finishOrder.pickup')}</span>
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
                validators={{strada: isValidStrada}}
              />
            </motion.div>
          )
          }
        </AnimatePresence>
        
        <PaymentMethod 
          value={paymentMethod} 
          onChange={setPaymentMethod}
          error={errors.payment}
        />

        <OrderNote noteValue={note} onChange={setNote} />
      </div>
      
      <div className='relative'>
        <div className={`max-h-[calc(100vh-5rem)] sticky top-20
          transition-all duration-500 ease-out ${scrolled ? 'translate-y-[40px]' : 'translate-y-0'}
        `}>
          <FinishedOrderSummary
            paymentMethod={paymentMethod}
            isDelivery={isDelivery}
            onSubmit={handleSubmitOrder}
            totalProducts={totalProducts}
            deliveryTax={deliveryTax}
            totalFinal={totalFinal}
            isSubmitting={submitting}
          />
        </div>
      </div>

      {showConfirm && (
        <ConfirmOrder
          open={showConfirm}
          onOk={handleConfirmOk}
          onClose={handleCloseConfirm} />
      )}
    </div>
  )
}
