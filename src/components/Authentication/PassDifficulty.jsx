import React from 'react'

export default function PassDifficulty({ password, isVisible = true }) {
    const criteria = [
        {id: 'minLength', text: 'Minim 6 caractere', isValid: password.length >= 6},
        {id: 'upperCase', text: 'Minim o majuscula', isValid: /[A-Z]/.test(password)},
        {
            id: 'numberOrSpecial',
            text: 'Cifre sau caractere speciale',
            isValid: /[0-9]/.test(password) || /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
    ]

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
    <div className='relative animate-fade-in'>
        {isVisible && (
            <ul className='absolute -left-56 top-2 w-52 bg-custom-white border border-gray-300 shadow-md rounded-b-xl rounded-tl-xl p-3 space-y-1 z-10'>
                {criteria.map(c => (
                    <li
                        key={c.id}
                        className={`flex items-center text-sm gap-2 ${c.isValid ? "text-emerald-500" : "text-custom-red"}`}
                    >
                        {c.text}
                    </li>
                ))}
            </ul>
        )}

      <div className='w-full bg-gray-300 rounded-full h-2.5 mb-2'>
        <div
            className={`h-2.5 rounded-full transition-all duration-300 ${progressColor}`}
            style={{width: `${progressWidth}%`}}
        />
      </div>
    </div>
  )
}
