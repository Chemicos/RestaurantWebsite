import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItemCount, setCartItemCount] = useState(0)
    const API_URL = import.meta.env.VITE_API_URL
    const { user } = useContext(AuthContext)

    const fetchCartItems = async () => {
        const session_id = sessionStorage.getItem('session_id')
        const user_id = user?.id 
        if(!session_id && !user_id) return

        const url = user_id
        ? `${API_URL}/api/comenzi_temporare?user_id=${user_id}`
        : `${API_URL}/api/comenzi_temporare?session_id=${session_id}`

        try {
            const res = await fetch(url, {credentials: 'include'})
            const data = await res.json()
            if(Array.isArray(data)) {
                const totalQuantity = data.reduce((acc, item) => {
                    const parsed = typeof item.items === 'string' ? JSON.parse(item.items) : item.items
                    return acc + Number(parsed?.quantity || 1)
                }, 0)
                setCartItemCount(totalQuantity)
            }
        } catch (error) {
            console.error('Eroare la fetch comenzi temporare:', error)
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [user])
    return (
        <CartContext.Provider value={{ cartItemCount, setCartItemCount, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)