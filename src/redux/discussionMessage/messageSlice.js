import { createSlice } from "@reduxjs/toolkit";
import {
  getMessagesBasedOnDiscussionBoard,
  postMessage,
} from "../../services/discussionMessages";

const initialState = {
  messages: [],
  loading: false,
  error: "",
};

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    getMessagesBasedOnDiscussionBoardStarted: (state) => {
      state.loading = true;
    },
    getMessagesBasedOnDiscussionBoardSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = "";
    },
    getMessagesBasedOnDiscussionBoardFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postMessagesStarted: (state) => {
      state.loading = true;
    },
    postMessagesSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = "";
    },
    postMessagesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMessagesBasedOnDiscussionBoardStarted,
  getMessagesBasedOnDiscussionBoardSuccess,
  getMessagesBasedOnDiscussionBoardFailed,
  postMessagesStarted,
  postMessagesSuccess,
  postMessagesFailed,
} = messageSlice.actions;

//Thunk
export const fetchMessagesBasedOnBoard =
  (discussionBoardId) => async (dispatch) => {
    dispatch(getMessagesBasedOnDiscussionBoardStarted());
    try {
      const response = await getMessagesBasedOnDiscussionBoard(
        discussionBoardId
      );
      const data = await response.json();

      dispatch(getMessagesBasedOnDiscussionBoardSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getMessagesBasedOnDiscussionBoardFailed(err.toString()));
    }
  };
  
//Add Post
export const createMessages = (message) => async (dispatch) => {
  console.log("text");
  dispatch(postMessagesStarted());
  try {
    const response = await postMessage(message);
    const data = await response.json();

    dispatch(postMessagesSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(postMessagesFailed(err.toString()));
  }
};

export default messageSlice.reducer;
