import { BASE_API_URL } from ".";

export const postNewChatMessage = async (data) => {
	return await fetch(`${BASE_API_URL}chatmessages`, {
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "POST",
		body: data
  	})
}