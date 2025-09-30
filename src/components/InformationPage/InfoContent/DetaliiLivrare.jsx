import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import React from 'react'

export default function DetaliiLivrare() {
  return (
    <div className='flex flex-col items-start text-start prose max-w-none'>
        <h1 className='text-3xl font-semibold'>Detalii Livrare</h1>

        <h2 className='text-xl mt-4'>Cum livrăm comanda ta?</h2>
        <p className='text-custom-gray mt-2'>Pizzeria Clinceni iți oferă livrare rapidă și sigură, astfel încat să te bucuri de pizza proaspătă și delicioasă direct la tine acasă!</p>

        <h2 className='text-xl mt-4'>Zona de Livrare</h2>
        <p className='text-custom-gray mt-2'>Luni-Vineri: <span className='font-bold text-custom-red'>10:30 - 21:00</span></p>
        <p className='text-custom-gray mt-2'>Weekend: <span className='font-bold text-custom-red'>12:00 - 21:00</span></p>

        <h2 className='text-xl mt-4'>Timp Estimat de Livrare</h2>
        <p className='text-custom-gray mt-2'>În funcție de locația ta și volumul comenzilor, timpul mediu de livrare este între <span className='font-bold text-custom-red'>30 - 60 de minute</span>.</p>

        <h2 className='text-xl mt-4'>Costul Livrarii</h2>
        <p className='text-custom-gray mt-2'>Livrare gratuită pentru comenzile de peste <span className='font-bold text-custom-red'>50 lei</span>.</p>
        <p className='text-custom-gray mt-2'>Pentru comenzile sub aceasta suma, se aplica o taxa de livrare de <span className='font-bold text-custom-red'>8 lei</span>.</p>

        <h2 className='text-xl mt-4'>Modalități de Plată</h2>
        <div className='flex flex-row gap-2 items-center mt-2'>
            <CreditCardIcon color='#E7272C' size={35} />
            <p className='text-custom-red'>Plată Card la Livrare.</p>
        </div>
        <div className='flex flex-row gap-2 items-center mt-2'>
            <HandCoinsIcon color='#E7272C' size={35} />
            <p className='text-custom-red'>Plată Numerar la livrare.</p>
        </div>
    </div>
  )
}
