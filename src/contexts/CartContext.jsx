import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItemCount, setCartItemCount] = useState(0)
    const API_URL = import.meta.env.VITE_API_URL

    const fetchCartItems = async () => {
        const session_id = sessionStorage.getItem('session_id')
        const user_id = sessionStorage.getItem('user_id')
        if(!session_id && !user_id) return

        const url = user_id
        ? `${API_URL}/api/comenzi_temporare?user_id=${user_id}`
        : `${API_URL}/api/comenzi_temporare?session_id=${session_id}`

        try {
            const res = await fetch(url)
            const data = await res.json()
            if(Array.isArray(data)) {
                setCartItemCount(data.length)
            }
        } catch (error) {
            console.error('Eroare la fetch comenzi temporare:', error)
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [])
    return (
        <CartContext.Provider value={{ cartItemCount, setCartItemCount, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)