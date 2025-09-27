import { MenuItem, TextField } from '@mui/material'
import React from 'react'

export default function ProfileUserForm({value, onChange}) {
    const handle = (field) => (e) => onChange(prev => ({...prev, [field]: e.target.value}))

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>Detalii Utilizator</h3>
            <TextField
                label='Nume'
                variant='outlined'
                fullWidth
                value={value.nume}
                onChange={handle('nume')}
                slotProps={{input: {
                    readOnly: true
                }}}
            />

            <TextField 
                label='Prenume'
                variant='outlined'
                fullWidth
                value={value.prenume}
                onChange={handle('prenume')}
                slotProps={{input: {
                    readOnly: true
                }}}
            />

            <TextField 
                label='Telefon'
                variant='outlined'
                fullWidth
                value={value.telefon}
                onChange={handle('telefon')}
            />

            <TextField 
                label='Email'
                variant='outlined'
                fullWidth
                value={value.email}
                onChange={handle('email')}
                slotProps={{input: {
                    readOnly: true
                }}}
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
                value={value.localitate}
                onChange={handle('localitate')}
                slotProps={{select: {
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                backgroundColor: '#f9f9f9',
                                paddingX: '10px',
                                borderRadius: '10px'
                            }
                        }
                    }
                }}}
            >
                <MenuItem sx={{borderRadius: '10px', marginBottom: '5px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Clinceni'>Clinceni</MenuItem>
                <MenuItem sx={{borderRadius: '10px', marginBottom: '5px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Ordoreanu'>Ordoreanu</MenuItem>
                <MenuItem sx={{borderRadius: '10px', marginBottom: '5px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Domnesti'>Domnești</MenuItem>
                <MenuItem sx={{borderRadius: '10px', marginBottom: '5px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Teghes'>Țegheș</MenuItem>
                <MenuItem sx={{borderRadius: '10px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Bragadiru'>Bragadiru</MenuItem>
            </TextField>

            <TextField
                id='delivery-strada'
                label='Stradă...'
                variant='outlined'
                fullWidth
                value={value.strada}
                onChange={handle('strada')}
            />

            <TextField
                id='delivery-codPostal'
                label='Cod Poștal'
                variant='outlined'
                fullWidth
                value={value.codPostal}
                onChange={handle('codPostal')}
                slotProps={{htmlInput: {maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*'}}}
            />
        </div>
    </div>
  )
}
