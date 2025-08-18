import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useUserDetails } from '../../MenusPage/hooks/useUserDetails'

export default function CustomerDetailsForm() {
  const {userDetails} = useUserDetails()

  const [formData, setFormData] = useState({
    prenume: '',
    nume: '',
    telefon: '',
    email: ''
  })

  useEffect(() => {
    if (userDetails) {
      setFormData({
        prenume: userDetails.prenume || '',
        nume: userDetails.nume || '',
        telefon: userDetails.telefon || '',
        email: userDetails.email || ''
      })
    } else {
      setFormData({
        prenume: '',
        nume: '',
        telefon: '',
        email: ''
      })
    }
  }, [userDetails])
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>Date personale</h3>
      <TextField
        label='Nume'
        variant='outlined'
        fullWidth
        value={formData.nume}
        onChange={(e) => setFormData(prev => ({...prev, nume: e.target.value}))}
      />

      <TextField
        label='Prenume'
        variant='outlined'
        fullWidth
        value={formData.prenume}
        onChange={(e) => setFormData(prev => ({...prev, prenume: e.target.value}))}
      />

      <TextField
        label='Telefon'
        variant='outlined'
        fullWidth
        value={formData.telefon}
        onChange={(e) => setFormData(prev => ({...prev, telefon: e.target.value}))}
      />

      <TextField
        label='Email'
        variant='outlined'
        fullWidth
        value={formData.email}
        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
      />
    </div>
  )
}
