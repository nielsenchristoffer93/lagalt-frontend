import { BASE_URL } from ".";

export const getProjectStatusBasedOnProjectStatusId = async (projectStatusUrl) => {
	const response = await fetch(`${BASE_URL}${projectStatusUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}