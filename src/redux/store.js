import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import projectReducer from './Project/projectSlice';

// const store = createStore(countReducer);
const store = configureStore({
    reducer: {
      projects: projectReducer,
      
    }
  })
 export default store;