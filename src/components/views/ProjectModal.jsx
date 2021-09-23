import { Modal, Card, Col, Row, Button } from "react-bootstrap";
import DiscussionBoardComponent from "./discussionBoard/DiscussionBoardComponent";
import ChatWindowComponent from "../chat/ChatWindowComponent";
import KeycloakService from "../../services/keycloak";
import { showJoinProjectModal } from "../../redux/joinProject/joinSlice";
import JoinProject from "./joinProject/JoinProject";
import {
  hideProjectModal,
  setSelectedProjectTab,
} from "../../redux/Project/projectSlice";
import ProjectComponent from "./ProjectComponent";
import { connect } from "react-redux";
import "./ProjectModal.css";
import { useEffect, useState } from "react";
import { getProjectRoleByProjectRoleUrl } from "../../services/projectRole";
import { getUserByUserUrl } from "../../services/user";
import { getRoleByRoleUrl } from "../../services/role";
import AdminView from "./AdminView";

const ProjectModal = (props) => {
  const {
    selectedProject,
    loadingSelectedProject,
    displayProjectModal,
    hideProjectModal,
    showJoinProjectModal,
    selectedProjectTab,
    setSelectedProjectTab,
  } = props;

  const [projectRoles, setProjectRoles] = useState([]);
  const [isMemberOfProject, setIsMemberOfProject] = useState(false);
  const [isUserAdminOfProject, setIsUserAdminOfProject] = useState(false);

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
  }, [loadingSelectedProject]);

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
      //console.log("emaiL: " + email);

      const roleData = await getRoleByRoleUrl(roleUrl);
      const role = roleData.title;
      //console.log("role: " + role);

      const userProjectRole = { email: email, role: role };

      setProjectRoles((projectRoles) => [...projectRoles, userProjectRole]);

      if (KeycloakService.getEmail() === email) {
        setIsMemberOfProject(true);

        if (role === "Administrator") {
          setIsUserAdminOfProject(true);
        }
      }
    });
  };

  const handleShowJoinProjectModal = () => {
    showJoinProjectModal();
  };

  const handleCloseProjectModal = () => {
    setSelectedProjectTab(0);
    hideProjectModal();
  };

  const handleSetSelectedProjectTab = (tabId) => {
    if (selectedProjectTab !== tabId) {
      setSelectedProjectTab(tabId);
    }
    //console.log(selectedProjectTab);
  };

  return (
    <Modal
      show={displayProjectModal}
      onHide={handleCloseProjectModal}
      dialogClassName="modal-80w"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ height: isUserAdminOfProject ? "100px" : "auto" }}>
          {selectedProject.title}
        </Modal.Title>

        {isUserAdminOfProject && <div style={{ position: "absolute", display: "flex", top: "80px" }}>
          <div
            className={`tabs ${selectedProjectTab === 0 ? "active" : ""}`}
            onClick={() => handleSetSelectedProjectTab(0)}
          >
            <h6 className="font-weight-bold">Project</h6>
          </div>
          <div
            className={`tabs ${selectedProjectTab === 1 ? "active" : ""}`}
            onClick={() => handleSetSelectedProjectTab(1)}
          >
            <h6 className="">Admin</h6>
          </div>
        </div>}
      </Modal.Header>
      <Modal.Body className="project-modal-body">
        {selectedProjectTab === 0 && (
          <Row>
            <Col>
              <ProjectComponent
                title={selectedProject.title}
                description={selectedProject.description}
                image={selectedProject.image}
                projectTags={selectedProject.projectTags}
                categoryUrl={selectedProject.category}
                skills={selectedProject.skills}
                createdDate={selectedProject.createdDate}
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
            {(isMemberOfProject && KeycloakService.isLoggedIn()) ? displayChatWindow() : null}
            {KeycloakService.isLoggedIn() ? <JoinProject></JoinProject> : null}
          </Row>
        )}
        {selectedProjectTab === 1 && <AdminView />}
      </Modal.Body>
      <Modal.Footer>
      {(!KeycloakService.isLoggedIn()) ? <p>Log in or sign up to join this project</p> : null}
        <Button variant="secondary" onClick={handleCloseProjectModal}>
          Close
        </Button>
        {(!isMemberOfProject && KeycloakService.isLoggedIn()) ? (
          <Button variant="success" onClick={handleShowJoinProjectModal}>
            Apply to project
          </Button>
        ) : null}
        
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
    selectedProjectTab: state.projects.selectedProjectTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showJoinProjectModal: () => dispatch(showJoinProjectModal()),
    hideProjectModal: () => dispatch(hideProjectModal()),
    setSelectedProjectTab: (selectedProjectId) =>
      dispatch(setSelectedProjectTab(selectedProjectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
