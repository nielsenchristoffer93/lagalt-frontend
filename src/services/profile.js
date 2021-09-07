const BASE_API_URL = "http://localhost:8080/api/v1/";

export const getProfile = async () => {
    return await fetch(`${BASE_API_URL}userPofile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}