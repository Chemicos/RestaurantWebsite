import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'
import React from 'react'

export default function DeliveryDetails() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>Adresa de livrare</h3>

      <TextField
        select
        label='Localitate'
        fullWidth
        defaultValue=''
        variant='outlined'
      >
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Clinceni'>Clinceni</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Ordoreanu'>Ordoreanu</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Domnesti'>Domnesti</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Teghes'>Teghes</MenuItem>
        <MenuItem sx={{'&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Bragadiru'>Bragadiru</MenuItem>
      </TextField>

      <TextField
        label='Strada...'
        variant='outlined'
        fullWidth
      />

      <TextField
        label='Cod Postal'
        variant='outlined'
        fullWidth
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
