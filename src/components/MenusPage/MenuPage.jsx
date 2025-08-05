import React, { useContext, useEffect, useState } from 'react'
import SearchOptions from './SearchOptions'
import MainMenuList from './MainMenuList'
import OrderSummary from './OrderSummary'
import ConfirmDelete from './ConfirmDelete'
import { Alert, Snackbar } from '@mui/material'
import MenuCustomizer from '../MenuCustomizer/MenuCustomizer'
import { useCart } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'

export default function MenuPage() {
  const {user} = useContext(AuthContext)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [orders, setOrders] = useState([])
  const [menuToDelete, setMenuToDelete] = useState(null)
  const [toastOpen, setToastOpen] = useState(false)

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null) 

  const API_URL = import.meta.env.VITE_API_URL

  const {fetchCartItems} = useCart()

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
  }, [user])

  const handleCustomizeMenu = (item) => {
    setSelectedItem(item)
    setIsCustomizerOpen(true)
  }

  const fetchOrders = async () => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = sessionStorage.getItem("user_id")
    
    if (!user_id && !session_id) return

    const url = user_id
      ? `${API_URL}/api/comenzi_temporare?user_id=${user_id}`
      : `${API_URL}/api/comenzi_temporare?session_id=${session_id}`

    try {
      const res = await fetch(url)
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

  const handleDeleteOrder = async (menuName) => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = sessionStorage.getItem("user_id")
    if (!menuName || (!user_id && !session_id)) return

    try {
      await fetch(`${API_URL}/api/comenzi_temporare`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({item_name: menuName, ...(user_id ? {user_id} : {session_id})})
      })
      fetchOrders()
      fetchCartItems()
      setMenuToDelete(null)
      setToastOpen(true)
    } catch (error) {
      console.error('Eroare la stergerea comenzii', error)
    }
  }

  const handleCloseToast = (_, reason) => {
    if (reason === 'clickaway') return
    setToastOpen(false)
  }

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
          onCustomize={handleCustomizeMenu}
        />
      </div>

      <div className='relative hidden lg:block'>
        <div className={`
          sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto
          transition-all duration-500 ease-out
          ${scrolled ? 'translate-y-[40px]' : 'translate-y-0'}`
        }>
          <OrderSummary
            orders={orders}
            onRequestDelete={(menuName) => setMenuToDelete(menuName)}
          />        
        </div>

        <ConfirmDelete 
          visible={!!menuToDelete}
          onCancel={() => setMenuToDelete(null)}
          onConfirm={() => handleDeleteOrder(menuToDelete)}
          menuName={menuToDelete}
        />
      </div>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert
          onClose={handleCloseToast}
          severity='success'
          variant='filled'
          sx={{width: '100%'}}
        >
          Meniul a fost sters cu succes!
        </Alert>
      </Snackbar>

      {isCustomizerOpen && selectedItem && (
        <MenuCustomizer
          menu={selectedItem}
          onClose={() => {
            setIsCustomizerOpen(false)
            setSelectedItem(null)
          }}
          refreshOrders={fetchOrders}
        />
      )}
    </div>
  )
}
