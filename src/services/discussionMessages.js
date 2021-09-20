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


export const postMessage = async (data) => {
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

////////////////
// export const postComments = async (data) => {
// 	return await fetch(`${BASE_API_URL}discussionMessages`, {
// 		/*headers: {
// 			'Content-Type': 'multipart/form-data',
// 		},*/
// 		method: "POST",
// 		body: data
//   	})
// }

//////
// export const postComments = async (data) => {
// 	console.log("data")
// 	console.log(data)

// 	for (var pair of data.entries()) {
// 		console.log(pair[0]+ ', ' + pair[1]); 
// 	}
// 	return await fetch(`${BASE_API_URL}discussionMessages`, {
// 		body: data,
// 		method: 'POST'
		
// 	})
// }


