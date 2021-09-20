import "./DiscussionBoardComponent.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import KeycloakService from "../../../services/keycloakService";
import {
  fetchMessagesBasedOnBoard,
  createMessages,
} from "../../../redux/discussionMessage/messageSlice";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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

  const renderLoginButtons = () => {
    if (KeycloakService.isLoggedIn()) {
      return (
        <Row>
          <p>Log in or sign up to leave a comment</p>
          <Button
            variant="outline-primary"
            id="btn"
            onClick={() => KeycloakService.doLogin()}
          >
            Log In
          </Button>
          <Button
            variant="primary"
            id="btn"
            onClick={() => KeycloakService.doRegister()}
          >
            Sign Up
          </Button>
        </Row>
      );
    }
  };

  const renderForm = () => {
    return (
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} />
            <Button variant="primary" onClick={(event) => handlePost(event)}>
              Post message
            </Button>
          </Form.Group>
        </Form>
      </Row>
    );
  };

  return (
    <Container>
      <div id="scroll1">
        {/* easy scroll */}
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <DiscussionMessageComponent
              message={message.message}
              timestamp={message.timestamp}
            ></DiscussionMessageComponent>
          ))}

        {!KeycloakService.isLoggedIn ? renderLoginButtons() : renderForm()}

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
    </Container>
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
