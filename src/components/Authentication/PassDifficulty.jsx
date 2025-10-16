import { useMediaQuery } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PassDifficulty({ password, isVisible = true }) {
    const {t} = useTranslation()
    const criteria = [
        {id: 'minLength', text: t('register.passwordValidation.minLength'), isValid: password.length >= 6},
        {id: 'upperCase', text: t('register.passwordValidation.upperCase'), isValid: /[A-Z]/.test(password)},
        {
            id: 'numberOrSpecial',
            text: t('register.passwordValidation.numberOrSpecial'),
            isValid: /[0-9]/.test(password) || /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
    ]
    
    const isMobile = useMediaQuery(`(max-width: 768px)`)
    const validCount = criteria.filter(c => c.isValid).length

    const progressColor =(() => {
        switch (validCount) {
            case 1: return 'bg-custom-red';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-emerald-500';
            default: return 'bg-gray-300';
        }
    })()

    const progressWidth = (validCount / 3) * 100

  return (
    <div className={`relative transition-all
        ${isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0 animate-fade-out'}`}
    >
        {(isMobile ? password.length > 0 : isVisible) && (
           <div className={`space-y-1 
                ${isMobile 
                    ? 'static w-full px-2' 
                    : 'absolute -left-56 top-2 w-52 bg-custom-white border border-gray-300 shadow-md rounded-b-xl rounded-tl-xl p-4 z-10'
                }
           `}>
                <ul className='space-y-1'>
                {criteria.map(c => (
                    <li
                    key={c.id}
                    className={`flex items-center text-sm gap-2 ${c.isValid ? "text-emerald-500" : "text-custom-red"}`}
                    >
                    {c.text}
                    </li>
                ))}
                </ul>

                <div className='w-full bg-gray-300 rounded-full h-2.5 mt-3'>
                <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${progressColor}`}
                    style={{ width: `${progressWidth}%` }}
                />
                </div>
            </div>
        )}
    </div>
  )
}
