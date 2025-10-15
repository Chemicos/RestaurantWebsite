import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"

const OrdersContext = createContext()

export const OrdersProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const API_URL = import.meta.env.VITE_API_URL

  const refreshOrders = async () => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = user?.id

    if (!user_id && !session_id) {
      setOrders([])
      return
    }

    const url = user_id
      ? `${API_URL}/api/comenzi_temporare?user_id=${user_id}`
      : `${API_URL}/api/comenzi_temporare?session_id=${session_id}`

    try {
      const res = await fetch(url, { credentials: "include" })
      const rows = await res.json() 

      const normalized = (Array.isArray(rows) ? rows : []).flatMap(row => {
        const raw = typeof row.items === "string" ? JSON.parse(row.items) : row.items
        const arr = Array.isArray(raw) ? raw : [raw]
        return arr.map(it => ({
          ...it,
          _cartId: row.id,
          _lineTotal: row.total_partial,
        }))
      })

      setOrders(normalized)
    } catch (err) {
      console.error("Eroare la preluarea comenzilor:", err)
      setOrders([])
    }
  }

  useEffect(() => {
    refreshOrders()
  }, [user])

  return (
    <OrdersContext.Provider value={{ orders, refreshOrders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)