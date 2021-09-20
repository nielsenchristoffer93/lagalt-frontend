import { createSlice } from '@reduxjs/toolkit'
import {
	getAllProjects, getAllProjectsWithCategory, filterProjects, 
	getSelectedProjectData, getRecomendedProject
} from '../../services/projects';

const initialState = {
	selectedProject:{},
	recommendedProjects: [],
    projects:[],
    loading: false,               		
	error: '',
	displayProjectModal: false,
}

const projectSlice = createSlice({
    name:"projects",
    initialState: initialState,
    reducers:{
		getSelectedProjectStarted: (state) => {
			state.loading = true
		},
		getSelectedProjectSuccess: (state, action) => {
			state.selectedProject = action.payload
			state.loading = false
			state.error = ''
		},
		getSelectedProjectFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
        getAllProjectsStarted: (state) => {
			state.loading = true
		},
		getAllProjectsSuccess: (state, action) => {
			state.projects = action.payload
			state.loading = false
			state.error = ''
		},
		getAllProjectsFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		getRecommendedProjectsStarted: (state) => {
			state.loading = true
		},
		getRecommendedProjectsSuccess: (state, action) => {
			state.recommendedProjects = action.payload
			state.loading = false
			state.error = ''
		},
		getRecommendedProjectsFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		showProjectModal: (state) => {
			state.displayProjectModal = true;
		  },
		hideProjectModal: (state) => {
		state.displayProjectModal = false;
		},
    }

})

export const {
    getSelectedProjectStarted,
	getSelectedProjectSuccess,
	getSelectedProjectFailed,
	getAllProjectsStarted,
	getAllProjectsSuccess,
	getAllProjectsFailed,
	getRecommendedProjectsStarted,
	getRecommendedProjectsSuccess,
	getRecommendedProjectsFailed,
	showProjectModal,
	hideProjectModal,
} = projectSlice.actions;

//Thunk
 export const fetchAllProjects = () => async dispatch => {
	dispatch(getAllProjectsStarted())
	try {
		const response = await getAllProjects()
		const data = await response.json()

		console.log(data)

		dispatch(getAllProjectsSuccess(data))
	}
	catch (err) {
        console.log(err)
		dispatch(getAllProjectsFailed(err.toString()))
	}
}

export const fetchAllProjectsWithCategory = (id) => async dispatch => {
	dispatch(getAllProjectsStarted())
	try {
		const response = await getAllProjectsWithCategory(id)
		const data = await response.json()

		dispatch(getAllProjectsSuccess(data))
	}
	catch (err) {
        console.log(err)
		dispatch(getAllProjectsFailed(err.toString()))
	}
}

export const fetchFilteredProjects = (title, categoryId) => async dispatch => {
	dispatch(getAllProjectsStarted())
	try {
		const response = await filterProjects(title, categoryId)
		const data = await response.json()

		dispatch(getAllProjectsSuccess(data))
	}
	catch (err) {
        console.log(err)
		dispatch(getAllProjectsFailed(err.toString()))
	}
}

export const fetchSelectedProjectData = (id) => async dispatch => {
	dispatch(getSelectedProjectStarted())
	try {
		const response = await getSelectedProjectData(id)
		const data = await response.json()

		dispatch(getSelectedProjectSuccess(data))
	}
	catch (err) {
        console.log(err)
		dispatch(getSelectedProjectFailed(err.toString()))
	}
}

export const fetchRecommendedProjects = () => async dispatch => {
	dispatch(getRecommendedProjectsStarted())
	try {
		const response = await getRecomendedProject()
		const data = await response.json()

		dispatch(getRecommendedProjectsSuccess(data))
	}
	catch (err) {
        console.log(err)
		dispatch(getRecommendedProjectsFailed(err.toString()))
	}
}


export default projectSlice.reducer;