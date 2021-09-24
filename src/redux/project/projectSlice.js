import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProjects,
  filterProjects,
  getSelectedProjectData,
  getRecomendedProject,
  getAllProjectStatus,
  getUserProjects,
} from "../../services/projects";

const initialState = {
  selectedProject: {},
  recommendedProjects: [],
  projects: [],
  loading: false,
  error: "",
  displayProjectModal: false,
  selectedProjectTab: 0,
  projectStatus: [],
  projectsStatusHasLoaded: false,
  userProjects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    setSelectedProjectTab: (state, action) => {
      state.selectedProjectTab = action.payload;
    },
    getSelectedProjectStarted: (state) => {
      state.loading = true;
    },
    getSelectedProjectSuccess: (state, action) => {
      state.selectedProject = action.payload;
      state.loading = false;
      state.error = "";
    },
    getSelectedProjectFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllProjectsStarted: (state) => {
      state.loading = true;
    },
    getAllProjectsSuccess: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = "";
    },
    getAllProjectsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getRecommendedProjectsStarted: (state) => {
      state.loading = true;
    },
    getRecommendedProjectsSuccess: (state, action) => {
      state.recommendedProjects = action.payload;
      state.loading = false;
      state.error = "";
    },
    getRecommendedProjectsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllProjectStatusStarted: (state) => {
      state.loading = true;
    },
    getAllProjectStatusSuccess: (state, action) => {
      state.projectStatus = action.payload;
      state.loading = false;
      state.error = "";
    },
    getAllProjectStatusFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllUserProjectsStarted: (state) => {
      state.loading = true;
    },
    getAllUserProjectsSuccess: (state, action) => {
      state.userProjects = action.payload;
      state.loading = false;
      state.error = "";
    },
    getAllUserProjectsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    showProjectModal: (state) => {
      state.displayProjectModal = true;
    },
    hideProjectModal: (state) => {
      state.displayProjectModal = false;
    },
    setProjectsStatusHasLoaded: (state, action) => {
      state.projectsStatusHasLoaded = action.payload;
    },
  },
});

export const {
  setSelectedProjectTab,
  getSelectedProjectStarted,
  getSelectedProjectSuccess,
  getSelectedProjectFailed,
  getAllProjectsStarted,
  getAllProjectsSuccess,
  getAllProjectsFailed,
  getRecommendedProjectsStarted,
  getRecommendedProjectsSuccess,
  getRecommendedProjectsFailed,
  getAllProjectStatusStarted,
  getAllProjectStatusSuccess,
  getAllProjectStatusFailed,
  getAllUserProjectsStarted,
  getAllUserProjectsSuccess,
  getAllUserProjectsFailed,
  showProjectModal,
  hideProjectModal,
  setProjectsStatusHasLoaded,
} = projectSlice.actions;

/**
 * Fetches all of the projects from the database.
 * 
 * @returns projects in json format.
 */
export const fetchAllProjects = () => async (dispatch) => {
  dispatch(getAllProjectsStarted());
  try {
    const response = await getAllProjects();
    const data = await response.json();

    dispatch(getAllProjectsSuccess(data));
  } catch (err) {
    dispatch(getAllProjectsFailed(err.toString()));
  }
};

/**
 * Fetch projects based on title or a specific categoryId.
 * 
 * @param {*} title The title to find a project by.
 * @param {*} categoryId The categoryId to find a project by.
 * @returns projects based supplied title or categoryId.
 */
export const fetchFilteredProjects =
  (title, categoryId) => async (dispatch) => {
    dispatch(getAllProjectsStarted());
    try {
      const response = await filterProjects(title, categoryId);
      const data = await response.json();

      dispatch(getAllProjectsSuccess(data));
    } catch (err) {
      dispatch(getAllProjectsFailed(err.toString()));
    }
  };

  /**
   * Fetches the selected projects project data.
   * 
   * @param {*} id the id of the project to fetch.
   * @returns project in json format.
   */
export const fetchSelectedProjectData = (id) => async (dispatch) => {
  dispatch(getSelectedProjectStarted());
  try {
    const response = await getSelectedProjectData(id);
    const data = await response.json();

    dispatch(getSelectedProjectSuccess(data));
  } catch (err) {
    dispatch(getSelectedProjectFailed(err.toString()));
  }
};

/**
 * Fetches 4 random projects as recommended projects ( if there are less than 4, fetch the ones available.)
 * 
 * @returns recommended projects in json format.
 */
export const fetchRecommendedProjects = () => async (dispatch) => {
  dispatch(getRecommendedProjectsStarted());
  try {
    const response = await getRecomendedProject();
    const data = await response.json();

    dispatch(getRecommendedProjectsSuccess(data));
  } catch (err) {
    dispatch(getRecommendedProjectsFailed(err.toString()));
  }
};

export const fetchAllProjectStatus = () => async (dispatch) => {
/**
 * Fetches all projects statuses from database.
 * 
 * @returns all project statuses in json format.
 */
  dispatch(getAllProjectStatusStarted());
  try {
    const response = await getAllProjectStatus();
    const data = await response.json();

    dispatch(getAllProjectStatusSuccess(data));
    dispatch(setProjectsStatusHasLoaded(true));
  } catch (err) {
    dispatch(getAllProjectStatusFailed(err.toString()));
  }
};

/**
 * Fetch all of a users projects.
 * 
 * @returns all of the users projects (the projects that the user is a member of)
 */
export const fetchAllUserProjects = () => async (dispatch) => {
  dispatch(getAllUserProjectsStarted());
  try {
    const data = await getUserProjects();
    dispatch(getAllUserProjectsSuccess(data));
    dispatch(setProjectsStatusHasLoaded(true));
  } catch (err) {
    dispatch(getAllUserProjectsFailed(err.toString()));
  }
};

export default projectSlice.reducer;
