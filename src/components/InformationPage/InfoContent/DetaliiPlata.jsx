import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import React from 'react'

export default function DetaliiPlata() {
  return (
    <div className='prose max-w-none'>
        <h1 className='text-3xl font-semibold'>Detalii Plata</h1>

        <div className='flex flex-row items-center gap-2 mt-4'>
            <h2 className='text-xl'>Plata card la livrare</h2>
            <CreditCardIcon size={35} color='#E7272C' />
        </div>

        <p className='text-custom-gray mt-2'>
            Poti opta pentru plata comenzii cu cardul bancar. Tranzactia va fi efectuata in conditii de siguranta si confidentialitate depline, sigur si rapid prin intermediul procesorului de plati online Netopia Payments.
        </p>

        <div className='flex flex-row items-center gap-2 mt-4'>
            <h2 className='text-xl'>Plata Numerar</h2>
            <HandCoinsIcon size={35} color='#E7272C' />
        </div>

        <p className='text-custom-gray mt-2'>
            In aceasta varianta plata comenzii se va face in numerar la livrare. Vei plati direct agentului de livrare in momentul in care iti sunt livrate produsele, iar acesta iti va emite o chitanta. Produsele comandate si taxa de transport trebuie achitate integral.
        </p>
        <p className='text-custom-gray mt-2'>
            Pizzeria Clineci ofera livrare la domiciliu in zonele 
            <span className='font-semibold'> Clinceni, Domnesti, Bragadiru, Teghes si Ordoreanu. </span>
            Pentru a beneficia de livrare gratuita, este necesar ca valoarea minima a comenzii sa fie de 50 de lei. Pentru comenzile sub aceasta suma, se aplica o taxa de livrare de 20 de lei. Pentru detalii suplimentare sau pentru a plasa o comanda,
            puteti contacta Pizzeria Clinceni la numarul de telefon <span className='font-semibold'>0000000000</span> sau prin e-mail la adresa <span className='font-semibold'>comenzi@pizzeriaclinceni.ro</span>.

        </p>
    </div>
  )
}
