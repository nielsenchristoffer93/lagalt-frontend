import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { showAddProjectModal, hideAddProjectModal } =
  addProjectSlice.actions;

export default addProjectSlice.reducer;
