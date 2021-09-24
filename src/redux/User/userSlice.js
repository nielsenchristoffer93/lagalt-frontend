import { createSlice } from "@reduxjs/toolkit";
import { getUserData, getUserSkills, getUserPortfolio, getUserAbout, getUserById } from "../../services/user";

const initialState = {

    firstname: "",
    lastname: "",
    email: "",
    about: "",
    skills: [],
    portfolio: [],
    userPosted: false,

}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setFirstname: (state, action) => {
            state.firstname = action.payload;
        },
        setLastname: (state, action) => {
            state.lastname = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setAbout: (state, action) => {
            state.about = action.payload;
        },
        setSkills: (state, action) => {
            state.skills = action.payload;
        },
        setPortfolio: (state, action) => {
            state.portfolio = action.payload;
        },
        initialAddUser: (state, action) => {
            state.userPosted = true;
        },
        resetAddUser: (state, action) => {
            state.userPosted = false;
        }
    }
})
export const {
    setFirstname,
    setLastname,
    setEmail,
    setAbout,
    setSkills,
    setPortfolio,
    initialAddUser,
    resetAddUser
} = userSlice.actions;

/**
 * Fetches data based on the logged in user.
 * 
 * @returns User data in json format.
 */
export const fetchUserData = () => async (dispatch) => {
    try {
        const response = await getUserData();
        const data = await response.json();


        dispatch(setEmail(data.keycloakEmail));
        dispatch(setFirstname(data.firstname));
        dispatch(setLastname(data.lastname));
    } catch (err) {
        console.log(err);
    }
};

/**
 * Fetches the skills associated to the logged in user.
 * 
 * @returns A users skills in json format.
 */
export const fetchUserSkills = () => async (dispatch) => {
    let data;
    try {
        const response = await getUserSkills();
        data = await response.json();

        dispatch(setSkills(data));
    } catch (err) {
        console.log(err);
    }
};

/**
 * Fetches the logged in users userportfolio.
 * 
 * @returns userportfolio items in json format.
 */
export const fetchUserPortfolio = () => async (dispatch) => {
    let data;
    try {
        const response = await getUserPortfolio();
        data = await response.json();

        dispatch(setPortfolio(data));
    } catch (err) {
        console.log(err);
    }
};

/**
 * Fetch about data from Userprofile of the logged in user.
 * 
 * @returns "about" data from userprofile in json format.
 */
export const fetchUserAbout = () => async (dispatch) => {
    try {
        const response = await getUserAbout();
        const data = await response.json();

        dispatch(setAbout(data.about));
        console.log(data.about)
    } catch (err) {
        console.log(err);
    }
};

/**
 * Fetch user by userId.
 * 
 * @param {*} userId The id to fetch user by.
 * @returns user data in json format.
 */
export const fetchUserById = (userId) => async (dispatch) => {
    try {
        const response = await getUserById(userId);
        const data = await response.json();

        dispatch(setFirstname(data.firstname));
        dispatch(setLastname(data.lastname));
    } catch (err) {
        console.log(err);
    }
};


export default userSlice.reducer;