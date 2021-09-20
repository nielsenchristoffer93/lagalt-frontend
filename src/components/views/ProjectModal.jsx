import {Modal, Card, Col, Row, Button, Container } from 'react-bootstrap';
import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import ChatWindowComponent from "../chat/ChatWindowComponent";
import KeycloakService from '../../services/keycloakService';
import { hideProjectModal } from '../../redux/Project/projectSlice'
import { getTimeSinceCreation } from "../../services/timeFormatter";
import { connect } from 'react-redux';
import "./ProjectModal.css";

const ProjectModal = (props) => {
  const {
    projects,
    selectedProject,
    loadingSelectedProject,
    displayProjectModal,
    hideProjectModal,
  } = props;

  function displayChatWindow() {
    return (
      <Col sm="4">
        {!loadingSelectedProject && (
          <ChatWindowComponent
            chatboardUrl={selectedProject.chatBoard}
          ></ChatWindowComponent>
        )}
      </Col>
    );
  }

  const { projects, selectedProject, displayProjectModal, hideProjectModal} = props;

  const handleCloseProjectModal = () => {
    hideProjectModal();
  };

  return (
    <Modal
      show={displayProjectModal}
      onHide={handleCloseProjectModal}
      dialogClassName="modal-80w"
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedProject.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="project-modal-body">
        <Row>
          <Col>
            <Card className="project-card">
              <Card.Body>
                <Row>
                  <p>{`category: ${selectedProject.category} *posted by ${
                    selectedProject.user
                  }, ${getTimeSinceCreation(selectedProject.createdDate)}`}</p>
                </Row>
                <Row>
                  <Row>
                    <h2>{selectedProject.title}</h2>
                  </Row>
                  <Row>
                    <p>{selectedProject.description}</p>
                  </Row>
                  <Row>
                    <img src="https://source.unsplash.com/1600x900" alt="" />
                  </Row>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <DiscussionBoardComponent></DiscussionBoardComponent>
            </Card>
          </Col>
          {/* if user is member of project*/}
          {KeycloakService.isLoggedIn() ? displayChatWindow() : null}
        </Row>

        {/*<br />
        <Row>
          <Col xs={{ span: 2, offset: 5 }}>
            <Button>Apply to project</Button>
          </Col>
        </Row>
        <br />*/}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="success">Apply to project</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    messages: state.messages.messages,
    displayProjectModal: state.projects.displayProjectModal,
    loadingSelectedProject: state.projects.loading,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideProjectModal: () => dispatch(hideProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
