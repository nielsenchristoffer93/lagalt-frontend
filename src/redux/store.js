import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './project/projectSlice';
import categoryReducer from "./category/CategorySlice"
import viewProjectModal from "./addProject/AddProjectSlice"
import skillsReducer from "./skill/SkillSlice"
import profileReducer from './profile/profileSlice';
import messageReducer from './discussionMessage/messageSlice';
import userReducer from "./user/userSlice";
import joinReducer from './joinProject/joinSlice'

const store = configureStore({
  reducer: {
    projects: projectReducer,
    categories: categoryReducer,
    displayAddProjectModal: viewProjectModal,
    skills: skillsReducer,
    profile: profileReducer,
    messages: messageReducer,
    user: userReducer,
    join: joinReducer,
  },
});
export default store;
