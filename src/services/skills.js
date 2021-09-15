import { BASE_URL } from "."

export const getSkillBySkillUrl = async (skillUrl) => {
	return await fetch(`${BASE_URL}${skillUrl}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}