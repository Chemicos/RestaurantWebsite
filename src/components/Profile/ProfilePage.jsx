import React, { useEffect, useState } from 'react'
import ProfileUserForm from './ProfileUserForm'
import ProfileSaveChanges from './ProfileSaveChanges'
import { useUserDetails } from '../MenusPage/hooks/useUserDetails'
import { Alert, Snackbar } from '@mui/material'
import { useTranslation } from 'react-i18next'

const EMPTY = {
  nume: '', prenume: '', telefon: '', email: '',
  localitate: '', strada: ''
}

const normalizeSpaces = (s) => s.replace(/\s+/g, ' ').trim()
const stradaAllowedRe = /^[A-Za-z0-9 .,'/-]+$/
const stradaHasDigitRe = /\d/

export default function ProfilePage() {
  const {t} = useTranslation()
  const {userDetails, refreshUserDetails} = useUserDetails()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const [saveToastOpen, setSaveToastOpen] = useState(false)
  const handleCloseToast = (_, reason) => {
    if(reason === 'clickaway') return
    setSaveToastOpen(false)
  }

  const isValidStrada = (raw) => {
    const s = normalizeSpaces(raw || '')
    if (s.length < 5 || s.length > 80) return false
    if (!stradaAllowedRe.test(s)) return false
    if (!stradaHasDigitRe.test(s)) return false
    return true
  }

  const validate = () => {
    const errs = {}

    if (!form.strada?.trim()) {
      errs.strada = t('profile.errors.streetRequired')
    } else if (!isValidStrada(form.strada)) {
      errs.strada = t('profile.errors.streetInvalid')
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
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
        strada: userDetails.strada || ''
      }))
    } else {
      setForm({
        nume: '', prenume: '', telefon: '', email: '',
        localitate: '', strada: ''
      })
    }
  }, [userDetails])

  return (
    <div className='flex flex-col gap-6 max-w-[680px] px-8 lg:px-4 my-36 mx-auto'>
      <h1 className='text-2xl'>{t('profile.title')}</h1>
      <p className='text-custom-gray'>{t('profile.subtitle')}</p>

      <ProfileUserForm
        value={form}
        onChange={setForm}
        errors={errors}
      />
      <ProfileSaveChanges 
        value={form} 
        validate={validate}
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
          {t('profile.successMessage')}
        </Alert>
      </Snackbar>
    </div>
  )
}
