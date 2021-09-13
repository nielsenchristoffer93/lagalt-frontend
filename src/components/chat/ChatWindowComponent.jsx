import { Container, Form, Button, Row } from "react-bootstrap";
import ChatMessageLeftComponent from "./ChatMessageLeftComponent";
import ChatMessageRightComponent from "./ChatMessageRightComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import UserService from "../../services/UserService";
import "./ChatWindowComponent.css";
import { computeHeadingLevel } from "@testing-library/dom";

const socket = io.connect("http://localhost:4000");

const ChatWindowComponent = () => {
  const [chat, setChat] = useState([]);
  const [state, setState] = useState({
    message: "",
    name: UserService.getUsername(),
    date_created: "5 h",
  });

  useEffect(() => {
    
    socket.on("message", ({ name, message, date_created }) => {
      // without this line chat needs you to change something on screen before it updates chat.
      setChat([...chat, {name, message, date_created }])
      addToChat({name, message, date_created })
      
    });
  }, []);

  const addToChat = (message) => {
    const newArray = chat;
    newArray.push(message)
    setChat(newArray);
    
  }



  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();

    const { name, message, date_created } = state;
    console.log(name);
    socket.emit("message", { name, message, date_created });
    setState({ message: "", name: name, date_created: "" });
  };

  const renderChat = () => {
    return chat.map(({ name, message, date_created }, index) => (
      <Row className={name === UserService.getUsername() ? "message row-70w right" : "message row-70w left"} key={index}>  
        {name === UserService.getUsername() ? (
          <ChatMessageRightComponent
            name={name}
            message={message}
            date_created={date_created}
          ></ChatMessageRightComponent>
        ) : (
          <ChatMessageLeftComponent
            name={name}
            message={message}
            date_created={date_created}
          ></ChatMessageLeftComponent>
        )}
        </Row>
    ));
  };

  return (
    <div>
      <Container className="message-container">
        {renderChat()}
        {/*<ChatMessageLeftComponent
          name={name}
          message={message}
          date_created={date_created}
        ></ChatMessageLeftComponent>
        <ChatMessageRightComponent
          name={name}
          message={message}
          date_created={date_created}
        ></ChatMessageRightComponent>
        <ChatMessageLeftComponent
          name={name}
          message={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          date_created={date_created}
        ></ChatMessageLeftComponent>
        <ChatMessageRightComponent
          name={name}
          message={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          date_created={date_created}
        ></ChatMessageRightComponent>*/}
      </Container>
      <Form onSubmit={onMessageSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => onTextChange(e)}
            name="message"
            value={state.message}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" type="submit">
            <FontAwesomeIcon icon={faReply} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChatWindowComponent;
