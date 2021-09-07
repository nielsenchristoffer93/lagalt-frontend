import { BASE_API_URL } from ".";

export const getAllCategories = async () => {
	return await fetch(`${BASE_API_URL}categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getSkillsBasedOnCategory = async (categoryId) => {
	return await fetch(`${BASE_API_URL}categories/${categoryId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}