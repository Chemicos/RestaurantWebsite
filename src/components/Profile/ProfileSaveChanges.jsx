import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const API_URL = import.meta.env.VITE_API_URL

export default function ProfileSaveChanges({value, onSaved, validate}) {
  const {user} = useContext(AuthContext)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const handleSave = async () => {
    if (!user?.id) return
    if (!validate()) return
    setSaving(true)
    setErr('')

    try {
      if (!value.email?.trim()) throw new Error('Email obligatoriu')
      if (!value.nume?.trim() || !value.prenume?.trim()) {
        throw new Error('Nume și prenume sunt obligatorii')
      }

      const res = await fetch(`${API_URL}/api/utilizatori/${user.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          nume: value.nume,
          prenume: value.prenume,
          telefon: value.telefon,
          email: value.email,
          localitate: value.localitate,
          strada: value.strada,
          // codPostal: value.codPostal
        })
      })

      const data = await res.json()
      if(!res.ok) {
        setErr(data?.error || 'Eroare la salvare')
        setSaving(false)
        return
      }

      setSaving(false)
      onSaved?.(data.user)
    } catch (error) {
      setErr(error.message || 'Eroare la salvare')
      setSaving(false)
    }
  }

  return (
    <div className='w-full flex flex-col items-end gap-2'>
      {err && <div className='text-red-600 text-sm'>{err}</div>}
      <button
        className={`w-fit bg-custom-red hover:bg-red-800 active:bg-red-800 text-white text-lg font-semibold
        py-2 px-6 rounded-xl transition-all cursor-pointer active:scale-90
        ${saving ? 'opacity-70 pointer-events-none' : ''}`}
        onClick={handleSave}
      >
        {saving ? 'Se salveaza…' : 'Salveaza'}
      </button>
    </div>
  )
}
