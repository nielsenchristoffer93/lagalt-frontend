import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import projectReducer from './Project/projectSlice';
import profileReducer from './profile/profileSlice';

// const store = createStore(countReducer);
const store = configureStore({
    reducer: {
      projects: projectReducer,
      profile: profileReducer,
      
    }
  })
 export default store;