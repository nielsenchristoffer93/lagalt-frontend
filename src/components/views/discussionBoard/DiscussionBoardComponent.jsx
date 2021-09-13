
  import { useEffect } from "react";
  import { connect } from "react-redux";
  // import { fetchMessagesBasedOnBoard } from "../../../redux/discussionMessage/messageSlice"
  import DiscussionMessageComponent from '../discussionMessages/DiscussionMessageComponent'
  
  const DiscussionBoardComponent = (props) => {
    const {
      
        messages,
        fetchDiscussionBoard,
        selectedProject,
        fetchMessagesBasedOnBoard
    } = props;
  
    useEffect(() => {
      
      //fetchDiscussionBoard(selectedProject);
       //fetchMessagesBasedOnBoard(selectedProject)
      
    }, []); 
  

  
    return (
      <div>
       {messages && messages.length > 0 && messages.map((message) => <DiscussionMessageComponent 
          message={message.message}
          timestamp={message.timestamp}
        ></DiscussionMessageComponent>)}

          
      </div>
    );
  };
  
  
  const mapStateToProps = (state) => {
    return {
        selectedProject: state.projects.selectedProject,
        messages: state.messages.messages,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
      
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DiscussionBoardComponent);
  