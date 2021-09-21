import { BASE_API_URL, BASE_URL } from ".";
import KeycloakService from "./keycloakService";

export const getAllCategories = async () => {
	return await fetch(`${BASE_API_URL}categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getCategoryBasedOnCategoryId = async (categoryUrl) => {
	const response = await fetch(`${BASE_URL}${categoryUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}

export const getSkillsBasedOnCategory = async (categoryId) => {
	return await fetch(`${BASE_API_URL}categories/${categoryId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}