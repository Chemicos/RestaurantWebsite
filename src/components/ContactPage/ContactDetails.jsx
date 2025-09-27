import React from 'react'
import GoogleMapComponent from './GoogleMapComponent'
import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react'
import { useInView } from 'react-intersection-observer'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export default function ContactDetails() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div className='flex items-center min-h-[100svh] xl:min-h-screen'>
      <motion.div 
        className='bg-white grid lg:grid-cols-2 mt-20 items-center mx-auto shadow-lg'
        ref={ref}
        initial={{opacity: 0, y: 90}}
        animate={inView ? {opacity: 1, y:0} : {}}
        transition={{duration: 0.5, ease: 'easeOut'}}
      >
        <div className='w-full h-[300px] lg:h-full overflow-hidden'>
          <GoogleMapComponent />
        </div>

        <div className='flex flex-col gap-6 justify-center h-full p-5 sm:p-10 lg:py-20 xl:px-30'>
          <div className='w-full'>
            <h2 className='text-xl font-semibold sm:text-3xl text-center sm:text-start mb-4'>Ia legatura cu noi</h2>
            <p className='text-center sm:text-start text-custom-gray text-sm sm:text-md'>Suntem aici pentru tine. Ne poți contacta ușor folosind datele de mai jos.</p>
          </div>

          <div className='w-full h-[1px] bg-black/30'></div>

          <div className='flex flex-col gap-6 w-full text-md sm:text-xl'>
            <div className='flex gap-4'>
              <MapPinIcon size={30} weight='thin' color='#E7272C'/>
              <span className='text-custom-gray'>Strada Principala nr. 105, Clinceni</span>
            </div>
            <div className='flex gap-4'>
              <PhoneIcon size={30} weight='thin' color='#E7272C' />
              <span className='text-custom-gray'>0782984927</span>
            </div>
            <div className='flex gap-4'>
              <EnvelopeSimpleIcon size={30} weight='thin' color='#E7272C' />
              <span className='text-custom-gray'>comenzi@pizzeria.ro</span>
            </div>
          </div>
        </div>
      </motion.div >
    </div>
  )
}
