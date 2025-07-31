import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsed = JSON.parse(storedUser)
            if(parsed.expiry > new Date().getTime()) {
                setUser(parsed)
            } else {
                localStorage.removeItem('user')
            }
        }
    }, [])

  return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}
