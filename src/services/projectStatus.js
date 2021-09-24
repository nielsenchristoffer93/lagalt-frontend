import { BASE_URL } from ".";

/**
 * Fetches the data associated with the projectStatusUrl supplied.
 *
 * @param {*} projectStatusUrl the projectStatusUrl to fetch data from.
 * @returns projectstatus data in json format.
 */
export const getProjectStatusBasedOnProjectStatusUrl = async (
  projectStatusUrl
) => {
  const response = await fetch(`${BASE_URL}${projectStatusUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return await response.json();
};
