import { BASE_API_URL } from ".";

export const postNewChatBoard = async (data) => {
	return await fetch(`${BASE_API_URL}chatBoard`, {
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "POST",
		body: data
  	})
}