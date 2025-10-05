import { MenuItem, TextField } from '@mui/material'
import { CreditCardIcon, HandCoinsIcon } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export default function PaymentMethod({value, onChange, error}) {
  const {t} = useTranslation()
  const method = value || ''

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const getIcon = () => {
    switch (method) {
      case 'Card':
        return <CreditCardIcon size={45} />
      case 'Numerar':
        return <HandCoinsIcon size={45} />
      default:
        return <CreditCardIcon size={45} />
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-semibold'>{t('finishOrder.paymentMethod.title')}</h3>

      <div className='flex items-center gap-3'>
        {getIcon()}

        <TextField
          id='payment-method'
          select
          fullWidth
          label={t('finishOrder.paymentMethod.selectLabel')}
          variant='standard'
          value={method}
          onChange={handleChange}
          error={!!error}
          helperText={error || ''}
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
          <MenuItem sx={{borderRadius: '10px', marginBottom: '5px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Card'>{t('finishOrder.paymentMethod.card')}</MenuItem>
          <MenuItem sx={{borderRadius: '10px', paddingX: '10px', '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2' }}} value='Numerar'>{t('finishOrder.paymentMethod.cash')}</MenuItem>
        </TextField>
      </div>
    </div>
  )
}
