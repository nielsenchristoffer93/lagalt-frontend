import { BASE_API_URL } from "."

export const getMessagesBasedOnDiscussionBoard = async (boardId) => {
	return await fetch(`${BASE_API_URL}discussionBoard/boardMessages/${boardId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}


export const postMessages = async () => {
	return await fetch(`${BASE_API_URL}discussionMessages`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}


