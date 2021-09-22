import { BASE_URL, BASE_API_URL } from "."
import {getUserId} from './user'
import KeycloakService from "./keycloakService";

export const getSkillBySkillUrl = async (skillUrl) => {
	return await fetch(`${BASE_URL}${skillUrl}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
	})
}
export const addUserSkill = async (skillUrl) => {
	const userId = await getUserId();
	return await fetch(`${BASE_API_URL}users/${userId}/skills/${skillUrl}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
	})
}
export const deleteUserSkill = async (skillUrl) => {
	const userId = await getUserId();
	return await fetch(`${BASE_API_URL}users/${userId}/skills/${skillUrl}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + KeycloakService.getToken(),
		},
	})
}