import { BASE_API_URL } from "."

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
		body: data,
		method: 'POST'
		
	})
}


