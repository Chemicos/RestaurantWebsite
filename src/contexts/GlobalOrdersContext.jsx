import { createContext, useContext, useState } from "react";

export const GlobalOrdersContext = createContext()

export const GlobalOrdersProvider = ({ children }) => {
    const [globalOrders, setGlobalOrders] = useState([])

    return (
        <GlobalOrdersContext.Provider value={{globalOrders, setGlobalOrders}}>
            {children}
        </GlobalOrdersContext.Provider>
    )
}

export const useGlobalOrders = () => useContext(GlobalOrdersContext)