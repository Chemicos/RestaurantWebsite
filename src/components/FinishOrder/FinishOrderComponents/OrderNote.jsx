import React, { useState } from 'react'

export default function OrderNote() {
  const [note, setNote] = useState('')
  const maxLength = 350

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center'>
        <h3 className='text-xl font-semibold'>Adauga detalii despre comanda</h3>
        <span className='ml-2 text-xs bg-[#FFD980] px-2 py-1 rounded-full'>optional</span>
      </div>

      <textarea rows={4} placeholder='' maxLength={maxLength} value={note} onChange={(e) => setNote(e.target.value)}
        className='w-full border-1 border-black/40 rounded p-2 resize-none text-md outline-none hover:border-black focus:border-blue-600'
      />

      <div className='text-right text-xs text-gray-500'>
        {maxLength - note.length} caractere ramase
      </div>
    </div>
  )
}
