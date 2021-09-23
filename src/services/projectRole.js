import { BASE_API_URL, BASE_URL } from ".";
import KeycloakService from "./keycloakService";

/**
 * Fetches all projectRoles.
 * 
 * @returns Promise
 */
export const getProjectRole = async () => {
  return await fetch(`${BASE_API_URL}projectrole`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
  });
};

/**
 * Adds/creates a project role in a project.
 * 
 * @param {*} data FormData to post to the database.
 * @returns Promise
 */
export const postNewProjectRole = async (data) => {
  return await fetch(`${BASE_API_URL}projectrole`, {
    headers: {
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
    method: "POST",
    body: data,
  });
};

/**
 * Fetches the project roles based on the projectRoleUrl.
 * 
 * @param {*} projectRoleUrl the projectRoleUrl to fetch data by.
 * @returns projectRole data as json data.
 */
export const getProjectRoleByProjectRoleUrl = async (projectRoleUrl) => {
  const response = await fetch(`${BASE_URL}${projectRoleUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return await response.json();
};
