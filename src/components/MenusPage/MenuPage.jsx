import React, { useEffect, useState } from 'react'
import SearchOptions from './SearchOptions'
import MainMenuList from './MainMenuList'
import OrderSummary from './OrderSummary'

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [orders, setOrders] = useState([])

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/menus`)
        const data = await res.json()
        setMenuItems(data)
      } catch (error) {
        console.error("Eroare la preluarea meniurilor", error)
      }
    }
    fetchMenus()
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const session_id = sessionStorage.getItem("session_id")
    if (!session_id) return

    try {
      const res = await fetch(`${API_URL}/api/comenzi_temporare?session_id=${session_id}`)
      const data = await res.json()
      const allItems = data.map(entry => entry.items)
      setOrders(allItems.flat())
    } catch (err) {
      console.error("Eroare la preluarea comenzilor:", err)
    }
  }

  const filteredMenus = menuItems.filter(menu => {
    const matchesCategory = selectedCategory ? menu.category === selectedCategory : true
    const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleResetFilters = () => {
    setSelectedCategory('')
    setSearchTerm('')
  }

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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          countOfMenus={menuItems.length}
          onResetFilters={handleResetFilters}
        />
        <MainMenuList 
          menuItems={filteredMenus} 
          refreshOrders={fetchOrders}
        />
      </div>

      <div className='relative'>
        <div className={`
          sticky top-20 h-screen
          transition-all duration-500 ease-out hidden lg:block
          ${scrolled ? 'translate-y-[40px]' : 'translate-y-0'}`
        }>
          <OrderSummary
            orders={orders}
          />        
        </div>
      </div>
    </div>
  )
}
