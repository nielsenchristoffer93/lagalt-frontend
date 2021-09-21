import { BASE_API_URL, BASE_URL } from "."
import KeycloakService from "./keycloakService";

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
    // Check if it is used
export const getAllProjectsWithCategory = async (id) => {
	console.log(`projects/category/${id}`)
	return await fetch(`${BASE_API_URL}projects/category/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},

	})
}

export const filterProjects = async (title, categoryId) => {
	return await fetch(`${BASE_API_URL}projects/filter/${title},${categoryId}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: "GET",
  	})
}

export const getSelectedProjectData = async (id) => {
	return await fetch(`${BASE_API_URL}projects/${id}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: "GET",
  	})
}

export const getRecomendedProject = async () => {
	return await fetch(`${BASE_API_URL}projects/recommended`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: "GET",
  	})
}

export const updateProject = async (data, id) => {
	return await fetch(`${BASE_API_URL}projects/${id}`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "PUT",
		body: data
  	})
}

export const getAllProjectStatus = async () => {
	return await fetch(`${BASE_API_URL}projectstatus`, {
	
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "GET",
  	})
}

export const fetchProjectStatus = async (url) => {
	return await fetch(`${BASE_URL}${url}`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		/*headers: {
			'Content-Type': 'multipart/form-data',
		},*/
		method: "GET",
  	})
}

