import React, { useState } from 'react'
import SearchOptions from './SearchOptions'
import MainMenuList from './MainMenuList'
import OrderSummary from './OrderSummary'

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <div className='max-w-[1440px] mx-auto px-4 flex gap-6'>
      <div className='flex-1'>
        <SearchOptions
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <MainMenuList />
      </div>

      <div>
        <OrderSummary />        
      </div>
    </div>
  )
}
