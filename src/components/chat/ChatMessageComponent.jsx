
const ChatMessageComponent = ({name, message, date_created, divStyling, paragraphStyling}) => {
  return (
      <div className={divStyling}>
        <p>
          {name} &#8226; {date_created}
        </p>
        <p className={paragraphStyling}>{message}</p>
      </div>
  );
};

export default ChatMessageComponent;
