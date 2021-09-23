import { BASE_URL } from ".";

/**
 * Fetches the role data associated with the supplied roleUrl.
 * 
 * @param {*} roleUrl the roleUrl to fetch data on.
 * @returns data in json format.
 */
export const getRoleByRoleUrl = async (roleUrl) => {
  const response = await fetch(`${BASE_URL}${roleUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return await response.json();
};
