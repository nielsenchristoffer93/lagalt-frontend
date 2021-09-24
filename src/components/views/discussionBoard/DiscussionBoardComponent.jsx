import "./DiscussionBoardComponent.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import KeycloakService from "../../../services/keycloak";
import { fetchMessagesBasedOnBoard } from "../../../redux/discussionMessage/MessageSlice";
import { Col, Button, Form, Card } from "react-bootstrap";
import { getUserId } from "../../../services/user";
import DiscussionMessageComponent from "../discussionMessages/DiscussionMessageComponent";
import { postMessage } from "../../../services/discussionMessages";
import { getTimeSinceCreation } from "../../../services/timeFormatter";
import { BASE_URL } from "../../../services/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useForceUpdate } from "../../../hooks/useForceUpdate";

const DiscussionBoardComponent = (props) => {
  const {
    selectedProject,
    fetchMessagesBasedOnBoard,
    messageBoardUrl,
  } = props;

  const forceUpdate = useForceUpdate();

  const [newMessage, setNewMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ setDateCreated] = useState(
    getTimeSinceCreation(new Date())
  );

  useEffect(() => {
    if (newMessage) {
      setNewMessage(false);
      fetchMessagesBasedOnBoard(selectedProject.id);
      fetchData(selectedProject.id);
    }
  }, []);

  const fetchData = async () => {
    let previousMessagesFetched = [];

    const boardMessages = await fetch(`${BASE_URL}${messageBoardUrl}`).then(
      (response) => response.json()
    );

    console.log(boardMessages)

    const bordMessagesArray = boardMessages.discussionMessages;

    bordMessagesArray.forEach(async (messageboardUrl) => {
      const boardMessageData = await fetch(
        `${BASE_URL}${messageboardUrl}`
      ).then((response) => response.json());

      const discussionMessageId = boardMessageData.id;

      const message = boardMessageData.message;
      const timestamp = boardMessageData.timestamp;

      const userUrl = boardMessageData.user;

      const userData = await fetch(`${BASE_URL}${userUrl}`)
        .then((response) => response.json())
        .catch((error) => console.log(error));

      const name = userData.firstname + " " + userData.lastname;
      const oldMessage = {
        id: discussionMessageId,
        text: message,
        user: name,
        timestamp: timestamp,
      };

      previousMessagesFetched.push(oldMessage);
      previousMessagesFetched = previousMessagesFetched.sort(
        (a, b) => a.id - b.id
      );

      setMessages(previousMessagesFetched);
      forceUpdate();
    });
  };

  const handleTextMessage = (e) => {
    setMessage(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    let date = new Date();
    const userId = await getUserId();
    setDateCreated(getTimeSinceCreation(date));

    setNewMessage(true);
    setMessage("");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("timestamp", date);
    formData.append("user_id", userId);
    formData.append("discussion_board_id", selectedProject.id);

    console.log("Message: " + message);

    await postMessage(formData);
    setMessages([]);
    fetchData(selectedProject.id);
  };

  const renderLoginButtonsOrMessageForm = () => {
    if (!KeycloakService.isLoggedIn()) {
      return (
        <Card className="discussion-board-login">
          <Col>
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
          </Col>
        </Card>
      );
    } else {
      // If user is logged in render form for posting a new message.
      return (
        <div className="discussion-board-form">
          <Form>
            <Form.Group>
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
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={(event) => handlePost(event)}>
              Post message <FontAwesomeIcon icon={faReply}/>
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="discussion-board-container">
      <div className="discussion-messages-container">
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <DiscussionMessageComponent
                message={message.text}
                name={message.user}
                timestamp={message.timestamp}
            />
          ))}
      </div>
      {renderLoginButtonsOrMessageForm()}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionBoardComponent);
