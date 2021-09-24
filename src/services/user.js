import { getEmail } from './keycloakService';

import { BASE_API_URL, BASE_URL } from "./index";
import KeycloakService from "./keycloakService";

/**
 * Fetches the user data based on email for the logged in user (which we got from keycloak).
 *
 * @returns user data in json format.
 */
export const getUserId = async () => {
    const response = await fetch(`${BASE_API_URL}users/${getEmail()}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
    return await response.json();
}

/**
 * Fetches the data associated to the logged in user.
 *
 * @returns Promise
 */
export const getUserData = async () => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/i/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

/**
 * Fetches the skills related to the logged in user.
 *
 * @returns Promise
 */
export const getUserSkills = async () => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/skills/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

/**
 * Fetches the logged in users userportfolio.
 *
 * @returns Promise
 */
export const getUserPortfolio = async () => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/portfolio/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

/**
 * Get "about" data from the logged in users userprofile.
 *
 * @returns Promise
 */
export const getUserAbout = async () => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}userProfile/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
    })
}

/**
 * Get user from database by id.
 *
 * @param {*} id Id to get user by.
 * @returns Promise
 */
export const getUserById = async (id) => {
    return await fetch(`${BASE_URL}${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

/**
 * Method for posting a new PortfolioItem to the database.
 *
 * @param {*} data FormData to post to database.
 * @returns Promise
 */
export const postNewPortfolioItem = async (data) => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}portfolio/users/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "POST",
        body: data
    })
}

/**
 * Get the user by user url (which we can get by fetching from a table related to user.)
 *
 * @param {*} userUrl The user url to fetch data from.
 * @returns user data in json format.
 */
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

/**
 * Deletes a portfolio item on id.
 *
 * @param {*} id PortfolioItemId to delete.
 * @returns Promise
 */
export const deletePortfolioItem = async (id) => {
    // const id = await getUserId();
    return await fetch(`${BASE_API_URL}portfolio/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "DELETE",
    })
}

/**
 * Post "about" for a users userprofile.
 *
 * @param {*} data FormData to post to database.
 * @returns Promise
 */
export const postUserAbout = async (data) => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}userProfile/${id}/about`, {
        headers: {
            'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "POST",
        body: data
    })
}

