import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DetaliiPlata() {
    const {t} = useTranslation()
  return (
    <div className='prose max-w-none'>
        <h1 className='text-3xl font-semibold'>{t('paymentDetails.title')}</h1>

        <div className='flex flex-row items-center gap-2 mt-4'>
            <h2 className='text-xl'>{t('paymentDetails.cardTitle')}</h2>
            <CreditCardIcon size={35} color='#E7272C' />
        </div>

        <p className='text-custom-gray mt-2'>
            {t('paymentDetails.cardText')}
        </p>

        <div className='flex flex-row items-center gap-2 mt-4'>
            <h2 className='text-xl'>{t('paymentDetails.cashTitle')}</h2>
            <HandCoinsIcon size={35} color='#E7272C' />
        </div>

        <p className='text-custom-gray mt-2'>
            {t('paymentDetails.cashText')}
        </p>
        <p className='text-custom-gray mt-2'>
            {t('paymentDetails.zonesText')} 
            <span className='font-semibold'> {t('paymentDetails.zones')} </span>
            {t('paymentDetails.freeDeliveryText')}
            <span className='font-semibold'> 0000000000</span> {t('paymentDetails.freeDeliveryText1')} <span className='font-semibold'>comenzi@pizzeria.ro</span>.

        </p>
    </div>
  )
}
