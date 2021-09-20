import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    show: false,
    loading: false,
    error: '',
}
const joinSlice = createSlice({
    name: "join",
    initialState: initialState,
    reducers: {
        showModal: (state) => {
            state.show = !state.show;
        },
    }
})
export const {
    showModal,
} = joinSlice.actions;


export default joinSlice.reducer;