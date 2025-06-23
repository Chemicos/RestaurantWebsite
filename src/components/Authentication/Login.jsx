import React, { useEffect, useRef, useState } from 'react'

export default function Login({ setShowRegister, onClose }) {
  const ref = useRef()
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClosing(true)
        setTimeout(() => {
          onClose()  
        }, 400);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref, onClose])
  
  return (
    <div 
      ref={ref}
      className={`absolute right-8 top-16 w-80 bg-custom-white rounded-xl shadow-lg p-6 z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
    >
      <form className='flex flex-col gap-5'>
        <h2 className='text-md font-semibold'>Contul meu</h2>
        <input 
            type="email" 
            placeholder='Adresa de email' 
            className='w-full px-3 py-2 border border-custom-gray rounded-lg outline-none focus:ring-2 duration-300' 
        />

        <input 
            type="password" 
            placeholder='Parola' 
            className='w-full px-3 py-2 border border-custom-gray rounded-lg outline-none focus:ring-2 duration-300'
        />
        
        <button 
            type="submit"
            className='w-fit bg-custom-red hover:bg-red-700 text-custom-white font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer'
        >
            Conecteaza-ma
        </button>
      </form>

      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setShowRegister(true)
        }}
        className='text-sm mt-3 inline-block text-custom-gray hover:underline'
      >
        Nu ai cont?
      </a>
    </div>
  )
}
