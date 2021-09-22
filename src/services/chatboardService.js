import { BASE_API_URL } from ".";
import KeycloakService from './keycloakService'

export const postNewChatBoard = async (data) => {
	return await fetch(`${BASE_API_URL}chatBoard`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		method: "POST",
		body: data
  	})
}