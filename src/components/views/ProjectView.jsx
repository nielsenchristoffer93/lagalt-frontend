import ProjectComponent from "./ProjectComponent";
import ProjectRecomended from "./ProjectRecomended";
import { useEffect, useState } from "react";
import {
  fetchAllProjects,
  setSelectedProject,
} from "../../redux/Project/projectSlice";
import {
  initialAddUser,
  fetchUserData,
  fetchUserSkills,
  fetchUserPortfolio,
  fetchUserAbout,
} from "../../redux/User/userSlice.js";
import { connect } from "react-redux";
import { Button, Modal, Row, Col } from "react-bootstrap";
import ProjectFilterComponent from "./ProjectFilterComponent";
import ProjectModal from "./ProjectModal";
import KeycloakService from "../../services/keycloakService";
import "./ProjectViewStyle.css";
import UserProjectComponent from "../user-projects/UserProjectComponent";

const ProjectView = (props) => {
  const [open, setOpen] = useState(false);

  const {
    fetchUserAbout,
    fetchUserSkills,
    fetchUserPortfolio,
    fetchUserData,
    userPosted,
    projects,
    fetchAllProjects,
    displayProjectModal,
    showAddProjectModal,
    setSelectedProject,
  } = props;

  useEffect(() => {
    fetchAllProjects();
    tryPushUser();
  }, [fetchAllProjects]);

  const tryPushUser = () => {
    if (!userPosted) {
      KeycloakService.postNewUser();
      initialAddUser();
      fetchUserData();
      fetchUserPortfolio();
      fetchUserSkills();
      fetchUserAbout();
    }
  };

  const onOpenModal = (i) => {
    setSelectedProject(i);
    //console.log("i=?" + i);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const renderModal = () => {
    return <ProjectModal></ProjectModal>;
  };

  return (
    <div class="project-view">
      <Row>
        <Col sm="3">
          {KeycloakService.isLoggedIn() ? <UserProjectComponent></UserProjectComponent> : null}
        </Col>
        <Col sm="6">
          {/*<ProjectRecomended />*/}
      <h3>Filter projects</h3>
      <ProjectFilterComponent></ProjectFilterComponent>

      <h3>Projects</h3>
      {projects &&
        projects.map((project, i) => (
          <div onClick={() => onOpenModal(project.id)}>
            <ProjectComponent
              title={project.title}
              description={project.description}
              image={project.image}
              projectTags={project.projectTags}
              category={project.category}
              skills={project.skills}
              key={i}
            />
          </div>
        ))}

      <Modal
        show={open}
        onHide={onCloseModal}
        center
        dialogClassName="custom-modal-80w"
      >
        {renderModal()}
      </Modal>
        </Col>
        <Col sm="3"></Col>
      </Row>
      </div>
    //<div className="projectList">
      
    //</div>
  );
};

const mapStateToProps = (state) => {
  return {
    userPosted: state.profile.userPosted,
    projects: state.projects.projects,
    loading: state.projects.loading,
    error: state.projects.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserAbout: () => dispatch(fetchUserAbout),
    fetchUserData: () => dispatch(fetchUserData()),
    fetchUserSkills: () => dispatch(fetchUserSkills()),
    fetchUserPortfolio: () => dispatch(fetchUserPortfolio()),
    initialAddUser: () => dispatch(initialAddUser()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    setSelectedProject: (projectId) => dispatch(setSelectedProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
