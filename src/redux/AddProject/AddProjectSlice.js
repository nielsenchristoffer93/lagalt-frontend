import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    displayProjectModal: false
}

const addProjectSlice = createSlice({
    name: "addProjectModal",
    initialState: initialState,
    reducers: {
        showAddProjectModal: (state) => {
            state.displayProjectModal = true
        },
        hideAddProjectModal: (state) => {
            state.displayProjectModal = false
        }
    }
})

export const {
	showAddProjectModal,
	hideAddProjectModal
} = addProjectSlice.actions;

export default addProjectSlice.reducer