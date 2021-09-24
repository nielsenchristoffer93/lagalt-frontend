import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayJoinProjectModal: false,
};
const joinSlice = createSlice({
  name: "join",
  initialState: initialState,
  reducers: {
    // reducer for changing the state. if we should display joinProjectModal or not.
    showJoinProjectModal: (state) => {
      state.displayJoinProjectModal = !state.displayJoinProjectModal;
    },
  },
});
export const { showJoinProjectModal } = joinSlice.actions;

export default joinSlice.reducer;
