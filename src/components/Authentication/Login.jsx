import { Alert, Box, CircularProgress, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SnackbarContext } from '../../contexts/SnackbarContext'
import { AuthContext } from '../../contexts/AuthContext'

export default function Login({ setShowRegister, onClose }) {
  const ref = useRef()
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {triggerSnackbar} = useContext(SnackbarContext)
  const { login } = useContext(AuthContext)

  const API_URL = import.meta.env.VITE_API_URL
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if(!email || !parola) {
      setError('Completeaza toate campurile')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/login`,  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, parola})
      })

      const result = await res.json()

      if(res.ok) {
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000
        const data = {id: result.user.id, prenume: result.user.prenume, expiry}
        login(data)

        sessionStorage.setItem('user_id', result.user.id)
        setTimeout(() => {
          setIsLoading(false)
          triggerSnackbar('Autentificare cu succes!')
          onClose()
        }, 1000)
      } else {
        setError(result.error || 'Autentificare esuata')
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
  
  return (
    <div 
      ref={ref}
      className={`absolute right-8 top-16 w-80 bg-custom-white rounded-xl shadow-lg p-6 z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
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
          label='E-mail'
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
          value={parola}
          label="Parola"
          error={error}
          type="password"
          size="small"
          onChange={(e) => {
            setParola(e.target.value)
            setError('')
          }}
          fullWidth
        />

        {error && (
          <Alert severity='error'>{error}</Alert>
        )}
        
        <button 
            type="submit"
            className='w-[140px] bg-custom-red h-[40px] hover:bg-red-700 text-custom-white font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer'
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
    </div>
  )
}
