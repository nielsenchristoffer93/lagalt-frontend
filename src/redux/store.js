import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project/ProjectSlice";
import categoryReducer from "./category/CategorySlice";
import viewProjectModal from "./addProject/AddProjectSlice";
import skillsReducer from "./skill/SkillSlice";
import profileReducer from "./profile/ProfileSlice";
import messageReducer from "./discussionMessage/MessageSlice";
import userReducer from "./user/UserSlice";
import joinReducer from "./joinProject/JoinSlice";

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
