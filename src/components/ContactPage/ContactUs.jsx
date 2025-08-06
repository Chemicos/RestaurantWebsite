import React from 'react'

export default function ContactUs() {
  return (
    <form className='w-full md:w-[640px] mt-20 flex flex-col mx-auto px-4 md:px-0'>
      <h2 className='font-semibold text-3xl mb-20 text-center'>Contacteaza-ne</h2>

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
  )
}
