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
    showModal: (state) => {
      state.show = !state.show;
    },
  },
});
export const { showModal } = profileSlice.actions;

export default profileSlice.reducer;
