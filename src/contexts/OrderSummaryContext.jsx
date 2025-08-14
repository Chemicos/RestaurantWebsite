import { createContext, useContext, useState } from "react"

const OrderSummaryContext = createContext()

export function OrderSummaryProvider({ children }) {
  const [showOrderSummaryMobile, setShowOrderSummaryMobile] = useState(false)

  return (
    <OrderSummaryContext.Provider value={{ showOrderSummaryMobile, setShowOrderSummaryMobile }}>
      {children}
    </OrderSummaryContext.Provider>
  )
}

export const useOrderSummary = () => useContext(OrderSummaryContext)