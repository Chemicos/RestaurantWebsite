import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function CustomerDetailsForm({ 
  value, onChange, errors = {}, validators = {}
}) {
  const {t} = useTranslation()
  const handle = (field) => (e) => onChange(prev => ({...prev, [field]: e.target.value}))
  
  const isNonEmpty = (v) => !!v?.toString().trim()
  const isValidBy = (re, v) => re ? re.test(v || '') : true
  const showRequiredError = (field) => !!errors[field] && !isNonEmpty(value[field])
  const showRegexError = (field, re) => !!errors[field] && isNonEmpty(value[field]) && !isValidBy(re, value[field])

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>{t('finishOrder.customerDetails.title')}</h3>
      <TextField
        id='customer-nume'
        label={t('finishOrder.customerDetails.lastName')}
        variant='outlined'
        fullWidth
        value={value.nume}
        onChange={handle('nume')}
        error={showRequiredError('nume')}
        helperText={showRequiredError('nume') ? errors.nume : ''}
      />

      <TextField
        id='customer-prenume'
        label={t('finishOrder.customerDetails.firstName')}
        variant='outlined'
        fullWidth
        value={value.prenume}
        onChange={handle('prenume')}
        error={showRequiredError('prenume')}
        helperText={showRequiredError('prenume') ? errors.prenume : ''}
      />

      <TextField
        id='customer-telefon'
        label={t('finishOrder.customerDetails.phone')}
        variant='outlined'
        fullWidth
        value={value.telefon}
        onChange={handle('telefon')}
        error={showRequiredError('telefon') || showRegexError('telefon', validators.telefon) }
        helperText={
          showRequiredError('telefon') || showRegexError('telefon', validators.telefon)
            ? errors.telefon
            : ''
        }
        slotProps={{htmlInput: {
          maxLength: 20
        }}}
      />

      <TextField
        id='customer-email'
        label={t('finishOrder.customerDetails.email')}
        variant='outlined'
        fullWidth
        value={value.email}
        onChange={handle('email')}
        error={ showRequiredError('email') || showRegexError('email', validators.email) }
        helperText={
          showRequiredError('email') || showRegexError('email', validators.email)
            ? errors.email
            : ''
        }
      />
    </div>
  )
}
