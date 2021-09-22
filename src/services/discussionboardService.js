import { BASE_API_URL } from ".";
import KeycloakService from './keycloakService'

export const postNewDiscussionBoard = async (data) => {
	return await fetch(`${BASE_API_URL}discussionBoard`, {
		headers: {
				'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		method: "POST",
		body: data
  	})
}