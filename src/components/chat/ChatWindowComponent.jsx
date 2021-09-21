import { Form, Button, Card } from "react-bootstrap";
import ChatMessageComponent from "./ChatMessageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatWindowComponent.css";
import { postNewChatMessage } from "../../services/chat";
import { connect } from "react-redux";
import { BASE_URL } from "../../services/index"
import { getTimeSinceCreation } from "../../services/timeFormatter"
import KeycloakService from "../../services/keycloakService"

let socket;
let ENDPOINT = "localhost:5000";
//let ENDPOINT = "https://lagalt-chat.herokuapp.com/";


//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


const ChatWindowComponent = (props) => {

  const {
    fullName,
    keycloakEmail,
    chatboardUrl,
    selectedProjectId,
  } = props

  const forceUpdate = useForceUpdate();

  const [name, setName] = useState(fullName);
  const [chatRoom, setChatRoom] = useState(selectedProjectId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dateCreated, setDateCreated] = useState(getTimeSinceCreation(new Date()));


  useEffect(() => {
    if(chatboardUrl) {
      fetchData();
    }
  }, [chatboardUrl])

  useEffect(() => {
    //console.log("selectedProjectId: " + selectedProjectId)
    socket = io(ENDPOINT);

    /* console.log("name: " + name);
    console.log("room: " + room); */
    if (name !== undefined && chatRoom !== undefined) {
      socket.emit("join", { name, room: chatRoom }, () => {});
    }

    return () => {
      socket.on("disconnect");
      //socket.emit("disconnect", (name, room));

      socket.off();
      //console.log(socket.connected);
    };
  }, [ENDPOINT]);

  
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const fetchData = async () => {

    //console.log("chatboardUrl: " + chatboardUrl);
    const chatMessages = await fetch(`${BASE_URL}${chatboardUrl}`, {
      headers: {
        'Authorization': 'Bearer ' + KeycloakService.getToken(),
      },
      method: "GET",
    }).then(response => response.json());

    //console.log("CHATMESSAGES")
    //console.log(chatMessages)

    var previousMessagesFetched = [];

    //console.log(chatMessages.chatMessages);
    const chatMessagesArray = chatMessages.chatMessages;
    //console.log(chatMessagesArray)

    chatMessagesArray.forEach(async(chatMessageUrl) => {
      //console.log(chatMessageUrl)
      const chatMessageData = await fetch(`${BASE_URL}${chatMessageUrl}`, {
        headers: {
          'Authorization': 'Bearer ' + KeycloakService.getToken(),
        },
        method: "GET",
      }).then(response => response.json());
      //console.log(chatMessageData);


      const chatMessageId = chatMessageData.id;
      //console.log("chatMessageId: " + chatMessageId);
      const message = chatMessageData.message;
      const timestamp = chatMessageData.timestamp;
      //console.log("message: " + message);
      //console.log("timestamp: " + timestamp);

      const timeFormatted = getTimeSinceCreation(timestamp);
      //console.log("timeFormatted: " + timeFormatted)

      const userUrl = chatMessageData.user;
      //console.log("userUrl: " + userUrl);

      const userData = await fetch(`${BASE_URL}${userUrl}`).then(response => response.json()).catch(error => console.log(error));
      //console.log(userData);
      const name = userData.firstname + " " + userData.lastname;
      //console.log(name);

      const previousMessage = {id: chatMessageId, text: message, user: name, dateCreated: timeFormatted}
      previousMessagesFetched.push(previousMessage);
      //setstate(state => [...state, previousMessage]);
      previousMessagesFetched = previousMessagesFetched.sort((a, b) => a.id - b.id)
      //setstate(state.sort((a, b) => a.id - b.id))
      //console.log("PreviousMessagesFetched")
      //console.log(previousMessagesFetched);
      //setMessages(previousMessagesFetched => [...messages, previousMessagesFetched]);
     

      // CAN'T GET THIS ARRAY TO RENDER PROPERLY
      setMessages(messages => [...messages, previousMessage]);
      //setMessages(previousMessagesFetched);
      forceUpdate()
    });

    //console.log(previousMessagesFetched);
    //previousMessagesFetched = previousMessagesFetched.sort((a, b) => a.id - b.id)
  }

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
    console.log(formData)
    await postNewChatMessage(formData)
  };

  const renderChatmessage = (user, text, dateCreated) => {
    if (user === "Admin") {
      return (
        <p className="admin-message">{user} &#8226; {text}</p>
      )
    } 
    else if (user === fullName) {
      return (
        <ChatMessageComponent
            name={user}
            message={text}
            date_created={dateCreated}
            divStyling={"chat-message-right"}
            paragraphStyling={"message-text-right"}
          ></ChatMessageComponent>
      )
    } 
    else {
      return (
        <ChatMessageComponent
        name={user}
        message={text}
        date_created={dateCreated}
        divStyling={"chat-message-left"}
        paragraphStyling={"message-text-left"}
      ></ChatMessageComponent>
        )
    }
  }


  const renderMessages = () => {
    return messages.map(({ user, text, dateCreated }, index) => (
      <div
        className={
          user === fullName
            ? "message row-70w right"
            : "message row-70w left"
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
        <p>Chat<span className="online-bullet">&#8226;</span></p>
      </Card.Header>
      <Card.Body>
      <div className="message-container">{renderMessages()}</div>
      
      </Card.Body>
      <Card.Footer>
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
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindowComponent);
