import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../services/categories";

const initialState = {
  categories: [],
  selectedCategory: -1,
  loading: false,
  hasLoaded: false,
  error: "",
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    getAllCategoriesStarted: (state) => {
      state.loading = true;
    },
    getAllCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.hasLoaded = true;
      state.error = "";
    },
    getAllCategoriesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  getAllCategoriesStarted,
  getAllCategoriesSuccess,
  getAllCategoriesFailed,
  setSelectedCategory,
} = categorySlice.actions;

//Thunk
export const fetchAllCategories = () => async (dispatch) => {
  dispatch(getAllCategoriesStarted());
  try {
    const response = await getAllCategories();
    const data = await response.json();

    dispatch(getAllCategoriesSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(getAllCategoriesFailed(err.toString()));
  }
};

export default categorySlice.reducer;
