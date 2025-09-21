import React from 'react'
import { useInView } from 'react-intersection-observer'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion' 

export default function ContactUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <div className='flex items-center justify-center min-h-[100svh] xl:min-h-screen'>
      <motion.div
        ref={ref}
        initial={{opacity: 0, y: 90}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.5, ease: 'easeOut'}}
        className='w-full md:w-[640px] px-6 md:px-0'
      >
        <form className='w-full flex flex-col'>
          <h2 className='font-semibold text-3xl mb-10 text-center'>Contacteaza-ne</h2>

          <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row gap-4'>
                <input 
                    type="email" 
                    placeholder='Email'
                    className='flex-1 bg-white p-3 shadow focus:outline-none transition-all hover:shadow-lg focus:shadow-lg'
                />
                <input 
                    type="text" 
                    placeholder='Nume'
                    className='flex-1 bg-white p-3 shadow focus:outline-none transition-all hover:shadow-lg focus:shadow-lg'
                />
            </div>
            
            <input 
                type="text" 
                placeholder='Telefon'
                className='bg-white p-3 shadow focus:outline-none transition-all hover:shadow-lg focus:shadow-lg'
            />

            <textarea
                placeholder='Mesaj'
                rows={6}
                className='bg-white p-3 shadow focus:outline-none resize-none transition-all hover:shadow-lg focus:shadow-lg'
            />

            <button
                type='submit'
                className='bg-custom-red text-white font-medium py-3 w-32 rounded self-center hover:bg-red-800 cursor-pointer transition-all
                active:scale-90'
            >
                Trimite
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
