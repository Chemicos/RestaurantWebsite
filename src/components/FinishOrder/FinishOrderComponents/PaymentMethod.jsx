import { MenuItem, TextField } from '@mui/material'
import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'

export default function PaymentMethod({setPaymentMethod}) {
  const [method, setMethod] = useState('')

  const handleChange = (event) => {
    const selected = event.target.value
    setMethod(selected)
    setPaymentMethod(selected)
  }

  const getIcon = () => {
    switch (method) {
      case 'Card':
        return <CreditCardIcon size={45} />
      case 'Numerar':
        return <HandCoinsIcon size={45} />
      default:
        return <CreditCardIcon size={45} />
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>Metoda de plata</h3>

      <div className='flex items-center gap-3'>
        {getIcon()}

        <TextField
          select
          fullWidth
          label='Alege o metoda de plata'
          variant='standard'
          value={method}
          onChange={handleChange}
          sx={{
            '& .MuiInput-underline:after': {
              borderBottomColor: '#E7272C',
            },
            '& .MuiInputLabel-root': {
              color: '#66635B',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#E7272C',
            },
          }}
        >
          <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Card'>Card</MenuItem>
          <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Numerar'>Numerar</MenuItem>
        </TextField>
      </div>
    </div>
  )
}
