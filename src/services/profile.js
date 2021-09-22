import { BASE_API_URL } from "."
import KeycloakService from "./keycloakService";

export const getProfile = async () => {
    return await fetch(`${BASE_API_URL}userPofile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
    })
}