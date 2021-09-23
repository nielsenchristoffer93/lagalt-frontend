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
import KeycloakService from "../../services/keycloakService";
import { useForceUpdate } from "../../hooks/useForceUpdate";

let socket;

const ChatWindowComponent = (props) => {
  const { fullName, keycloakEmail, chatboardUrl, selectedProjectId } = props;

  const forceUpdate = useForceUpdate();

  const [name, setName] = useState(fullName);
  const [chatRoom, setChatRoom] = useState(selectedProjectId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dateCreated, setDateCreated] = useState(
    getTimeSinceCreation(new Date())
  );

  useEffect(() => {
    if (chatboardUrl) {
      fetchData();
    }
  }, [chatboardUrl]);

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

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

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
