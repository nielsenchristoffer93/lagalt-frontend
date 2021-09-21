import {getEmail} from './keycloakService';

import {BASE_API_URL, BASE_URL} from "./index";
import KeycloakService from "./keycloakService";

export const getUserId = async() => {
    const response = await fetch(`${BASE_API_URL}users/${getEmail()}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}

export const getUserData = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/i/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

export const getUserSkills = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/skills/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}
export const getUserPortfolio = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/portfolio/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}


export const getUserAbout = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}userProfile/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

export const getUserById = async(id) => {
    return await fetch(`${BASE_URL}${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

export const getUserByUserUrl = async (userUrl) => {
	const response = await fetch(`${BASE_URL}${userUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}

