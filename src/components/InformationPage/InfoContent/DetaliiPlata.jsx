import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import React from 'react'

export default function DetaliiPlata() {
  return (
    <div className='prose max-w-none'>
        <h1 className='text-3xl font-semibold'>Detalii Plată</h1>

        <div className='flex flex-row items-center gap-2 mt-4'>
            <h2 className='text-xl'>Plată card la livrare</h2>
            <CreditCardIcon size={35} color='#E7272C' />
        </div>

        <p className='text-custom-gray mt-2'>
            Poți opta pentru plata comenzii cu cardul bancar. Tranzacția va fi efectuată în condiții de siguranță și confidențialitate depline, sigur și rapid, prin intermediul procesorului de plăți online.
        </p>

        <div className='flex flex-row items-center gap-2 mt-4'>
            <h2 className='text-xl'>Plată Numerar</h2>
            <HandCoinsIcon size={35} color='#E7272C' />
        </div>

        <p className='text-custom-gray mt-2'>
            În această variantă, plata comenzii se va face în numerar la livrare. Vei plăti direct agentului de livrare în momentul în care îți sunt livrate produsele, iar acesta îți va emite o chitanță. Produsele comandate și taxa de transport trebuie achitate integral.
        </p>
        <p className='text-custom-gray mt-2'>
            Pizzeria Clinceni oferă livrare la domiciliu în zonele 
            <span className='font-semibold'> Clinceni, Domnești, Bragadiru, Țegheș și Ordoreanu. </span>
            Pentru a beneficia de livrare gratuită, este necesar ca valoarea minimă a comenzii să fie de 50 de lei. Pentru comenzile sub această sumă, se aplică o taxă de livrare de 8 lei. Pentru detalii suplimentare sau pentru a plasa o comandă, puteți contacta Pizzeria Clinceni la numărul de telefon
            <span className='font-semibold'> 0000000000</span> sau prin e-mail la adresa <span className='font-semibold'>comenzi@pizzeria.ro</span>.

        </p>
    </div>
  )
}
