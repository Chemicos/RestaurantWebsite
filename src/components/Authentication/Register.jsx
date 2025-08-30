import { Alert, alpha, Box, CircularProgress, IconButton, InputAdornment, Switch, TextField, useMediaQuery } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PassDifficulty from './PassDifficulty'
import { SnackbarContext } from '../../contexts/SnackbarContext'
import { AuthContext } from '../../contexts/AuthContext'
import { XIcon } from '@phosphor-icons/react'

export default function Register({ setShowRegister, onClose }) {
  const ref = useRef()
  const [nume, setNume] = useState('')
  const [prenume, setPrenume] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeInput, setActiveInput] = useState(null)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [showPassTooltip, setShowPassTooltip] = useState(false)
  const [confirmPass, setConfirmPass] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [perJuridica, setPerJuridica] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const [passwordMatch, setPasswordMatch] = useState(true)
  const [fieldErrors, setFieldErrors] = useState({
    nume: false,
    prenume: false,
    email: false,
    password: false,
    confirmPass: false
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {triggerSnackbar} = useContext(SnackbarContext)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { login } = useContext(AuthContext)

  const API_URL = import.meta.env.VITE_API_URL

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!nume || !prenume || !email || !isValidEmail(email) || !password || !confirmPass) {
      setFieldErrors({
        nume: !nume,
        prenume: !prenume,
        email: !email || !isValidEmail(email),
        password: !password,
        confirmPass: !confirmPass
      })
      setError(!isValidEmail(email) ? 'Email invalid' : 'Completeaza toate campurile obligatorii.')
      return
    }
    if(password !== confirmPass) {
      setFieldErrors(prev => ({...prev, confirmPass: true}))
      setError('Parolele nu coincid')
      return
    } 

    setIsLoading(true)
    const session_id = sessionStorage.getItem('session_id')

    const registerData = {
      nume,
      prenume,
      email,
      telefon,
      parola: password,
      tip_persoana: perJuridica ? 'juridica' : 'fizica',
      session_id
    }

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerData)
      })
      const result = await res.json()
      if(res.ok) {
        await login()
        
        sessionStorage.removeItem('session_id')
        setTimeout(() => {
          triggerSnackbar('Cont creat cu succes!')
          setIsLoading(false)
          setShowRegister(false)
          onClose()
        }, 1000)
      } else {
        setError(result.error || 'Eroare la inregistrare')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Eroare fetch:', error)
      setError('Eroare la conexiunea cu serverul.')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (confirmPass.length > 0) {
      setPasswordMatch(password === confirmPass)
    } else {
      setPasswordMatch(true)
    }
  }, [password, confirmPass])

  useEffect(() => {
    let timeout
    if (isPasswordFocused) {
      setShowPassTooltip(true)
    } else {
      timeout = setTimeout(() => {
        setShowPassTooltip(false)
      }, 100)
    }
    return () => clearTimeout(timeout)
  }, [isPasswordFocused])
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(ref.current && !ref.current.contains(event.target)) {
        setIsClosing(true)
        setTimeout(() => {
          onClose()
        }, 400)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref, onClose])

  useEffect(() => {
    if(password.length === 0 && showPassword) {
      setShowPassword(false)
    }
  }, [password, showPassword])

  useEffect(() => {
    if(confirmPass.length === 0 && showConfirmPassword) {
      setShowConfirmPassword(false)
    }
  }, [confirmPass, showConfirmPassword])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div 
      ref={ref}
      className={`bg-custom-white shadow-xl z-50 
        ${isClosing ? "animate-fade-out": "animate-fade-in"}
        ${isMobile ? 'fixed flex flex-col justify-center top-0 left-0 h-screen w-screen rounded-none p-6 overflow-y-auto' 
          : 'absolute right-8 top-16 w-80 rounded-xl p-6'}
      `}
    >
      <form className='flex flex-col gap-5'>
        <h2 className='text-md font-semibold'>Inregistrare cont</h2>

        <TextField
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '0.5rem' 
            }
          }}
          InputLabelProps={{
            sx: {
              top: '3px',
            }
          }}
          variant='outlined'
          value={nume}
          label='Nume*'
          error={fieldErrors.nume}
          type='text'
          size='small'
          onChange={(e) => {
            setNume(e.target.value)
            setFieldErrors(prev => ({...prev, nume: false}))
            setError('')
          }}
          fullWidth
        />

        <TextField
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '0.5rem' 
            }
          }}
          InputLabelProps={{
            sx: {
              top: '3px',
            }
          }}
          variant='outlined'
          value={prenume}
          label='Prenume*'
          error={fieldErrors.prenume}
          type='text'
          size='small'
          onChange={(e) => {
            setPrenume(e.target.value)
            setFieldErrors(prev => ({...prev, prenume: false}))
            setError('')
          }}
          fullWidth
        />

        <TextField
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '0.5rem' 
            }
          }}
          InputLabelProps={{
            sx: {
              top: '3px',
            }
          }}
          variant='outlined'
          value={email}
          label='E-mail*'
          error={fieldErrors.email}
          type='email'
          size='small'
          onChange={(e) => {
            setEmail(e.target.value)
            setFieldErrors(prev => ({...prev, email: false}))
            setError('')
          }}
          fullWidth
        />

        <TextField
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '0.5rem' 
            }
          }}
          InputLabelProps={{
            sx: {
              top: '3px',
            }
          }}
          variant='outlined'
          value={telefon}
          label='Telefon'
          type='text'
          size='small'
          onChange={(e) => setTelefon(e.target.value)}
          fullWidth
        />

        <TextField
          label="Parola*"
          error={fieldErrors.password}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setFieldErrors(prev => ({...prev, password: false}))
            setError('')
          }}
          fullWidth
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          size="small"
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '0.5rem'
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => setShowPassword(prev => !prev)}
                  edge="end"
                  disabled={password.length === 0}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              top: '3px'
            }
          }}
        />

          {password.length > 0 && showPassTooltip && (
            isMobile 
              ? <PassDifficulty password={password} isVisible={isPasswordFocused} />
              : <div className='relative'>
                  <PassDifficulty password={password} isVisible={isPasswordFocused} />
                </div>
          )}

        <TextField
          label="Confirma parola*"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value)
            setFieldErrors(prev => ({...prev, confirmPass: false}))
            setError('')
          }}
          fullWidth
          onFocus={() => setActiveInput("confirmPass")}
          onBlur={() => setActiveInput(null)}
          size="small"
          error={!passwordMatch || fieldErrors.confirmPass}
          helperText={!passwordMatch ? 'Parolele nu coincid' : ''}
          InputProps={{
            sx: {
              py: 0.5,
              borderRadius: '0.5rem'
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  edge="end"
                  disabled={confirmPass.length === 0}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              top: '3px'
            }
          }}
        />

        <div className='flex items-center gap-2'>
          <span className={perJuridica ? "text-gray-500" : "text-red-600 font-semibold"}>
            Fizica
          </span>

          <Switch
            checked={perJuridica}
            onChange={(e) => setPerJuridica(e.target.checked)}
            color='default'
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#D22B2B',
                '&:hover': {
                  backgroundColor: alpha('#D22B2B', 0.1)
                }
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#66635B',
              },
              '& .MuiSwitch-track': {
                backgroundColor: '#66635B',
              },
            }}
          />

          <span className={perJuridica ? "text-red-600 font-bold" : "text-gray-500"}>
            Juridica
          </span>
        </div>

        {error && (
          <Alert severity='error'>{error}</Alert>
        )}

        <button 
          type="submit"
          className='w-full h-[40px] bg-custom-red hover:bg-red-700 text-custom-white font-semibold py-2 rounded-lg 
          transition-all active:scale-90 active:bg-red-700 cursor-pointer'
          onClick={handleSubmit}
        >
          {isLoading ? (
            <Box>
              <CircularProgress size={20} color='inherit' />
            </Box>
          ) : (
            <span>Inregistreaza</span>
          )}
        </button>
      </form>
      
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault()
          setShowRegister(false)
        }}
        className='text-sm mt-3 inline-block text-custom-gray hover:underline'
      >
          Ai deja cont?
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
