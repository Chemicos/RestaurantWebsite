import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL

    const login = async () => {
        const res = await fetch(`${API_URL}/api/me`, {
        credentials: 'include'
        })

        if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        }
    }

    const logout = async () => {
        await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        setUser(null)
        sessionStorage.removeItem('session_id')
    }

    useEffect(() => {
        login()
    }, [])

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user')
    //     if (storedUser) {
    //         const parsed = JSON.parse(storedUser)
    //         if(parsed.expiry > new Date().getTime()) {
    //             setUser(parsed)
    //         } else {
    //             localStorage.removeItem('user')
    //             logout(true)
    //         }
    //     }
    // }, [])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const data = JSON.parse(sessionStorage.getItem("user_data"))
    //         const now = new Date().getTime()

    //         if (data && data.expiry && now > data.expiry) {
    //             sessionStorage.removeItem("user_id")
    //             sessionStorage.removeItem("user_data")
    //             logout()
    //         }
    //     }, 1000)

    //     return () => clearInterval(interval)
    // }, [])

  return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}
