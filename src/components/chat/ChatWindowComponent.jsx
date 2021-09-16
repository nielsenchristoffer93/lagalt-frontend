import { Container, Form, Button, Row } from "react-bootstrap";
import ChatMessageLeftComponent from "./ChatMessageLeftComponent";
import ChatMessageRightComponent from "./ChatMessageRightComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import KeycloakService from "../../services/keycloakService";
import "./ChatWindowComponent.css";
import { postNewChatMessage } from "../../services/chat";
import { connect } from "react-redux";
import { BASE_URL } from "../../services/index"

let socket;
let ENDPOINT = "localhost:5000";

const ChatWindowComponent = (props) => {

  const {
    selectedProject,
    fullName,
    keycloakEmail,
    chatboardUrl
  } = props

  const [name, setName] = useState(fullName);
  const [room, setRoom] = useState(selectedProject.id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dateCreated, setDateCreated] = useState("5 h");

  useEffect(() => {
    socket = io(ENDPOINT);

    /* console.log("name: " + name);
    console.log("room: " + room); */
    if (name !== undefined && room !== undefined) {
      socket.emit("join", { name, room }, () => {});
    }

    return () => {
      socket.on("disconnect");
      //socket.emit("disconnect", (name, room));

      socket.off();
      //console.log(socket.connected);
    };
  }, [ENDPOINT]);

  useEffect(() => {

    fetchData();

    socket.on("message", (message) => {
      /* console.log("socket.on");
      console.log(message); */
      setMessages([...messages, message]);
      addMessageToMessages(message);
    });
  }, []);

  const fetchData = async () => {
    //console.log("chatboardUrl: " + chatboardUrl);
    const chatMessages = await fetch(`${BASE_URL}${chatboardUrl}`).then(response => response.json());
    //console.log(chatMessages.chatMessages);
    const chatMessagesArray = chatMessages.chatMessages;
    console.log(chatMessagesArray)

    chatMessagesArray.forEach(async(chatMessageUrl) => {
      const chatMessageData = await fetch(`${BASE_URL}${chatMessageUrl}`).then(response => response.json());
      console.log(chatMessageData);

      const message = chatMessageData.message;
      const timestamp = chatMessageData.timestamp;
      console.log("message: " + message);
      console.log("timestamp: " + timestamp);

      const userUrl = chatMessageData.user;
      console.log("userUrl: " + userUrl);

      //const userData = await fetch(`${BASE_URL}${userUrl}`).then(response => response.json());
      //console.log(userData);

    });

  }

  const addMessageToMessages = (message) => {
    const newArray = messages;
    newArray.push(message);
    setMessages(newArray);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, dateCreated, name, room, () => {
        setMessage("");
      });
    }

    let date = new Date();

    // Create a new chatboard if it doesn't exist and post message to chatboard.
    const formData = new FormData();
    formData.append("projectId", selectedProject);
    formData.append("message", message);
    formData.append("timestamp", date);
    formData.append("keycloakEmail", keycloakEmail);

    // Display the key/value pairs
    /* for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    } */

    await postNewChatMessage(formData);
  };

  const renderMessages = () => {
    return messages.map(({ user, text, dateCreated }, index) => (
      <Row
        className={
          user === fullName
            ? "message row-70w right"
            : "message row-70w left"
        }
        key={index}
      >
        {user === fullName ? (
          <ChatMessageRightComponent
            name={user}
            message={text}
            date_created={dateCreated}
          ></ChatMessageRightComponent>
        ) : (
          <ChatMessageLeftComponent
            name={user}
            message={text}
            date_created={dateCreated}
          ></ChatMessageLeftComponent>
        )}
      </Row>
    ));
  };

  return (
    <div>
      <Container className="message-container">{renderMessages()}</Container>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
            <FontAwesomeIcon icon={faReply} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.projects.selectedProject,
    fullName: `${state.user.firstname} ${state.user.lastname}`,
    keycloakEmail: state.user.email,
    //chatboardUrl: state.projects.
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindowComponent);
