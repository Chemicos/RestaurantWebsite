import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion' 
import ConfirmMessage from './ConfirmMessage'
import { TextField } from '@mui/material'

export default function ContactUs({ prefill }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [form, setForm] = useState({
    email: '',
    nume: '',
    telefon: '',
    mesaj: ''
  })

  const messageMaxLength = 300

  useEffect(() => {
    if(prefill) {
      setForm((prev) => ({
        ...prev,
        email: prefill.email || '',
        nume: prefill.nume || '',
        telefon: prefill.telefon || ''
      }))
    }
  }, [prefill])

  const [errors, setErrors] = useState({
    email: '',
    telefon: '',
    nume: '',
    mesaj: ''
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      telefon: '',
      nume: '',
      mesaj: ''
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRe = /^[0-9\s+\-()]{6,}$/

    if (!form.email.trim()) {
      newErrors.email = 'Emailul este obligatoriu'
    } else if (!emailRe.test(form.email)) {
      newErrors.email = 'Email invalid'
    }

    if (!form.nume.trim()) {
      newErrors.nume = 'Numele este obligatoriu'
    }

    if (!form.telefon.trim()) {
      newErrors.telefon = 'Telefonul este obligatoriu'
    } else if (!phoneRe.test(form.telefon)) {
      newErrors.telefon = 'Telefon invalid'
    }

    if (!form.mesaj.trim()) {
      newErrors.mesaj = 'Mesajul este obligatoriu'
    }

    setErrors(newErrors)

    return Object.values(newErrors).every(e => e === '')
  }
  const handleSubmitMessage = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setConfirmOpen(true)
  }

  const handleChange = (e) => 
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleClose = () => setConfirmOpen(false)
  const handleOk = () => setForm({
    email: prefill?.email || '',
    nume: prefill?.nume || '',
    telefon: prefill?.telefon || '',
    mesaj: ''
  })

  const customInputStyles = {
    '& .MuiInputBase-root' : {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      transition: 'all 0.3s ease',
      boxShadow: 'none'
    },
    '& .MuiInputBase-root:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
    '& .MuiInputBase-root.Mui-focused': {
      boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #e2e2e2',
    }
  }
  return (
    <div className='flex items-center justify-center min-h-[100svh] xl:min-h-screen'>
      <motion.div
        ref={ref}
        initial={{opacity: 0, y: 90}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.5, ease: 'easeOut'}}
        className='w-full md:w-[640px] px-6 md:px-0'
      >
        <form className='w-full flex flex-col' onSubmit={handleSubmitMessage}>
          <h2 className='text-4xl mb-10 text-center'>Contactează-ne</h2>

          <div className='w-full flex flex-col gap-8 md:gap-4'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-4'>
              <TextField
                name='email'
                type='email'
                label='Email'
                fullWidth
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={customInputStyles}
              />

              <TextField
                name='nume'
                type='text'
                label='Nume'
                fullWidth
                value={form.nume}
                onChange={handleChange}
                error={!!errors.nume}
                helperText={errors.nume}
                sx={customInputStyles}
              />
            </div>
            
            <TextField
              name='telefon'
              type='text'
              label='Telefon'
              fullWidth
              value={form.telefon}
              onChange={handleChange}
              error={!!errors.telefon}
              helperText={errors.telefon}
              sx={customInputStyles}
            />

            <TextField
              name='mesaj'
              label='Mesaj'
              placeholder='Scrie mesajul aici'
              fullWidth
              multiline
              rows={6}
              value={form.mesaj}
              onChange={handleChange}
              slotProps={{htmlInput: {maxLength: messageMaxLength}}}
              error={!!errors.mesaj}
              helperText={
                errors.mesaj ||
                (form.mesaj.length === messageMaxLength
                  ? `Ai atins limita`
                  : `${messageMaxLength - form.mesaj.length} caractere rămase`)
              }
              sx={customInputStyles}
            />

            <button
                type='submit'
                className='bg-custom-red text-white font-medium py-3 w-32 rounded-xl self-center text-lg hover:bg-red-800 active:bg-red-800 cursor-pointer transition-all
                active:scale-90'
            >
                Trimite
            </button>
          </div>
        </form>
      </motion.div>

      <ConfirmMessage
        open={confirmOpen}
        onClose={handleClose}
        onOk={handleOk}
      />
    </div>
  )
}
