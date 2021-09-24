import { BASE_API_URL } from ".";
import KeycloakService from './keycloakService'

/**
 * Create a new discussionboard in a project.
 *
 * @param {*} data the data to send to the backend for posting a new discussionboard to a project.
 * @returns Promise
 */
export const postNewDiscussionBoard = async (data) => {
	return await fetch(`${BASE_API_URL}discussionBoard`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		method: "POST",
		body: data
	})
}