import "./DiscussionBoardComponent.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMessagesBasedOnBoard,
  createMessages,
} from "../../../redux/discussionMessage/messageSlice";
import DiscussionMessageComponent from "../discussionMessages/DiscussionMessageComponent";
// import {fetchUserById} from '../../../redux/User/userSlice'
import { BASE_URL } from "../../../services/index";

const DiscussionBoardComponent = (props) => {
  const {

    // messages,
    selectedProject,
    fetchMessagesBasedOnBoard,
    fullName,
    createMessages,
    messageboardUrl
  } = props;
  const [name, setName] = useState(fullName);
  const [newMessage, setnewMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (newMessage) {
      setnewMessage(false);
      fetchMessagesBasedOnBoard(selectedProject);
      fetchData();
    }
    
    
  
  }, []);

 
  const fetchData = async () => {


    //console.log("messageboardUrl: " + messageboardUrl);
   
    const boardMessages = await fetch(`${BASE_URL}${messageboardUrl}`).then(response => response.json());
    //console.log(boardMessages)
  
    const bordMessagesArray = boardMessages.discussionMessages;
    //console.log(bordMessagesArray)
    

    bordMessagesArray.forEach(async(messageboardUrl) => {
      const boardMessageData = await fetch(`${BASE_URL}${messageboardUrl}`).then(response => response.json());
      //console.log(boardMessageData);
  

      const message = boardMessageData.message;
      const timestamp = boardMessageData.timestamp;
      

      const userUrl = boardMessageData.user;
      //console.log("userUrl: " + userUrl)
   

      const userData = await fetch(`${BASE_URL}${userUrl}`).then(response => response.json()).catch(error => console.log(error));
 
        //console.log(userData);
        const name = userData.firstname + " " + userData.lastname;
        //console.log(name);
        
        const previousMessage = {text: message, user: name }
        setMessages(messages => [...messages, previousMessage]);
      
  
     

    });
  }

   

  const handleTextMessage = (e) => {
    setMessages(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    formData.append("timestamp", "2021-09-02 10:04:50");
    formData.append("user_id", 1);
    formData.append("discussion_board_id", selectedProject);

    console.log("Message: " + message);

   
    fetchMessagesBasedOnBoard(selectedProject);
    fetchData(selectedProject);
    setnewMessage(true);
    setMessages("");

    
      //TODO
      createMessages(formData);
  };

  return (
    <div >
   
      {messages &&
        messages.length > 0 &&
        messages.map((message) => (
          <DiscussionMessageComponent
            message={message.text}
            name={message.user}
            timestamp={message.timestamp}
          ></DiscussionMessageComponent>
        ))}

      <br />
      <div class="custom-input">
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    // fullName: `${state.user.firstname} ${state.user.lastname}`,
      messages: state.messages.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
     fetchMessagesBasedOnBoard: (id) => dispatch(fetchMessagesBasedOnBoard(id)),
    // fetchUserById: (id) => dispatch(fetchUserById(id)),
    createMessages: (data) => dispatch(createMessages(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionBoardComponent);
