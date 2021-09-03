import { createSlice } from '@reduxjs/toolkit'
import {
	getAllProjects
} from '../../services/projects';

const initialState = {
    projects:[],
    loading: false,               		
	error: ''
}

const projectSlice = createSlice({
    name:"projects",
    initialState: initialState,
    reducers:{
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
	getAllProjectsStarted,
	getAllProjectsSuccess,
	getAllProjectsFailed
} = projectSlice.actions;

//Thunk
 export const fetchAllProjects = () => async dispatch => {
	dispatch(getAllProjectsStarted())
	try {
		const response = await getAllProjects()
		const data = await response.json()

		dispatch(getAllProjectsSuccess(data))
	}
	catch (err) {
        console.log(err)
		dispatch(getAllProjectsFailed(err.toString()))
	}
}

export default projectSlice.reducer;