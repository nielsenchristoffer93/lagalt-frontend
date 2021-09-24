import { BASE_URL, BASE_API_URL } from ".";
import { getUserId } from "./user";
import KeycloakService from "./keycloak";

/**
 * Fetches the skill data based on the supplied skillUrl.
 *
 * @param {*} skillUrl The skillUrl to fetch data from
 * @returns Promise
 */
export const getSkillBySkillUrl = async (skillUrl) => {
  return await fetch(`${BASE_URL}${skillUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
  });
};

/**
 * Adds the specified skill to the users list of skills.
 *
 * @param {*} skillUrl the skill to add to a users list of skills.
 * @returns Promise
 */
export const addUserSkill = async (skillUrl) => {
  const userId = await getUserId();
  return await fetch(`${BASE_API_URL}users/${userId}/skills/${skillUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
  });
};

/**
 * Deletes a users skill based on the skillUrl.
 *
 * @param {*} skillUrl the skill to remove from the users list of skills.
 * @returns Promise
 */
export const deleteUserSkill = async (skillUrl) => {
  const userId = await getUserId();
  return await fetch(`${BASE_API_URL}users/${userId}/skills/${skillUrl}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
  });
};
