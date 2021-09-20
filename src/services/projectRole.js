import { BASE_API_URL } from ".";
import KeycloakService from './keycloakService'

export const postNewProjectRole = async (data) => {
	return await fetch(`${BASE_API_URL}projectrole`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		method: "POST",
		body: data
  	})
}