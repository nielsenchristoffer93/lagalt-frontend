import { BASE_API_URL, BASE_URL } from ".";
import KeycloakService from "./keycloak";
import { getUserId } from "./user";

/**
 * Fetch all projects from the database.
 * 
 * @returns Promise
 */
export const getAllProjects = async () => {
  return await fetch(`${BASE_API_URL}projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Creates a new project.
 * 
 * @param {*} data FormData to add to the database.
 * @returns Promise
 */
export const postNewProject = async (data) => {
  return await fetch(`${BASE_API_URL}projects`, {
    headers: {
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
    method: "POST",
    body: data,
  });
};

/**
 * Fetches the projects by either title or a category id.
 * 
 * @param {*} title title of project to filter by.
 * @param {*} categoryId categoryId to filter projects by.
 * @returns Promise
 */
export const filterProjects = async (title, categoryId) => {
  title = title.toLowerCase();
  return await fetch(`${BASE_API_URL}projects/filter/${title},${categoryId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
};

/**
 * Fetch project data based on the id supplied.
 * 
 * @param {*} id The projectId to get data from.
 * @returns Promise
 */
export const getSelectedProjectData = async (id) => {
  return await fetch(`${BASE_API_URL}projects/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
};

/**
 * Fetches the recommended projects (which is basically 4 random projects.)
 * 
 * @returns Promise
 */
export const getRecomendedProject = async () => {
  return await fetch(`${BASE_API_URL}projects/recommended`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
};

/**
 * Updates a project with new data.
 * 
 * @param {*} data FormData to update project with.
 * @param {*} id The id of the project to update.
 * @returns Promise
 */
export const updateProject = async (data, id) => {
  return await fetch(`${BASE_API_URL}projects/${id}`, {
    headers: {
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
    method: "PUT",
    body: data,
  });
};

/**
 * Fetches the projectstatus of every project.
 * 
 * @returns Promise
 */
export const getAllProjectStatus = async () => {
  return await fetch(`${BASE_API_URL}projectstatus`, {
    method: "GET",
  });
};

/**
 * Fetches a projects project status based on the projectStatusUrl.
 * 
 * @param {*} projectStatusUrl the projectStatusUrl to fetch data
 * @returns Promise
 */
export const fetchProjectStatus = async (projectStatusUrl) => {
  return await fetch(`${BASE_URL}${projectStatusUrl}`, {
    headers: {
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
    method: "GET",
  });
};

/**
 * Fetches the projects associated with the logged in user.
 * 
 * @returns projects associated with the logged in user.
 */
export const getUserProjects = async () => {

  const userResponse = await getUserRoles();
  const userData = await userResponse.json();
  const userRoles = userData.projectRoles;
  let projectRoles = [];
  let projects = [];

  for (const url of userRoles) {
    const projectRoleResponse = await getDataFromUrl(url);
    const projectRoleData = await projectRoleResponse.json();

    projectRoles = [...projectRoles, projectRoleData];
  }
  for (const item of projectRoles) {
    const projectResponse = await getDataFromUrl(item.projects[0]);
    const projectData = await projectResponse.json();
    projects = [...projects, projectData];
  }

  return projects;
};

/**
 * Fetches the logged in users userRoles.
 * 
 * @returns Promise
 */
export const getUserRoles = async () => {
  const id = await getUserId();

  return await fetch(`${BASE_API_URL}users/i/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
};

// WHAT DOES THIS DO?
export const getDataFromUrl = async (url) => {
  return await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: "Bearer " + KeycloakService.getToken(),
    },
    method: "GET",
  });
};
