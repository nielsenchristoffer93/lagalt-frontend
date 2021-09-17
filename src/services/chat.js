import { BASE_API_URL } from ".";
import KeycloakService from "./keycloakService";

export const postNewChatMessage = async (data) => {
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