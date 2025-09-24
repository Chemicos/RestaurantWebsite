import React from 'react'
import ContactDetails from './ContactDetails'
import ContactUs from './ContactUs'
import { useUserDetails } from '../MenusPage/hooks/useUserDetails'

export default function ContactPage() {
  const { userDetails } = useUserDetails()

  const prefill = userDetails ? {
    email: userDetails.email || '',
    nume: `${userDetails.prenume || ''} ${userDetails.nume || ''}`.trim(),
    telefon: userDetails.telefon || ''
  } : {
    email: '',
    nume: '',
    telefon: ''
  }
  return (
    <div className='max-w-[1280px] mx-auto'>
      <div className='px-6 xl:px-0'>
        <ContactDetails />
      </div>

        <ContactUs prefill={prefill} />
    </div>
  )
}
