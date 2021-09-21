import { Modal, Card, Col, Row, Button, Container } from "react-bootstrap";
import DiscussionBoardComponent from "./discussionBoard/DiscussionBoardComponent";
import ChatWindowComponent from "../chat/ChatWindowComponent";
import KeycloakService from "../../services/keycloakService";
import { showModal } from "../../redux/joinProject/joinSlice";
import JoinProject from "./joinProject/JoinProject";
import { hideProjectModal } from "../../redux/Project/projectSlice";
import { getTimeSinceCreation } from "../../services/timeFormatter";
import ProjectComponent from "./ProjectComponent";
import { connect } from "react-redux";
import "./ProjectModal.css";

const ProjectModal = (props) => {
  const {
    projects,
    selectedProject,
    loadingSelectedProject,
    displayProjectModal,
    hideProjectModal,
    showModal,
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

  /*
  function displayApply() {
    return (
      <Col xs={{ span: 2, offset: 5 }}>
      <Button onClick={handleShowModal}>Apply to project</Button>
      <JoinProject />
    </Col>
    );
  }*/

  const handleShowModal = () => showModal();

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
            {/*<Card className="project-card">
              <Card.Body>
                <Row>
                <p>category: {selectedProject.category} &#8226; posted by {selectedProject.user}, {getTimeSinceCreation(selectedProject.createdDate)}<span className="project-status">{selectedProject.projectStatus}</span></p>
                </Row>
                <Row>
                  <Row>
                    <h2>{selectedProject.title}</h2>
                  </Row>
                  <Row>
                    <p>{selectedProject.description}</p>
                  </Row>
                  <Card.Img
                    variant="bottom"
                    src={`data:image/png;base64,${selectedProject.image}`}
                    alt="no_image_in_database_associated_with_project."
                  ></Card.Img>
                </Row>
              </Card.Body>
  </Card>*/}
            <ProjectComponent
                  title={selectedProject.title}
                  description={selectedProject.description}
                  image={selectedProject.image}
                  projectTags={selectedProject.projectTags}
                  categoryUrl={selectedProject.category}
                  skills={selectedProject.skills}
                  createdDate={selectedProject.createdDate}
                  //userUrl={"/api/v1/users/i/1"}
                  projectStatusUrl={selectedProject.projectStatus}
                  // IM ASSUMING THAT ARRAY 0 ALWAYS CONTAINS THE ADMIN OF THE PROJECT
                  projectRoleUrl={selectedProject.projectRoles[0]}
              ></ProjectComponent>
            <Card>
              {!loadingSelectedProject && (
                <DiscussionBoardComponent
                  messageboardUrl={selectedProject.discussionBoard}
                ></DiscussionBoardComponent>
              )}
            </Card>
          </Col>
          {/* if user is member of project*/}
          {KeycloakService.isLoggedIn() ? displayChatWindow() : null}
          {KeycloakService.isLoggedIn() ? <JoinProject></JoinProject> : null}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProjectModal}>
          Close
        </Button>

        <Button variant="success" onClick={handleShowModal}>
          Apply to project
        </Button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    hideProjectModal: () => dispatch(hideProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
