import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { CartContext } from "../../../contexts/CartContext"
import { GlobalOrdersContext } from "../../../contexts/GlobalOrdersContext"
import { useOrders } from "./useOrders"

export const useAuthWithCart = () => {
    const {user, login, logout} = useContext(AuthContext)
    const {setCartItemCount} = useContext(CartContext)
    const {setGlobalOrders} = useContext(GlobalOrdersContext)
    const {setOrders} = useOrders()

    const logoutWithCart = () => {
        setCartItemCount(0)
        setGlobalOrders([])
        setOrders([])
        logout()
  }

  return {
    user,
    login,
    logoutWithCart
  }
}