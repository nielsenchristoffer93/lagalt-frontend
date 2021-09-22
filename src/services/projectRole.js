import { BASE_API_URL, BASE_URL } from ".";
import KeycloakService from './keycloakService'


export const getProjectRole = async () => {
    return await fetch(`${BASE_API_URL}projectrole`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
    })
}

export const postNewProjectRole = async (data) => {
	return await fetch(`${BASE_API_URL}projectrole`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		method: "POST",
		body: data
  	})
}

export const getProjectRoleByProjectRoleUrl = async (projectRoleUrl) => {
	const response = await fetch(`${BASE_URL}${projectRoleUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}