import { BASE_API_URL } from "."
import KeycloakService from "./keycloakService";

export const getMessagesBasedOnDiscussionBoard = async (boardId) => {
	return await fetch(`${BASE_API_URL}discussionBoard/boardMessages/${boardId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}


export const postMessages = async (data) => {
	console.log("data")
	console.log(data)

	for (var pair of data.entries()) {
		console.log(pair[0]+ ', ' + pair[1]); 
	}
	return await fetch(`${BASE_API_URL}discussionMessages`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		body: data,
		method: 'POST'
		
	})
}


