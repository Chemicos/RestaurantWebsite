import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DetaliiLivrare() {
  const {t} = useTranslation()
  return (
    <div className='flex flex-col items-start text-start prose max-w-none'>
        <h1 className='text-3xl font-semibold'>{t('deliveryDetails.title')}</h1>

        <h2 className='text-xl mt-4'>{t('deliveryDetails.subtitle')}</h2>
        <p className='text-custom-gray mt-2'>{t('deliveryDetails.howWeDeliverText')}</p>

        <h2 className='text-xl mt-4'>{t('deliveryDetails.zoneTitle')}</h2>
        <p className='text-custom-gray mt-2'>{t('deliveryDetails.weekdays')} <span className='font-bold text-custom-red'>10:30 - 21:00</span></p>
        <p className='text-custom-gray mt-2'>Weekend: <span className='font-bold text-custom-red'>12:00 - 21:00</span></p>

        <h2 className='text-xl mt-4'>{t('deliveryDetails.timeTitle')}</h2>
        <p className='text-custom-gray mt-2'>{t('deliveryDetails.timeText')} <span className='font-bold text-custom-red'>{t('deliveryDetails.timeValue')}</span>.</p>

        <h2 className='text-xl mt-4'>{t('deliveryDetails.costTitle')}</h2>
        <p className='text-custom-gray mt-2'>{t('deliveryDetails.freeDelivery')} <span className='font-bold text-custom-red'>50 RON</span>.</p>
        <p className='text-custom-gray mt-2'>{t('deliveryDetails.paidDelivery')} <span className='font-bold text-custom-red'>8 RON</span>.</p>

        <h2 className='text-xl mt-4'>{t('deliveryDetails.paymentTitle')}</h2>
        <div className='flex flex-row gap-2 items-center mt-2'>
            <CreditCardIcon color='#E7272C' size={35} />
            <p className='text-custom-red'>{t('deliveryDetails.cardPayment')}</p>
        </div>
        <div className='flex flex-row gap-2 items-center mt-2'>
            <HandCoinsIcon color='#E7272C' size={35} />
            <p className='text-custom-red'>{t('deliveryDetails.cashPayment')}</p>
        </div>
    </div>
  )
}
