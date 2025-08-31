import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'

export default function CustomerDetailsForm({ value, onChange, errors = {}}) {
  const handle = (field) => (e) => onChange(prev => ({...prev, [field]: e.target.value}))

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>Date personale</h3>
      <TextField
        id='customer-nume'
        label='Nume'
        variant='outlined'
        fullWidth
        value={value.nume}
        onChange={handle('nume')}
        error={!!errors.nume}
        helperText={errors.nume || ''}
      />

      <TextField
        id='customer-prenume'
        label='Prenume'
        variant='outlined'
        fullWidth
        value={value.prenume}
        onChange={handle('prenume')}
        error={!!errors.prenume}
        helperText={errors.prenume || ''}
      />

      <TextField
        id='customer-telefon'
        label='Telefon'
        variant='outlined'
        fullWidth
        value={value.telefon}
        onChange={handle('telefon')}
        error={!!errors.telefon}
        helperText={errors.telefon || ''}
      />

      <TextField
        id='customer-email'
        label='Email'
        variant='outlined'
        fullWidth
        value={value.email}
        onChange={handle('email')}
        error={!!errors.email}
        helperText={errors.email || ''}
      />
    </div>
  )
}
