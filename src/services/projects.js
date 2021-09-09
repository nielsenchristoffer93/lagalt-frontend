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
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "POST",
		body: data
  	})
}
    
export const getAllProjectsWithCategory = async (id) => {
	console.log(`projects/category/${id}`)
	return await fetch(`${BASE_API_URL}projects/category/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},

	})
}