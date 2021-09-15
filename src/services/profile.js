import { BASE_API_URL } from "."

export const getProfile = async () => {
    return await fetch(`${BASE_API_URL}userPofile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}