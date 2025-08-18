import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { fetchOrders } from "../utils/fetchOrders"

export const useOrders = () => {
    const {user} = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    const refreshOrders = async () => {
        const data = await fetchOrders()
        setOrders(data)
    }

    useEffect(() => {
        refreshOrders()
    }, [user])

    return {orders, refreshOrders}
}