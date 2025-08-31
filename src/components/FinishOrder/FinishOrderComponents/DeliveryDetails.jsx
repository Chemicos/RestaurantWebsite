import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'
import React from 'react'

export default function DeliveryDetails({value, onChange, errors = {}}) {
  const handle = (field) => (e) => onChange(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>Adresa de livrare</h3>

      <TextField
        id='delivery-localitate'
        select
        label='Localitate'
        fullWidth
        variant='outlined'
        value={value.localitate}
        onChange={handle('localitate')}
        error={!!errors.localitate}
        helperText={errors.localitate || ''}
      >
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Clinceni'>Clinceni</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Ordoreanu'>Ordoreanu</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Domnesti'>Domnesti</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Teghes'>Teghes</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Bragadiru'>Bragadiru</MenuItem>
      </TextField>

      <TextField
        id='delivery-strada'
        label='Strada...'
        variant='outlined'
        fullWidth
        value={value.strada}
        onChange={handle('strada')}
        error={!!errors.strada}
        helperText={errors.strada || ''}
      />

      <TextField
        id='delivery-codPostal'
        label='Cod Postal'
        variant='outlined'
        fullWidth
        value={value.codPostal}
        onChange={handle('codPostal')}
        error={!!errors.codPostal}
        helperText={errors.codPostal || ''}
      />
      
      <FormControlLabel
        control={<Checkbox sx={{
          '&.Mui-checked': {
            color: '#E7272C',
          }
        }} />}
        label='Comand pentru o alta persoana'
        sx={{ width: 'fit-content' }}
      />
    </div>
  )
}
