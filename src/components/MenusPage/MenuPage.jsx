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
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmOrderTransaction from './ConfirmOrderTransaction'

export default function MenuPage() {
  const { showOrderSummaryMobile, setShowOrderSummaryMobile } = useOrderSummary()
  const location = useLocation()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [menuToDelete, setMenuToDelete] = useState(null)
  const [deleteToastOpen, setDeleteToastOpen] = useState(false)
  const [editToastOpen, setEditToastOpen] = useState(false)
  const [addToastOpen, setAddToastOpen] = useState(false)
  const [showConfirmOrder, setShowConfirmOrder] = useState(false)

  const [editingOrder, setEditingOrder] = useState(null)
  const [editingCartId, setEditingCartId] = useState(null)

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null) 
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL

  const {fetchCartItems, setCartItemCount} = useCart()
  const {orders, refreshOrders, setOrders} = useOrders()
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

  const handleDeleteOrder = async (cartId) => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = user?.id
    if (!cartId|| (!user_id && !session_id)) return

    try {
      await fetch(`${API_URL}/api/comenzi_temporare/${cartId}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(user_id ? {user_id} : {session_id})
      })
      refreshOrders()
      fetchCartItems()
      setMenuToDelete(null)
      setDeleteToastOpen(true)
    } catch (error) {
      console.error('Eroare la stergerea comenzii', error)
    }
  }

  const handleCloseToast = (_, reason) => {
    if (reason === 'clickaway') return
    setDeleteToastOpen(false)
  }

  const handleCloseEditToast = (_, reason) => {
    if (reason === 'clickaway') return
    setEditToastOpen(false)
  }

  const handleCloseAddToast = (_, reason) => {
    if (reason === 'clickaway') return
    setAddToastOpen(false)
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

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const result = params.get('plata')

    const finalizeAfterStripe = async () => {
      if (result !== 'success') return
      const draftRaw = sessionStorage.getItem('order_draft')
      if (!draftRaw) {
        params.delete('plata')
        navigate({ pathname: location.pathname, search: params.toString() }, { replace: true })
        return
      }

      try {
        const draft = JSON.parse(draftRaw)
        const res = await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(draft)
        })
        const data = await res.json()
        if (!res.ok) {
          console.error(data.error)
          return
        }

        setOrders([])
        setCartItemCount(0)
        await Promise.all([refreshOrders(), fetchCartItems()])
        setShowConfirmOrder(true)
      } catch (e) {
        console.error('Finalizare dupa Stripe esuata:', e)
      } finally {
        sessionStorage.removeItem('order_draft')
        params.delete('plata')
        navigate({ pathname: location.pathname, search: params.toString() }, { replace: true })
      }
    }

    finalizeAfterStripe()
  }, [location.search])


  return (
    <div className='flex max-w-[1440px] my-36 mx-auto px-4 gap-12'>
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
          <div className="flex justify-center items-center min-h-screen">
            <CircularProgress color="error" />
          </div>
        ) : (
          <MainMenuList 
            menuItems={filteredMenus} 
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
            onRequestDelete={(order) => setMenuToDelete({id: order._cartId, name: order.name})}
            onRequestEdit={(order) => {
              const base = menuItems.find(m => m.name === order.name)
              if (!base) return
              setSelectedItem(base)
              setEditingOrder(order)
              setEditingCartId(order._cartId)
              setIsCustomizerOpen(true)
            }}
          />        
        </div>
      </div>

      <Snackbar
        open={deleteToastOpen}
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

      <Snackbar
        open={editToastOpen}
        autoHideDuration={4000}
        onClose={handleCloseEditToast}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert onClose={handleCloseEditToast} severity='success' variant='filled' sx={{width: '100%'}}>
          Meniul a fost actualizat cu succes!
        </Alert>
      </Snackbar>

      <Snackbar
        open={addToastOpen}
        autoHideDuration={4000}
        onClose={handleCloseAddToast}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert onClose={handleCloseAddToast} severity='success' variant='filled' sx={{width: '100%'}}>
          Meniul a fost adaugat cu succes!
        </Alert>
      </Snackbar>

      {showOrderSummaryMobile && (
        <OrderSummaryMobileWrapper
          orders={orders}
          onRequestDelete={(order) => setMenuToDelete({id: order._cartId, name: order.name})}
          onClose={() => setShowOrderSummaryMobile(false)}
          onRequestEdit={(order) => {
            const base = menuItems.find(m => m.name === order.name)
            if (!base) return
            setSelectedItem(base)
            setEditingOrder(order)
            setEditingCartId(order._cartId)
            setIsCustomizerOpen(true)
          }}
        />
      )}

      {isCustomizerOpen && selectedItem && (
        <MenuCustomizer
          menu={selectedItem}
          mode={editingOrder ? 'edit' : 'add'}
          initialSelection={editingOrder || null}
          cartItemId={editingCartId || null}
          onClose={() => {
            setIsCustomizerOpen(false)
            setSelectedItem(null)
            setEditingOrder(null)
            setEditingCartId(null)
          }}
          refreshOrders={refreshOrders}
          onEdited={() => setEditToastOpen(true)}
          onAdded={() => setAddToastOpen(true)}
        />
      )}

      <ConfirmDelete 
          visible={!!menuToDelete}
          onCancel={() => setMenuToDelete(null)}
          onConfirm={() => handleDeleteOrder(menuToDelete?.id)}
          menuName={menuToDelete?.name}
      />
      <ConfirmOrderTransaction
        open={showConfirmOrder}
        onClose={() => setShowConfirmOrder(false)}
        onOk={() => setShowConfirmOrder(false)}
      />
    </div>
  )
}
