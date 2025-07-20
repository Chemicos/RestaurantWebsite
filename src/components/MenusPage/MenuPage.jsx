import React, { useEffect, useState } from 'react'
import SearchOptions from './SearchOptions'
import MainMenuList from './MainMenuList'
import OrderSummary from './OrderSummary'

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className='max-w-[1650px] mt-14 mx-auto px-4 flex gap-12'>
      <div className='flex-1'>
        <SearchOptions
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <MainMenuList />
      </div>

      <div className='relative'>
        <div className={`
          sticky top-20 h-screen
          transition-all duration-500 ease-out hidden md:block
          ${scrolled ? 'translate-y-[40px]' : 'translate-y-0'}`
        }>
          <OrderSummary />        
        </div>
      </div>
    </div>
  )
}
