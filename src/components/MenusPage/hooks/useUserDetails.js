import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { fetchUserDetails } from "../utils/fetchUserDetails"

export const useUserDetails = () => {
    const {user} = useContext(AuthContext)
    const [userDetails, setUserDetails] = useState(null)

    const refreshUserDetails = async () => {
        const data = await fetchUserDetails(user?.id)
        setUserDetails(data)
    }

    useEffect(() => {
        if (!user?.id) {
            setUserDetails(null)
            return
        }

        refreshUserDetails()
    }, [user])

    return {userDetails, refreshUserDetails}
}