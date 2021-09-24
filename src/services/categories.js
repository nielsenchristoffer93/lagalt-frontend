import { BASE_API_URL, BASE_URL } from ".";

/**
 * Fetches all of the categories from the database.
 *
 * @returns Promise
 */
export const getAllCategories = async () => {
	return await fetch(`${BASE_API_URL}categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

/**
 * Fetches a category based on the supplied categoryUrl.
 *
 * @param {*} categoryUrl the categoryUrl to fetch data by.
 * @returns category data in json format.
 */
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

/**
 * Fetch skills from database based on the supplied category id.
 *
 * @param {*} categoryId the categoryId to fetch data by.
 * @returns Promise
 */
export const getSkillsBasedOnCategory = async (categoryId) => {
	return await fetch(`${BASE_API_URL}categories/${categoryId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}