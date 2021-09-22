import { BASE_API_URL, BASE_URL } from "."
import KeycloakService from "./keycloakService";
import { getUserId } from "./user";

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

export const getUserProjects = async () => {
	const userId = await getUserId();

	
	const userResponse = await getUserRoles();
	const userData = await userResponse.json();
	const userRoles = userData.projectRoles
	let projectRoles = [];
	let projects = [];

	for (const url of userRoles) {
	const projectRoleResponse = await getDataFromUrl(url)
	const projectRoleData = await projectRoleResponse.json();

	projectRoles = [...projectRoles, projectRoleData] 
	}
	for (const item of projectRoles) {
	
		const projectResponse = await getDataFromUrl(item.projects[0])
		const projectData = await projectResponse.json();
		projects = [...projects, projectData] 
		}
	
	return projects;

	/* return await fetch(`${BASE_URL}/users/i/${userId}`, {
		headers: {
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
		
		method: "GET",
  	}) */
}

export const getUserRoles = async () => {
    const id = await getUserId();

    return await fetch(`${BASE_API_URL}users/i/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

export const getDataFromUrl = async (url) => {
    const id = await getUserId();
    return await fetch(`${BASE_URL}${url}`, {
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}