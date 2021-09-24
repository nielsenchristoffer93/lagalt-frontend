import { BASE_API_URL } from ".";
import KeycloakService from './keycloakService'

/**
 * Create a new chatBoard in a project.
 *
 * @param {*} data the data to send to the backend for posting a new chatBoard to a project.
 * @returns Promise
 */
export const postNewChatBoard = async (data) => {
	return await fetch(`${BASE_API_URL}chatBoard`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		method: "POST",
		body: data
	})
}