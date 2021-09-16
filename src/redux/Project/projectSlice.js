import { createSlice } from '@reduxjs/toolkit'
import {
	getAllProjects, getAllProjectsWithCategory, filterProjects, getSelectedProjectData
} from '../../services/projects';

const initialState = {
	selectedProject:{},
    projects:[],
    loading: false,               		
	error: ''
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
    }

})

export const {
    getSelectedProjectStarted,
	getSelectedProjectSuccess,
	getSelectedProjectFailed,
	getAllProjectsStarted,
	getAllProjectsSuccess,
	getAllProjectsFailed,
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


export default projectSlice.reducer;