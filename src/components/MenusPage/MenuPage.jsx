import React, { useContext, useEffect, useState } from 'react'
import SearchOptions from './SearchOptions'
import MainMenuList from './MainMenuList'
import OrderSummary from './OrderSummary'
import ConfirmDelete from './ConfirmDelete'
import { Alert, CircularProgress, Snackbar } from '@mui/material'
import MenuCustomizer from '../MenuCustomizer/MenuCustomizer'
import { AuthContext } from '../../contexts/AuthContext'
import { useOrderSummary } from '../../contexts/OrderSummaryContext'
import OrderSummaryMobileWrapper from './OrderSummaryMobileWrapper'
import { useOrders } from './hooks/useOrders'
import { useCart } from '../../contexts/CartContext'

export default function MenuPage() {
  const { showOrderSummaryMobile, setShowOrderSummaryMobile } = useOrderSummary()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [menuToDelete, setMenuToDelete] = useState(null)
  const [toastOpen, setToastOpen] = useState(false)

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null) 
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL

  const {fetchCartItems} = useCart()
  const {orders, refreshOrders} = useOrders()
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsLoading(true)

        const res = await fetch(`${API_URL}/api/menus`)
        const data = await res.json()
        setMenuItems(data)
      } catch (error) {
        console.error("Eroare la preluarea meniurilor", error)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }
    fetchMenus()
  }, [])

  const handleCustomizeMenu = (item) => {
    setSelectedItem(item)
    setIsCustomizerOpen(true)
  }

  const filteredMenus = menuItems.filter(menu => {
    const matchesCategory = selectedCategory ? menu.category === selectedCategory : true
    const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDeleteOrder = async (menuName) => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = user?.id
    if (!menuName || (!user_id && !session_id)) return

    try {
      await fetch(`${API_URL}/api/comenzi_temporare`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({item_name: menuName, ...(user_id ? {user_id} : {session_id})})
      })
      refreshOrders()
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
    <div className='max-w-[1650px] mt-7 md:mt-14 mx-auto px-4 flex gap-12'>
      <div className='flex-1'>
        <SearchOptions
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          countOfMenus={menuItems.length}
          onResetFilters={handleResetFilters}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress color="error" />
          </div>
        ) : (
          <MainMenuList 
            menuItems={filteredMenus} 
            // refreshOrders={fetchOrders}
            refreshOrders={refreshOrders}
            onCustomize={handleCustomizeMenu}
          />
        )}
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

      {showOrderSummaryMobile && (
        <OrderSummaryMobileWrapper
          orders={orders}
          onRequestDelete={(menuName) => setMenuToDelete(menuName)}
          onClose={() => setShowOrderSummaryMobile(false)}
        />
      )}

      {isCustomizerOpen && selectedItem && (
        <MenuCustomizer
          menu={selectedItem}
          onClose={() => {
            setIsCustomizerOpen(false)
            setSelectedItem(null)
          }}
          // refreshOrders={fetchOrders}
          refreshOrders={refreshOrders}
        />
      )}

      <ConfirmDelete 
          visible={!!menuToDelete}
          onCancel={() => setMenuToDelete(null)}
          onConfirm={() => handleDeleteOrder(menuToDelete)}
          menuName={menuToDelete}
        />
    </div>
  )
}
