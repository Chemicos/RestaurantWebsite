import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'

export default function DeliveryDetails({value, onChange, errors = {}, validators = {}}) {
  const handle = (field) => (e) => onChange(prev => ({ ...prev, [field]: e.target.value }))
  const nonEmpty = (v) => !!v?.toString().trim()

  const stradaInvalid =
    !!errors.strada && nonEmpty(value.strada) && validators.strada && !validators.strada(value.strada)

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
        error={!!errors.localitate && !value.localitate.trim()}
        helperText={!!errors.localitate && !value.localitate.trim() ? errors.localitate : ''}
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
        error={!!errors.strada && (!nonEmpty(value.strada) || stradaInvalid)}
        helperText={
          !!errors.strada && (!nonEmpty(value.strada) || stradaInvalid)
            ? errors.strada
            : ''
        }
      />

      <TextField
        id='delivery-codPostal'
        label='Cod Postal'
        variant='outlined'
        fullWidth
        value={value.codPostal}
        onChange={handle('codPostal')}
        error={!!errors.codPostal && !value.codPostal.trim()}
        helperText={!!errors.codPostal && !value.codPostal.trim() ? errors.codPostal : ''}
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
