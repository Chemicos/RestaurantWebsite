import React from 'react'
import ContactDetails from './ContactDetails'
import ContactUs from './ContactUs'

export default function ContactPage() {
  return (
    <div className='max-w-[1280px] mx-auto mt-20'>
      <div className='px-6 xl:px-0'>
        <ContactDetails />  
      </div>

        <ContactUs />
    </div>
  )
}
