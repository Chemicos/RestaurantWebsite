import { MenuItem, TextField } from '@mui/material'
import React from 'react'

export default function ProfileUserForm() {
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>Detalii Utilizator</h3>
            <TextField
                label='Nume'
                variant='outlined'
                fullWidth
            />

            <TextField 
                label='Prenume'
                variant='outlined'
                fullWidth
            />

            <TextField 
                label='Telefon'
                variant='outlined'
                fullWidth
            />

            <TextField 
                label='Email'
                variant='outlined'
                fullWidth
            />
        </div>

        <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>Detalii Livrare</h3>
            
            <TextField
                id='delivery-localitate'
                select
                label='Localitate'
                fullWidth
                variant='outlined'
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
            />

            <TextField
                id='delivery-codPostal'
                label='Cod Postal'
                variant='outlined'
                fullWidth
            />
        </div>
    </div>
  )
}
