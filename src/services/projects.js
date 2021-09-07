
import { BASE_API_URL } from "."

export const getAllProjects = async () => {
	return await fetch(`${BASE_API_URL}projects`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const postNewProject = async (data) => {
	return await fetch(`${BASE_API_URL}projects`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: data
	})
}