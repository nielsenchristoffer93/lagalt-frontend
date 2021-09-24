import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayAddProjectModal: false,
};

const addProjectSlice = createSlice({
  name: "displayModals",
  initialState: initialState,
  reducers: {
    // reducer for showing the project modal window.
    showAddProjectModal: (state) => {
      state.displayAddProjectModal = true;
    },
    // reducer for changing the state to hide the project modal window.
    hideAddProjectModal: (state) => {
      state.displayAddProjectModal = false;
    },
  },
});

export const { showAddProjectModal, hideAddProjectModal } =
  addProjectSlice.actions;

export default addProjectSlice.reducer;
