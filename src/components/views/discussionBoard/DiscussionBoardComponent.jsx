import "./DiscussionBoardComponent.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import KeycloakService from "../../../services/keycloakService";
import { fetchMessagesBasedOnBoard } from "../../../redux/discussionMessage/messageSlice";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import DiscussionMessageComponent from "../discussionMessages/DiscussionMessageComponent";
import { postNewDiscussionBoard } from "../../../services/discussionboardService";
import { postMessage } from "../../../services/discussionMessages";
import { BASE_URL } from "../../../services/index";
import { findByDisplayValue } from "@testing-library/dom";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const DiscussionBoardComponent = (props) => {
  const {
    // messages,
    selectedProject,
    fetchMessagesBasedOnBoard,
    fullName,
    createMessages,
    messageboardUrl,
  } = props;

  const forceUpdate = useForceUpdate();

  const [name, setName] = useState(fullName);
  const [newMessage, setnewMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (newMessage) {
      setnewMessage(false);
      fetchMessagesBasedOnBoard(selectedProject.id);
      fetchData(selectedProject.id);
    }
  }, []);

  const fetchData = async () => {
    //console.log("messageboardUrl: " + messageboardUrl);
    var previousMessagesFetched = [];

    const boardMessages = await fetch(`${BASE_URL}${messageboardUrl}`).then(
      (response) => response.json()
    );
    //console.log(messageboardUrl)

    const bordMessagesArray = boardMessages.discussionMessages;
    //console.log(bordMessagesArray)

    bordMessagesArray.forEach(async (messageboardUrl) => {
      const boardMessageData = await fetch(
        `${BASE_URL}${messageboardUrl}`
      ).then((response) => response.json());
      // console.log(boardMessageData);

      const discussionMessageId = boardMessageData.id;

      const message = boardMessageData.message;
      const timestamp = boardMessageData.timestamp;

      const userUrl = boardMessageData.user;
      console.log("userUrl: " + userUrl);

      const userData = await fetch(`${BASE_URL}${userUrl}`)
        .then((response) => response.json())
        .catch((error) => console.log(error));

      console.log(userData);

      const name = userData.firstname + " " + userData.lastname;
      //console.log(name);

      const oldMessage = {
        id: discussionMessageId,
        text: message,
        user: name,
        timestamp: timestamp,
      };
      //setMessages((messages) => [...messages, oldMessage]);

      previousMessagesFetched.push(oldMessage);
      //setstate(state => [...state, previousMessage]);
      previousMessagesFetched = previousMessagesFetched.sort(
        (a, b) => a.id - b.id
      );

      // CAN'T GET THIS ARRAY TO RENDER PROPERLY
      setMessages(previousMessagesFetched);
      forceUpdate();
    });
  };

  const handleTextMessage = (e) => {
    setMessage(e.target.value);
  };

  const handlePost = async (e) => {
    const date = new Date();

    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    formData.append("timestamp", date);
    formData.append("user_id", 1);
    formData.append("discussion_board_id", selectedProject.id);

    console.log("Message: " + message);

    //fetchMessagesBasedOnBoard(selectedProject.id);
    //fetchData(selectedProject.id);
    setnewMessage(true);
    setMessage("");

    await postMessage(formData);
    //fetchMessagesBasedOnBoard(selectedProject.id);
    setMessages([]);
    fetchData(selectedProject.id);
  };

  const renderLoginButtonsOrMessageForm = () => {
    if (!KeycloakService.isLoggedIn()) {
      return (
        <Row>
          <p className="login-paragraph">
            Log in or sign up to leave a comment
          </p>

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
    } else {
      // If user is logged in render form for posting a new message.
      return (
        <div className="message-form-container">
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your comment..."
                value={message}
                onChange={handleTextMessage}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handlePost(event);
                  }
                }}
              />
              <Button variant="primary" onClick={(event) => handlePost(event)}>
                Post message
              </Button>
            </Form.Group>
          </Form>
        </div>
      );
    }
  };

  return (
    <Container>
      <div id="scroll1">
        {/* easy scroll */}
        <div className="discussion-messages-container">
          {messages &&
            messages.length > 0 &&
            messages.map((message) => (
              <DiscussionMessageComponent
                message={message.text}
                name={message.user}
                timestamp={message.timestamp}
              ></DiscussionMessageComponent>
            ))}
        </div>
        {renderLoginButtonsOrMessageForm()}
        {/*<div class="custom-input" id="scroll2">
          <input
            type="text"
            class="custom-input-input"
            placeholder="Type your comment..."
            value={message}
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
          </div>*/}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    fullName: `${state.user.firstname} ${state.user.lastname}`,
    messages: state.messages.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessagesBasedOnBoard: (id) => dispatch(fetchMessagesBasedOnBoard(id)),
    // fetchUserById: (id) => dispatch(fetchUserById(id)),
    //createMessages: (data) => dispatch(createMessages(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionBoardComponent);
