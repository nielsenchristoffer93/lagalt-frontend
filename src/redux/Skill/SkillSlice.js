import { createSlice } from "@reduxjs/toolkit";
import { getSkillsBasedOnCategory } from "../../services/categories";
import { getSkillBySkillUrl } from "../../services/skills";

const initialState = {
  skillUrls: [],
  skills: [],
  selectedSkills: [],
  loading: false,
  error: "",
};

const skillsSlice = createSlice({
  name: "skills",
  initialState: initialState,
  reducers: {
    getSkillsBasedOnCategoryStarted: (state) => {
      state.loading = true;
    },
    getSkillsBasedOnCategorySuccess: (state, action) => {
      state.skillUrls = action.payload;
      state.loading = false;
      state.hasLoaded = true;
      state.error = "";
    },
    getSkillsBasedOnCategoryFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSkillBasedOnSkillUrlStarted: (state) => {
      state.loading = true;
    },
    getSkillsBasedOnSkillUrlSuccess: (state, action) => {
      state.skills.push(action.payload);
      state.loading = false;
      state.error = "";
    },
    getSkillsBasedOnSkillsUrlFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSkillsToEmptyArray: (state) => {
      state.skills = [];
    },
    setSelectedSkills: (state, action) => {
      if (!state.selectedSkills.includes(action.payload)) {
        state.selectedSkills.push(action.payload);
      } else {
        const index = state.selectedSkills.indexOf(action.payload);
        state.selectedSkills.splice(index, 1);
      }   
    },
    setSelectedSkillsToEmptyArray: (state) => {
      state.selectedSkills = [];
    },
    resetSkillsStates: (state) => {
      state.skillUrls = [];
      state.skills = [];
      state.selectedSkills = [];
      state.loading = false;
      state.error =  "";
    }
  },
});

export const {
  getSkillsBasedOnCategoryStarted,
  getSkillsBasedOnCategorySuccess,
  getSkillsBasedOnCategoryFailed,
  getSkillBasedOnSkillUrlStarted,
  getSkillsBasedOnSkillUrlSuccess,
  getSkillsBasedOnSkillsUrlFailed,
  setSkillsToEmptyArray,
  setSelectedSkills,
  setSelectedSkillsToEmptyArray,
  resetSkillsStates
} = skillsSlice.actions;

//Thunk
export const fetchSkillsBasedOnCategory = (categoryId) => async (dispatch) => {
  dispatch(getSkillsBasedOnCategoryStarted());
  try {
    const response = await getSkillsBasedOnCategory(categoryId);
    const data = await response.json();

    dispatch(getSkillsBasedOnCategorySuccess(data.skills));
  } catch (err) {
    console.log(err);
    dispatch(getSkillsBasedOnCategoryFailed(err.toString()));
  }
};

export const fetchSkillBasedOnSkillUrl = (skillUrl) => async (dispatch) => {
  dispatch(getSkillBasedOnSkillUrlStarted());
  try {
    const response = await getSkillBySkillUrl(skillUrl);
    const data = await response.json();

    dispatch(getSkillsBasedOnSkillUrlSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(getSkillsBasedOnSkillsUrlFailed(err.toString()));
  }
};

export default skillsSlice.reducer;
