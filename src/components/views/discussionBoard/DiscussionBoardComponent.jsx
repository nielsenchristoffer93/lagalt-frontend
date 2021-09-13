  import "./DiscussionBoardComponent.css";
  import { useEffect, useState  } from "react";
  import { connect } from "react-redux";
  import { fetchMessagesBasedOnBoard, createMessages} from '../../../redux/discussionMessage/messageSlice';
  // import { fetchMessagesBasedOnBoard } from "../../../redux/discussionMessage/messageSlice"
  import DiscussionMessageComponent from '../discussionMessages/DiscussionMessageComponent'
  
  const DiscussionBoardComponent = (props) => {
    const {
      
        messages,
        fetchDiscussionBoard,
        selectedProject,
        fetchMessagesBasedOnBoard,
        createMessages
    } = props;
    const [newMessage, setnewMessage] = useState(true);
    const [textMessage, setTextMessage] = useState('');

    useEffect(() => {
      if(newMessage){
        setnewMessage(false)
      fetchMessagesBasedOnBoard(selectedProject);
      }
      //fetchDiscussionBoard(selectedProject);
       //fetchMessagesBasedOnBoard(selectedProject)
      
    }, [messages]); 


    const handleTextMessage = (e) => {
      setTextMessage(e.target.value); 
    };
  
    const handlePost = (e) => {
  
      const formData = new FormData();
      formData.append("message", textMessage);
      formData.append("timestamp", "2021-09-02 10:04:50");
      formData.append("user_id", 1);
      formData.append("discussion_board_id", selectedProject);
     
      console.log("textMessage: " + textMessage);
      /* createMessages({
        "message": textMessage,
        "timestamp": "2021-09-02 10:04:50" ,
        "discussion_board_id": 1,
        "user_id": 1 
    }) */
    createMessages(formData)
    
    fetchMessagesBasedOnBoard(selectedProject);
    setnewMessage(true)
    setTextMessage('')
      
  }
  

  
    return (
      
      <div>
       {messages && messages.length > 0 && messages.map((message) => <DiscussionMessageComponent 
          message={message.message}
          timestamp={message.timestamp}

        ></DiscussionMessageComponent>)}
        
      <br />
       <div class="custom-input"> 
        <input type="text" class="custom-input-input" placeholder="Type your comment..." 
          value={textMessage} onChange={handleTextMessage} onKeyPress={event => {
            if (event.key === "Enter") {
                handlePost();
            }
        }}/>
            <button  type="submit" class="custom-input-botton" onClick={handlePost}>Post</button>
        </div>
    
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
      createMessages: (data) => dispatch(createMessages(data)),
      
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DiscussionBoardComponent);
  