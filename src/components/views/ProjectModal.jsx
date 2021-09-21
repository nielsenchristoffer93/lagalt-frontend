import { Modal, Card, Col, Row, Button, Container } from 'react-bootstrap';
import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import ChatWindowComponent from "../chat/ChatWindowComponent";
import KeycloakService from '../../services/keycloakService';
import { showModal } from "../../redux/joinProject/joinSlice";
import JoinProject from "./joinProject/JoinProject";
import { hideProjectModal, setSelectedProjectTab } from '../../redux/Project/projectSlice'
import { getTimeSinceCreation } from "../../services/timeFormatter";
import { connect } from 'react-redux';
import "./ProjectModal.css";
import AdminView from './AdminView';

const ProjectModal = (props) => {
  const {
    projects,
    selectedProject,
    loadingSelectedProject,
    displayProjectModal,
    hideProjectModal,
    showModal,
    selectedProjectTab,
    setSelectedProjectTab
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
  function displayApply() {
    return (
      <Col xs={{ span: 2, offset: 5 }}>
        <Button onClick={handleShowModal}>Apply to project</Button>
        <JoinProject />
      </Col>
    );
  }

  const handleShowModal = () => showModal()

  const handleCloseProjectModal = () => {
    setSelectedProjectTab(0)
    hideProjectModal();
  };
  
  const handleSetSelectedProjectTab = (tabId) => {
    
    if(selectedProjectTab != tabId){
      setSelectedProjectTab(tabId)
    }
    console.log(selectedProjectTab)

  }


  return (
    <Modal
      show={displayProjectModal}
      onHide={handleCloseProjectModal}
      dialogClassName="modal-80w"
    >
      <Modal.Header closeButton>
        
        <Modal.Title style={{height:"100px"}}>{selectedProject.title}</Modal.Title>
      
          <div style={{position:"absolute", display:"flex", top:"80px"}}>
         <div className={`tabs ${selectedProjectTab == 0 ? "active" : ""}`}  onClick={() => handleSetSelectedProjectTab(0)}>
            <h6 className="font-weight-bold"  >Project</h6>
          </div>
          <div className={`tabs ${selectedProjectTab == 1 ? "active" : ""}`} onClick={() => handleSetSelectedProjectTab(1)}>
            <h6 className=""  >Admin</h6>
          </div>
          </div>
        
      </Modal.Header>
      <Modal.Body className="project-modal-body">
      {selectedProjectTab == 0 &&
        <Row>
          <Col>
            <Card className="project-card">
              <Card.Body>
                <Row>
                  <p>{`category: ${selectedProject.category} *posted by ${selectedProject.user
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
              {!loadingSelectedProject && <DiscussionBoardComponent messageboardUrl={selectedProject.discussionBoard}></DiscussionBoardComponent>}
            </Card>
          </Col>
          {/* if user is member of project*/}
          {KeycloakService.isLoggedIn() ? displayChatWindow() : null}
          {KeycloakService.isLoggedIn() ? displayApply() : null}
        </Row>}
        {selectedProjectTab == 1 && <AdminView/>}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProjectModal}>
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
    show: state.join.show,
    displayProjectModal: state.projects.displayProjectModal,
    loadingSelectedProject: state.projects.loading,
    selectedProjectTab: state.projects.selectedProjectTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    hideProjectModal: () => dispatch(hideProjectModal()),
    setSelectedProjectTab: (selectedProjectId) => dispatch(setSelectedProjectTab(selectedProjectId)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
