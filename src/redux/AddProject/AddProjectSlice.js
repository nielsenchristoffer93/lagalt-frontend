import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayProjectModal: false,
  displayAddProjectModal: false,
};

const addProjectSlice = createSlice({
  name: "displayModals",
  initialState: initialState,
  reducers: {
    showAddProjectModal: (state) => {
      state.displayAddProjectModal = true;
    },
    hideAddProjectModal: (state) => {
      state.displayAddProjectModal = false;
    },
    showProjectModal: (state) => {
      state.displayProjectModal = true;
    },
    hideProjectModal: (state) => {
      state.displayProjectModal = false;
    },
  },
});

export const {
  showAddProjectModal,
  hideAddProjectModal,
  showProjectModal,
  hideProjectModal,
} = addProjectSlice.actions;

export default addProjectSlice.reducer;
