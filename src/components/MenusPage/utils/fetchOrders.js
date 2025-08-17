const API_URL = import.meta.env.VITE_API_URL

export const fetchOrders = async () => {
    const session_id = sessionStorage.getItem("session_id")
    const user_id = sessionStorage.getItem("user_id")

    if (!user_id && !session_id) return []

    const url = user_id
    ? `${API_URL}/api/comenzi_temporare?user_id=${user_id}`
    : `${API_URL}/api/comenzi_temporare?session_id=${session_id}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        const allItems = data.map(entry => entry.items)
        return allItems.flat()
    } catch (error) {
        console.error('Eroare la prelucrarea comenzilor:', error)
        return []
    }
}