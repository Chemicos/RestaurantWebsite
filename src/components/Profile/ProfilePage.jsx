import React, { useEffect, useState } from 'react'
import ProfileUserForm from './ProfileUserForm'
import ProfileSaveChanges from './ProfileSaveChanges'
import { useUserDetails } from '../MenusPage/hooks/useUserDetails'
import { Alert, Snackbar } from '@mui/material'

const EMPTY = {
  nume: '', prenume: '', telefon: '', email: '',
  localitate: '', strada: '', codPostal: ''
}

export default function ProfilePage() {
  const {userDetails, refreshUserDetails} = useUserDetails()
  const [form, setForm] = useState(EMPTY)

  const [saveToastOpen, setSaveToastOpen] = useState(false)
  const handleCloseToast = (_, reason) => {
    if(reason === 'clickaway') return
    setSaveToastOpen(false)
  }
  
  useEffect(() => {
    if(userDetails) {
      setForm(prev => ({
        ...prev,
        nume: userDetails.nume || '',
        prenume: userDetails.prenume || '',
        telefon: userDetails.telefon || '',
        email: userDetails.email || '',
        localitate: userDetails.localitate || '',
        strada: userDetails.strada || '',
        codPostal: userDetails.cod_postal || ''
      }))
    } else {
      setForm({
        nume: '', prenume: '', telefon: '', email: '',
        localitate: '', strada: '', codPostal: ''
      })
    }
  }, [userDetails])

  return (
    <div className='flex flex-col gap-6 max-w-[680px] px-8 lg:px-4 py-8 mx-auto'>
      <h1 className='text-2xl'>Editeaza Profil</h1>
      <p className='text-custom-gray'>Scapa de necesitatea de a completa datele la fiecare comanda.</p>

      <ProfileUserForm
        value={form}
        onChange={setForm}
      />
      <ProfileSaveChanges 
        value={form} 
        onSaved={async () => {
          await refreshUserDetails()
          setSaveToastOpen(true)
        }}
      />

      <Snackbar
        open={saveToastOpen}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert
          onClose={handleCloseToast}
          severity='success'
          variant='filled'
          sx={{width: '100%'}}
        >
          Profilul a fost actualizat cu succes!
        </Alert>
      </Snackbar>
    </div>
  )
}
