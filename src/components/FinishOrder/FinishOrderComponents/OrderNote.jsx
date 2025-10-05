// import React, { useState } from 'react'

import { useTranslation } from "react-i18next"

export default function OrderNote({noteValue, onChange}) {
  const {t} = useTranslation()
  const maxLength = 350

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center'>
        <h3 className='text-xl font-semibold'>{t('finishOrder.orderNote.title')}</h3>
        <span className='ml-2 text-xs bg-[#FFD980] px-2 py-1 rounded-full'>{t('finishOrder.orderNote.optional')}</span>
      </div>

      <textarea rows={4} placeholder='' maxLength={maxLength} value={noteValue} onChange={(e) => onChange(e.target.value)}
        className='w-full border-1 border-black/40 rounded p-2 resize-none text-md outline-none hover:border-black focus:border-blue-600'
      />

      <div className='text-right text-xs text-gray-500'>
        {t('finishOrder.orderNote.charactersLeft', {count: maxLength - noteValue.length})}
      </div>
    </div>
  )
}
