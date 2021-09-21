import {Modal, Card, Col, Row, Button, Container } from 'react-bootstrap';
import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import ChatWindowComponent from "../chat/ChatWindowComponent";
import KeycloakService from '../../services/keycloakService';
import {showModal} from "../../redux/joinProject/joinSlice";
import JoinProject from "./joinProject/JoinProject";
import { hideProjectModal } from '../../redux/Project/projectSlice'
import { getTimeSinceCreation } from "../../services/timeFormatter";
import { connect } from 'react-redux';
import "./ProjectModal.css";
import { useEffect, useState } from 'react';
import { getProjectRoleByProjectRoleUrl } from '../../services/projectRole';
import { getUserByUserUrl } from '../../services/user';
import { getRoleByRoleUrl } from '../../services/roleService';

const ProjectModal = (props) => {
  const {
    projects,
    // getProjectRole,
    selectedProject,
    loadingSelectedProject,
    displayProjectModal,
    hideProjectModal,
    showModal
  } = props;

  const [projectRoles, setProjectRoles] = useState([]);
  const [isMemberOfProject, setIsMemberOfProject] = useState(false);
  const [isUserAdminOfProject, setIsUserAdminOfProject] = useState(false);
  //const [projcetRoles, setProjectRoles] = useState([]);

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
  
  useEffect(() => {
    if (!loadingSelectedProject) {
      fetchProjectRoles();
    }
  }, [loadingSelectedProject])

  const fetchProjectRoles = async () => {
    //console.log("selecteProject.projectRoles: " + selectedProject.projectRoles);
    const projectRoles = selectedProject.projectRoles;

    projectRoles.forEach(async (projectRole) => {
      //console.log("projectRole: " + projectRole);

      const projectRoleData = await getProjectRoleByProjectRoleUrl(projectRole);
      //console.log(projectRoleData);

      const userUrl = projectRoleData.user;
      const roleUrl = projectRoleData.role;

      //console.log("userUrl: " + userUrl);
      //console.log("roleUrl: " + roleUrl);

      const userData = await getUserByUserUrl(userUrl);
      //console.log(userData);
      const email = userData.keycloakEmail;
      console.log("emaiL: " + email)

      const roleData = await getRoleByRoleUrl(roleUrl);
      const role = roleData.title;
      console.log("role: " + role);

      const userProjectRole = {email: email, role: role};

      setProjectRoles(projectRoles => [...projectRoles, userProjectRole]);

      if (KeycloakService.getEmail() === email) {
        setIsMemberOfProject(true);
      }

    });

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

  const handleShowModal = () => showModal()

  const handleCloseProjectModal = () => {
    hideProjectModal();
  };

  return (
    <Modal
      show={displayProjectModal}
      onHide={handleCloseProjectModal}
      dialogClassName="modal-80w"
    >
      {console.log(projectRoles)}
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
            {!loadingSelectedProject && <DiscussionBoardComponent messageboardUrl={selectedProject.discussionBoard}></DiscussionBoardComponent>}
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

        {!isMemberOfProject ? <Button variant="success" onClick={handleShowModal}>Apply to project</Button> : null}
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    // getProjectRole: state.projects.getProjectRole,
    messages: state.messages.messages,
    show: state.join.show,
    displayProjectModal: state.projects.displayProjectModal,
    loadingSelectedProject: state.projects.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal:() => dispatch(showModal()),
    hideProjectModal: () => dispatch(hideProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
