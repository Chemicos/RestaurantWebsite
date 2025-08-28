import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { fetchOrders } from "../utils/fetchOrders"

const OrdersContext = createContext()

export const OrdersProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])

  const refreshOrders = async () => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = sessionStorage.getItem("user_id")

    if (!user_id && !session_id) {
      setOrders([])
      return
    }

    const data = await fetchOrders()
    setOrders(data)
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