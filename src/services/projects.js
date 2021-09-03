const BASE_API_URL = "https://lagalt-experis-backend.herokuapp.com/api/v1/";

export const getAllProjects = async () => {
	return await fetch(`${BASE_API_URL}projects`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}