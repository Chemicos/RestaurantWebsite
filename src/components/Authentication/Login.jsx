import { Alert, Box, CircularProgress, TextField, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SnackbarContext } from '../../contexts/SnackbarContext'
import { XIcon } from '@phosphor-icons/react'
import { useAuthWithCart } from '../MenusPage/hooks/useAuthWithCart'

export default function Login({ setShowRegister, onClose }) {
  const ref = useRef()
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {triggerSnackbar} = useContext(SnackbarContext)
  const { login } = useAuthWithCart()

  const API_URL = import.meta.env.VITE_API_URL

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
     if (!email || !isValidEmail(email) || !password) {
      setError(!isValidEmail(email) ? 'Email invalid' : 'Completeaza toate campurile')
      return
    }

    const session_id = sessionStorage.getItem('session_id')
    setIsLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, session_id })
      })

      if (res.ok) {
        await login() // Reapelează /api/me
        sessionStorage.removeItem('session_id')
        triggerSnackbar('Autentificare cu succes!')
        onClose()
      } else {
        const err = await res.json()
        setError(err.error || 'Eroare')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Eroare:', error)
      setError('Eroare server. Incearca din nou.')
      setIsLoading(false)
    }
  }

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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  
  return (
    <div 
      ref={ref}
      className={`bg-custom-white shadow-lg z-[1300] 
        ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}
        ${isMobile ? 'fixed flex flex-col justify-center top-0 left-0 w-screen h-screen rounded-none p-6' : 'absolute right-8 top-16 w-80 rounded-xl p-6'}
      `}
    >
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <h2 className='text-md font-semibold'>Contul meu</h2>
        <TextField
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '10px' 
            }
          }}
          InputLabelProps={{
            sx: {
              top: '3px',
            }
          }}
          variant='outlined'
          value={email}
          label='Email'
          error={error}
          type='email'
          size='small'
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          fullWidth
        />

        <TextField
         InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '10px' 
            } 
          }}
           InputLabelProps={{
            sx: {
              top: '3px',
            }
          }}
          variant="outlined"
          value={password}
          label="Parola"
          error={error}
          type="password"
          size="small"
          onChange={(e) => {
            setPassword(e.target.value)
            setError('')
          }}
          fullWidth
        />

        {error && (
          <Alert severity='error'>{error}</Alert>
        )}
        
        <button 
            type="submit"
            className='w-[140px] bg-custom-red h-[40px] hover:bg-red-700 text-custom-white 
            font-semibold py-2 px-3 rounded-lg transition-all active:scale-90 active:bg-red-700 cursor-pointer'
            onClick={handleSubmit}
        >

          {isLoading ? (
            <Box>
              <CircularProgress size={20} color='inherit' />
            </Box>
          ) : (
            <span>Conecteaza-ma</span>
          )}
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

      {isMobile && (
        <button
            onClick={onClose} 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-[#66635B]/30 cursor-pointer
            transition-all hover:bg-red-600 active:bg-red-600 hover:shadow-lg"
        >
            <XIcon size={20} weight="bold" />
        </button>
      )}
    </div>
  )
}
