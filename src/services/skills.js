export const getSkillBySkillUrl = async (skillUrl) => {
	return await fetch(`http://localhost:8080${skillUrl}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}