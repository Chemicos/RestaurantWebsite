import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProfileUserForm({value, onChange, errors = {}}) {
    const {t} = useTranslation()
    const handle = (field) => (e) => onChange(prev => ({...prev, [field]: e.target.value}))

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>{t('profile.form.userDetails')}</h3>
            <TextField
                label={t('profile.form.lastName')}
                variant='outlined'
                fullWidth
                value={value.nume}
                onChange={handle('nume')}
                slotProps={{input: {
                    readOnly: true
                }}}
            />

            <TextField 
                label={t('profile.form.firstName')}
                variant='outlined'
                fullWidth
                value={value.prenume}
                onChange={handle('prenume')}
                slotProps={{input: {
                    readOnly: true
                }}}
            />

            <TextField 
                label={t('profile.form.phone')}
                variant='outlined'
                fullWidth
                value={value.telefon}
                onChange={handle('telefon')}
                slotProps={{htmlInput: {
                    maxLength: 20
                }}}
            />

            <TextField 
                label={t('profile.form.email')}
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
            <h3 className='text-lg'>{t('profile.form.deliveryDetails')}</h3>
            
            <TextField
                id='delivery-localitate'
                select
                label={t('profile.form.city')}
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
                label={t('profile.form.street')}
                variant='outlined'
                fullWidth
                value={value.strada}
                onChange={handle('strada')}
                error={!!errors.strada}
                helperText={errors.strada || ''}
            />
        </div>
    </div>
  )
}
