import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  loading: false,
  error: "",
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    // reducer for changing the state. if we should show or hide the profile modal.
    showModal: (state) => {
      state.show = !state.show;
    },
  },
});
export const { showModal } = profileSlice.actions;

export default profileSlice.reducer;
