import "./DiscussionBoardComponent.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMessagesBasedOnBoard,
  createMessages,
} from "../../../redux/discussionMessage/messageSlice";
import DiscussionMessageComponent from "../discussionMessages/DiscussionMessageComponent";

const DiscussionBoardComponent = (props) => {
  const {
    messages,
    selectedProject,
    fetchMessagesBasedOnBoard,
    createMessages,
  } = props;
  const [newMessage, setnewMessage] = useState(true);
  const [textMessage, setTextMessage] = useState("");

  useEffect(() => {
    if (newMessage) {
      setnewMessage(false);
      fetchMessagesBasedOnBoard(selectedProject.id);
    }
  }, [messages]);

  const handleTextMessage = (e) => {
    setTextMessage(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", textMessage);
    formData.append("timestamp", "2021-09-02 10:04:50");
    formData.append("user_id", 1);
    formData.append("discussion_board_id", selectedProject.id);

    console.log("textMessage: " + textMessage);

    createMessages(formData);

    fetchMessagesBasedOnBoard(selectedProject.id);
    setnewMessage(true);
    setTextMessage("");
  };

  return (
    <div id="scroll1">
      {/* easy scroll */}
      <a href="#scroll2">Add comments</a>
      {messages &&
        messages.length > 0 &&
        messages.map((message) => (
          <DiscussionMessageComponent
            message={message.message}
            timestamp={message.timestamp}
          ></DiscussionMessageComponent>
        ))}

      <br />
      <div class="custom-input" id="scroll2">
        <input
          type="text"
          class="custom-input-input"
          placeholder="Type your comment..."
          value={textMessage}
          onChange={handleTextMessage}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handlePost(event);
            }
          }}
        />
        <button
          type="submit"
          class="custom-input-botton"
          onClick={(event) => handlePost(event)}
        >
          Post
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    messages: state.messages.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessagesBasedOnBoard: (id) => dispatch(fetchMessagesBasedOnBoard(id)),
    createMessages: (data) => dispatch(createMessages(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionBoardComponent);
