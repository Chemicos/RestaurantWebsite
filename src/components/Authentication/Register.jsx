import { alpha, Switch } from '@mui/material'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import React, { useEffect, useRef, useState } from 'react'
import PassDifficulty from './PassDifficulty'

export default function Register({ setShowRegister, onClose }) {
  const ref = useRef()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeInput, setActiveInput] = useState(null)
  const [confirmPass, setConfirmPass] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [perJuridica, setPerJuridica] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(ref.current && !ref.current.contains(event.target)) {
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
    if(password.length === 0 && showPassword) {
      setShowPassword(false)
    }
  }, [password, showPassword])

  useEffect(() => {
    if(confirmPass.length === 0 && showConfirmPassword) {
      setShowConfirmPassword(false)
    }
  }, [confirmPass, showConfirmPassword])

  return (
    <div 
      ref={ref}
      className={`absolute right-8 top-16 w-80 bg-custom-white rounded-xl shadow-xl p-6 z-50 ${isClosing ? "animate-fade-out": "animate-fade-in"}`}
    >
      <form className='flex flex-col gap-5'>
        <h2 className='text-md'>Inregistrare cont</h2>

        <input 
          type="text" 
          placeholder='Nume'
          className='w-full px-3 py-2 border border-custom-gray rounded-lg 
          outline-none focus:ring-2 duration-300'
        />
        <input 
          type="text" 
          placeholder='Prenume'
          className='w-full px-3 py-2 border border-custom-gray rounded-lg 
          outline-none focus:ring-2 duration-300'
        />
        <input 
          type="email" 
          placeholder='E-mail'
          className='w-full px-3 py-2 border border-custom-gray rounded-lg 
          outline-none focus:ring-2 duration-300'
        />
        <input 
          type="text" 
          placeholder='Telefon'
          className='w-full px-3 py-2 border border-custom-gray rounded-lg 
          outline-none focus:ring-2 duration-300'
        />

        <div className='relative'>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder='Parola'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setActiveInput("password")}
            onBlur={() => setActiveInput("null")}
            className='w-full pl-3 pr-12 py-2 border border-custom-gray rounded-lg 
            outline-none focus:ring-2 duration-300'
          />

          {password.length > 0 && showPassword ? (
            <EyeSlashIcon
              weight='regular'
              size={25}
              className={`absolute inset-y-0 right-3 top-2 transition-opacity ${password ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeIcon 
              weight='regular' 
              size={25} 
              className={`absolute inset-y-0 right-3 top-2 transition-opacity ${password ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {password && <PassDifficulty password={password} isVisible={activeInput === "password"} />}

        <div className='relative'>
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder='Confirmare parola'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className='w-full px-3 py-2 border border-custom-gray rounded-lg 
            outline-none focus:ring-2 duration-300'
          />

          {confirmPass.length > 0 && showConfirmPassword ? (
            <EyeSlashIcon
              weight='regular'
              size={25}
              className={`absolute inset-y-0 right-3 top-2 transition-opacity ${confirmPass ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              onClick={() => setShowConfirmPassword(false)}
            />
          ) : (
            <EyeIcon 
              weight='regular' 
              size={25} 
              className={`absolute inset-y-0 right-3 top-2 transition-opacity ${confirmPass ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              onClick={() => setShowConfirmPassword(true)}
            />
          )}
        </div>

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

        <div className='flex gap-4'>
            <input 
              type="checkbox" 
              className='accent-red-600 cursor-pointer' 
            /> 
            <p className='text-md'>
              Am citit si sunt de acord cu <span className='text-red-600'>Termeni si conditii</span>
            </p>
        </div>

        <button 
          type="submit"
          className='w-full bg-custom-red hover:bg-red-700 text-custom-white font-semibold py-2 rounded-lg transition-colors cursor-pointer'
        >
          Inregistrare
        </button>
      </form>
      
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault
          setShowRegister(false)
        }}
        className='text-sm mt-3 inline-block text-custom-gray hover:underline'
      >
          Ai deja cont?
      </a>
    </div>
  )
}
