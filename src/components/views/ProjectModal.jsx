import { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { fetchMessagesBasedOnBoard, createMessages} from '../../redux/discussionMessage/messageSlice';
import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import { connect } from 'react-redux';

const ProjectModal = (props) => {


    const {
		projects,
        selectedProject,
        fetchMessagesBasedOnBoard,
        setSelectedMessages,
        createMessages,
        messages

	} = props

  const [textMessage, setTextMessage] = useState('');

  useEffect(() => {
     fetchMessagesBasedOnBoard(selectedProject);
  

  }, [messages]);


 
  const handleTextMessage = (e) => {
    setTextMessage(e.target.value); 
  };

  const handlePost = (e) => {

    const formData = new FormData();
    formData.append("message", textMessage);
    formData.append("timestamp", "2021-09-02 10:04:50");
    formData.append("user_id", 1);
    formData.append("discussion_board_id", 1);
   
    console.log("textMessage: " + textMessage);
    /* createMessages({
      "message": textMessage,
      "timestamp": "2021-09-02 10:04:50" ,
      "discussion_board_id": 1,
      "user_id": 1 
  }) */
  createMessages(formData)
    
    
}



    
  return (
      <Container>
      <Row>
          <Col >
    <Card className="projectComponent" style={{marginTop:"0px"}}>
        <Card.Body>
            
        <Card.Title>{projects[selectedProject-1].title}</Card.Title>
        <Card.Text>{projects[selectedProject-1].description}</Card.Text>
        </Card.Body>
        <img style={{minHeight:"250px"}}src="https://source.unsplash.com/1600x900" alt="" />
        <br/>
        <input type="text" class="form-control" placeholder="Type your comment..." 
          value={textMessage} onChange={handleTextMessage}


        />
        <div class="input-group-append"> 
            <button  type="submit" class="btn btn-info" onClick={handlePost}>Post</button>
        </div> 
        <Card.Body>
            <div style={{height:"200px", border:"solid black 1px"}}></div>
            <DiscussionBoardComponent/>
            message board
        </Card.Body>
    </Card>
    </Col>
    {/* if user is member of project*/}
    <Col sm="4" >
    Chat
    </Col>    
    </Row>
    <br/>
    <Row>
        <Col xs={{ span: 2, offset: 5 }}><Button>Apply to project</Button></Col>
    </Row>
    <br/>
    </Container>
  )
}

const mapStateToProps = state => {
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
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
