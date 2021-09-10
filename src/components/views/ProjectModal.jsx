import { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { fetchMessagesBasedOnBoard, setSelectedMessages} from '../../redux/discussionMessage/messageSlice';
import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import { connect } from 'react-redux';

const ProjectModal = (props) => {


    const {
		projects,
        selectedProject,
        fetchMessagesBasedOnBoard,
        setSelectedMessages,

	} = props

  const [textMessage, setTextMessage] = useState('');

  useEffect(() => {

     fetchMessagesBasedOnBoard(selectedProject);
  

  }, []);


 
  const handleTextMessage = (e) => {
    setTextMessage(e.target.value); 
  };

  const handlePost = (e) => {
   
    console.log("textMessage: " + textMessage);
    
    
    
}



    
  return (
      <Container>
      <Row>
          <Col >
    <Card className="projectComponent" style={{marginTop:"0px"}}>
        <Card.Body>
            
        <Card.Title>{projects[selectedProject].title}</Card.Title>
        <Card.Text>{projects[selectedProject].description}</Card.Text>
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

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchMessagesBasedOnBoard: (id) => dispatch(fetchMessagesBasedOnBoard(id))
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
