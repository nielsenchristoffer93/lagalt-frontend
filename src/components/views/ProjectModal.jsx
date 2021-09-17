import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import ChatWindowComponent from "../chat/ChatWindowComponent";
import KeycloakService from '../../services/keycloakService';
import {showModal} from "../../redux/joinProject/joinSlice";
import JoinProject from "./joinProject/JoinProject";
import { connect } from 'react-redux';
import "./ProjectModal.css";

const ProjectModal = (props) => {
  const displayChat = true;

  function displayChatWindow() {
    return (
      <Col sm="4">
        <ChatWindowComponent chatboardUrl={projects[selectedProject - 1].chatBoard}></ChatWindowComponent>
      </Col>
    );
  }

  const { projects, selectedProject,  showModal } = props;

  const handleShowModal = () => showModal()

  return (
    <Container>
      <Row>
        <Col>
          <Card className="projectComponent" style={{ marginTop: "0px" }}>
            <Card.Body>
              <Card.Title>{projects[selectedProject - 1].title}</Card.Title>
              <Card.Text>{projects[selectedProject - 1].description}</Card.Text>
            </Card.Body>
            <img
              style={{ minHeight: "250px" }}
              src="https://source.unsplash.com/1600x900"
              alt=""
            />
            <Card.Body>
              <DiscussionBoardComponent messageboardUrl={projects[selectedProject - 1].discussionBoard}></DiscussionBoardComponent>
            </Card.Body>
          </Card>
        </Col>
        {/* if user is member of project*/}
        {KeycloakService.isLoggedIn() ? displayChatWindow() : null}
      </Row>
      <br />
      <Row>
        <Col xs={{ span: 2, offset: 5 }}>
          <Button  onClick={handleShowModal}>Apply to project</Button>
          <JoinProject />
        </Col>
      </Row>
      <br />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    messages: state.messages.messages,
    show: state.join.show,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal:() => dispatch(showModal()),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
