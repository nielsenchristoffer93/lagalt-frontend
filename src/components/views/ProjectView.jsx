import ProjectComponent from "./ProjectComponent";
import ProjectRecomended from "./ProjectRecomended";
import { useEffect, useState } from "react";
import {fetchAllProjects, fetchSelectedProjectData, fetchRecommendedProjects, showProjectModal} from "../../redux/Project/projectSlice";
import { showAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import {initialAddUser, fetchUserData, fetchUserSkills, fetchUserPortfolio, fetchUserAbout} from "../../redux/User/userSlice.js";
import { connect } from "react-redux";
import { Button, Modal, Row, Col } from "react-bootstrap";
import ProjectFilterComponent from "./ProjectFilterComponent";
import ProjectModal from "./ProjectModal";
import KeycloakService from "../../services/keycloakService";
import "./ProjectViewStyle.css";
import UserProjectComponent from "../user-projects/UserProjectComponent";

const ProjectView = (props) => {
  //const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const handleShow = () => {
    showAddProjectModal();
  };

  const handleOpenProjectModal = (id) => {
    fetchSelectedProjectData(id)
    showProjectModal();
  };

  const {
    fetchUserAbout,
    fetchUserSkills,
    fetchUserPortfolio,
    fetchUserData,
    userPosted,
    projects,
    fetchAllProjects,
    displayAddProjectModal,
    showAddProjectModal,
    fetchSelectedProjectData,
    fetchRecommendedProjects,
    displayProjectModal,
    showProjectModal,
  } = props;

  useEffect(() => {
    fetchRecommendedProjects()
  }, [])

  useEffect(() => {
    fetchAllProjects();
    tryPushUser();
  }, [fetchAllProjects]);

  const tryPushUser = () => {

    if (!userPosted) {
      console.log("userPosted !")
       KeycloakService.postNewUser();
       //sets userPosted to true
      initialAddUser();
      fetchUserData();
      fetchUserPortfolio();
      fetchUserSkills();
      fetchUserAbout(); 
    }
  };

  const onOpenModal = (id) => {
    fetchSelectedProjectData(id);
    //setSelectedProject(i);
    //console.log("i=?" + i);
    //setOpen(true);
    showProjectModal();
  };

  return (
    <div class="project-view">
    {displayProjectModal ? (
              <ProjectModal show={displayProjectModal}/>
      ) : null}
      <Row>
        <Col sm="3">
          {KeycloakService.isLoggedIn() ? (
            <UserProjectComponent></UserProjectComponent>
          ) : null}
        </Col>
        <Col sm="6">
          <ProjectRecomended />
          <h3>Filter projects</h3>
          <ProjectFilterComponent></ProjectFilterComponent>

          <h3>Projects</h3>
          {projects &&
            projects.map((project, i) => (
              <div key={i} onClick={() => onOpenModal(project.id)}>
                <ProjectComponent
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  projectTags={project.projectTags}
                  category={project.category}
                  skills={project.skills}
                  createdDate={project.createdDate}
                  user={project.users[0]}
                  key={i}
                />
              </div>
            ))}

          {/*<Modal
            show={open}
            onHide={onCloseModal}
            center
            dialogClassName="custom-modal-80w"
          >
            {renderModal()}
          </Modal>*/}
          {displayProjectModal ? (
            <ProjectModal></ProjectModal>
          ) : null}
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
    displayAddProjectModal: state.displayAddProjectModal.displayAddProjectModal,
    recommendedProjects: state.projects.recommendedProjects,
    displayProjectModal: state.projects.displayProjectModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserAbout: () => dispatch(fetchUserAbout()),
    fetchUserData: () => dispatch(fetchUserData()),
    fetchUserSkills: () => dispatch(fetchUserSkills()),
    fetchUserPortfolio: () => dispatch(fetchUserPortfolio()),
    initialAddUser: () => dispatch(initialAddUser()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchSelectedProjectData: (projectId) => dispatch(fetchSelectedProjectData(projectId)),
    fetchRecommendedProjects: () => dispatch(fetchRecommendedProjects()),
    showAddProjectModal: () => dispatch(showAddProjectModal()),
    showProjectModal: () => dispatch(showProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
