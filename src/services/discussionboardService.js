import { BASE_API_URL } from ".";

export const postNewDiscussionBoard = async (data) => {
	return await fetch(`${BASE_API_URL}discussionBoard`, {
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "POST",
		body: data
  	})
}