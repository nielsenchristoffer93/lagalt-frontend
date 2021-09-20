import { BASE_API_URL } from ".";

export const postNewProjectRole = async (data) => {
	return await fetch(`${BASE_API_URL}projectrole`, {
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "POST",
		body: data
  	})
}