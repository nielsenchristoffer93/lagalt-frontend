import { BASE_API_URL } from ".";
import KeycloakService from "./keycloakService";

/**
 * Post a new chatMessage to the database.
 *
 * @param {*} data formdata for posting a new chatMessage to the database.
 * @returns Promise
 */
export const postNewChatMessage = async (data) => {
	console.log(data)
	return await fetch(`${BASE_API_URL}chatmessages`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "POST",
		body: data
	})
}