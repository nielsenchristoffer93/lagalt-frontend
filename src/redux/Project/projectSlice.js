import { createSlice } from '@reduxjs/toolkit'
import {
	getAllProjects
} from '../../services/projects';

const initialState = {
    selectedProject:0,
    projects:[],
    loading: false,               		
	error: ''
}

const projectSlice = createSlice({
    name:"projects",
    initialState: initialState,
    reducers:{
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
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
    setSelectedProject,
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

export default projectSlice.reducer;