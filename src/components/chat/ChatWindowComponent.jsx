import { Form, Button, Card } from "react-bootstrap";
import ChatMessageComponent from "./ChatMessageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatWindowComponent.css";
import { postNewChatMessage } from "../../services/chat";
import { connect } from "react-redux";
import { BASE_URL, CHAT_ENDPOINT } from "../../services/index";
import { getTimeSinceCreation } from "../../services/timeFormatter";
import KeycloakService from "../../services/keycloak";
import { useForceUpdate } from "../../hooks/useForceUpdate";

// Socket variable to be used inside component.
let socket;

const ChatWindowComponent = (props) => {
  const { fullName, keycloakEmail, chatboardUrl, selectedProjectId } = props;

  // Custom hook forcing react to re-render.
  const forceUpdate = useForceUpdate();

  const [name, setName] = useState(fullName);
  const [chatRoom, setChatRoom] = useState(selectedProjectId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dateCreated, setDateCreated] = useState(
    getTimeSinceCreation(new Date())
  );

  /**
   * Fetches all the data associated with a chatboard on component render.
   * Will run again if the chatboardUrl changes.
   */
  useEffect(() => {
    if (chatboardUrl) {
      fetchData();
    }
  }, [chatboardUrl]);

  /**
   * Creates a socket on the chat_endpoint and tries to join this if user is logged in and if selectedproject has loaded all the data into redux.
   */
  useEffect(() => {
    socket = io(CHAT_ENDPOINT);

    if (name !== undefined && chatRoom !== undefined) {
      socket.emit("join", { name, room: chatRoom }, () => {});
    }

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [CHAT_ENDPOINT]);

  /**
   * Listens for new chatmessages and appends them to the messages state array.
   */
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  /**
   * Fetches the chatmessages from the specific chatboardUrl.
   * Updates the messages state with all fetched chatmessages.
   */
  const fetchData = async () => {
    const chatMessages = await fetch(`${BASE_URL}${chatboardUrl}`, {
      headers: {
        Authorization: "Bearer " + KeycloakService.getToken(),
      },
      method: "GET",
    }).then((response) => response.json());

    var previousMessagesFetched = [];

    const chatMessagesArray = chatMessages.chatMessages;

    chatMessagesArray.forEach(async (chatMessageUrl) => {
      const chatMessageData = await fetch(`${BASE_URL}${chatMessageUrl}`, {
        headers: {
          Authorization: "Bearer " + KeycloakService.getToken(),
        },
        method: "GET",
      }).then((response) => response.json());

      const chatMessageId = chatMessageData.id;
      const message = chatMessageData.message;
      const timestamp = chatMessageData.timestamp;
      const timeFormatted = getTimeSinceCreation(timestamp);
      const userUrl = chatMessageData.user;

      const userData = await fetch(`${BASE_URL}${userUrl}`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
      const name = userData.firstname + " " + userData.lastname;

      const previousMessage = {
        id: chatMessageId,
        text: message,
        user: name,
        dateCreated: timeFormatted,
      };
      previousMessagesFetched.push(previousMessage);
      previousMessagesFetched = previousMessagesFetched.sort(
        (a, b) => a.id - b.id
      );

      setMessages((messages) => [...messages, previousMessage]);
      forceUpdate();
    });
  };

  /**
   * Emits the message to the chatserver so that everyone in room can see the message.
   * Will also post the message to the database so that we can fetch the previous messages later.
   *
   * @param {*} event Event is used to prevent the default react behaviour when submitting a from.
   */
  const sendMessage = async (event) => {
    event.preventDefault();

    const date = new Date();
    setDateCreated(getTimeSinceCreation(date));

    if (message) {
      socket.emit("sendMessage", message, dateCreated, name, chatRoom, () => {
        setMessage("");
      });
    }

    const formData = new FormData();
    formData.append("projectId", selectedProjectId);
    formData.append("message", message);
    formData.append("timestamp", date);
    formData.append("keycloakEmail", keycloakEmail);
    console.log(formData);
    await postNewChatMessage(formData);
  };

  /**
   * Renders a chatmessage with appropriate styling based on what type of user it is.
   *
   * @param {*} user The name of the user to render.
   * @param {*} text The text/message to display in component.
   * @param {*} dateCreated The date of the created message.
   * @returns JSX with appropriate styling based on user.
   */
  const renderChatmessage = (user, text, dateCreated) => {
    if (user === "Admin") {
      return (
        <p className="admin-message">
          {user} &#8226; {text}
        </p>
      );
    } else if (user === fullName) {
      return (
        <ChatMessageComponent
          name={user}
          message={text}
          date_created={dateCreated}
          divStyling={"chat-message-right"}
          paragraphStyling={"message-text-right"}
        ></ChatMessageComponent>
      );
    } else {
      return (
        <ChatMessageComponent
          name={user}
          message={text}
          date_created={dateCreated}
          divStyling={"chat-message-left"}
          paragraphStyling={"message-text-left"}
        ></ChatMessageComponent>
      );
    }
  };

  /**
   * Renders all the chatmessages from messages state.
   *
   * @returns JSX either to the left or right based on user.
   */
  const renderMessages = () => {
    return messages.map(({ user, text, dateCreated }, index) => (
      <div
        className={
          user === fullName ? "message row-70w right" : "message row-70w left"
        }
        key={index}
      >
        {renderChatmessage(user, text, dateCreated)}
      </div>
    ));
  };

  return (
    <Card>
      <Card.Header className="card-header">
        <p>
          Chat<span className="online-bullet">&#8226;</span>
        </p>
      </Card.Header>
      <Card.Body>
        <div className="message-container">{renderMessages()}</div>
      </Card.Body>
      <Card.Footer>
        <Form className="chat-form">
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : null
              }
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="success"
              size="lg"
              onClick={(event) => sendMessage(event)}
            >
              <FontAwesomeIcon icon={faReply}></FontAwesomeIcon>
            </Button>
          </div>
        </Form>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.projects.selectedProject,
    fullName: `${state.user.firstname} ${state.user.lastname}`,
    keycloakEmail: state.user.email,
    selectedProjectId: state.projects.selectedProject.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindowComponent);
