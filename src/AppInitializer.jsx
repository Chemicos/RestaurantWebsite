import React, { useContext, useEffect } from 'react'
import { useCart } from './contexts/CartContext'
import { AuthContext } from './contexts/AuthContext'
import { useGlobalOrders } from './contexts/GlobalOrdersContext'
import { fetchOrders } from './components/MenusPage/utils/fetchOrders'

export default function AppInitializer() {
    const { fetchCartItems } = useCart()
    const { user } = useContext(AuthContext)
    const { setGlobalOrders } = useGlobalOrders()

    useEffect(() => {
        const syncOrdersAndCart = async () => {
            await fetchCartItems()
            const orders = await fetchOrders()
            setGlobalOrders(orders)
        }

        if (user) {
            syncOrdersAndCart()
        } else {
            setGlobalOrders([])
        }
    }, [user])

  return null
}
