import React from 'react'

export default function MenuCustomizerForm() {
  return (
    <div className='w-full lg:w-1/2 p-6 space-y-6'>

      <div>
        <label className='block mb-1 font-medium text-xl'>Alege o Garnitura:</label>
        <select 
          className='w-full border border-custom-gray '
          name="" 
          id=""
        >
          <option value="">-- Selecteaza --</option>
        </select>
      </div>
    </div>
  )
}
