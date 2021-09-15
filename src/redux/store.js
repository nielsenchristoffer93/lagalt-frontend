import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './Project/projectSlice';
import categoryReducer from "./Category/CategorySlice"
import viewProjectModal from "./AddProject/AddProjectSlice"
import skillsReducer from "./Skill/SkillSlice"
import profileReducer from './profile/profileSlice';
import messageReducer from './discussionMessage/messageSlice';

// const store = createStore(countReducer);
const store = configureStore({
    reducer: {
      projects: projectReducer,
      categories: categoryReducer,
      displayAddProjectModal: viewProjectModal,
      skills: skillsReducer,
      profile: profileReducer,
      messages: messageReducer,

    }
  })
 export default store;