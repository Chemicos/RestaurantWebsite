const API_URL = import.meta.env.VITE_API_URL

export const fetchUserDetails = async (user_id) => {
    if (!user_id) return null

    try {
        const res = await fetch(`${API_URL}/api/utilizatori/${user_id}`)
        if (!res.ok) throw new Error('Eroare la fetch utilizator')
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Eroare fetchUserDetails:', error)
        return null
    }
}