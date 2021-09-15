import { Row } from "react-bootstrap";

const ChatMessageLeftComponent = ({name, message, date_created}) => {
  return (
    //<Row className="message row-70w left">
    <div className="chat-message-left">
      <p>
        {name} &#8226; {date_created}
      </p>
      <p className="message-text-left">{message}</p>
    </div>
  //</Row>
  );
};

export default ChatMessageLeftComponent;
