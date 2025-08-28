import React, { createContext, useEffect, useState } from 'react'
import { useCart } from './CartContext'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const {fetchCartItems} = useCart()

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        sessionStorage.setItem('user_id', userData.id)
        sessionStorage.removeItem('session_id')
        fetchCartItems()
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        sessionStorage.removeItem('user_id')
        sessionStorage.setItem('session_id', crypto.randomUUID())
        fetchCartItems()
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsed = JSON.parse(storedUser)
            if(parsed.expiry > new Date().getTime()) {
                setUser(parsed)
            } else {
                localStorage.removeItem('user')
                logout(true)
            }
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const data = JSON.parse(sessionStorage.getItem("user_data"))
            const now = new Date().getTime()

            if (data && data.expiry && now > data.expiry) {
                sessionStorage.removeItem("user_id")
                sessionStorage.removeItem("user_data")
                logout()
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

  return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}
