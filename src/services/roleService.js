import { BASE_URL } from ".";

export const getRoleByRoleUrl = async(roleUrl) => {
    const response = await fetch(`${BASE_URL}${roleUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}