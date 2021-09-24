import { BASE_API_URL } from "."
import KeycloakService from "./keycloakService";

/**
 * Get discussionMessages associated with the boardId.
 *
 * @param {*} boardId the boardId to fetch data from.
 * @returns Promise
 */
export const getMessagesBasedOnDiscussionBoard = async (boardId) => {
	return await fetch(`${BASE_API_URL}discussionBoard/boardMessages/${boardId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

/**
 * Post a new discussionMessage to the database.
 *
 * @param {*} data formdata for posting a new discussionMessage to the database.
 * @returns Promise
 */
export const postMessage = async (data) => {
	console.log("data")
	console.log(data)

	for (var pair of data.entries()) {
		console.log(pair[0] + ', ' + pair[1]);
	}
	return await fetch(`${BASE_API_URL}discussionMessages`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		body: data,
		method: 'POST'

	})
}



