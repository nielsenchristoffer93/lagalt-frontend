import { Row } from "react-bootstrap";

const ChatMessageRightComponent = ({name, message, date_created}) => {
  return (
    //<Row className="message row-70w right">
      <div className="chat-message-right">
        <p>
          {name} &#8226; {date_created}
        </p>
        <p className="message-text-right">{message}</p>
      </div>
    //</Row>
  );
};

export default ChatMessageRightComponent;
