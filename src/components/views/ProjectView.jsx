import ProjectComponent from "./ProjectComponent";
import ProjectRecomended from "./ProjectRecomended";
import { useEffect } from "react";
import {
  fetchAllProjects,
  fetchSelectedProjectData,
  fetchRecommendedProjects,
  showProjectModal,
} from "../../redux/Project/projectSlice";
import { showAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import {
  initialAddUser,
  fetchUserData,
  fetchUserSkills,
  fetchUserPortfolio,
  fetchUserAbout,
} from "../../redux/User/userSlice.js";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ProjectFilterComponent from "./projectFilter/ProjectFilterComponent";
import ProjectModal from "./ProjectModal";
import KeycloakService from "../../services/keycloakService";
import "./ProjectViewStyle.css";
import UserProjectComponent from "../user-projects/UserProjectComponent";

const ProjectView = (props) => {

  const {
    fetchUserAbout,
    fetchUserSkills,
    fetchUserPortfolio,
    fetchUserData,
    userPosted,
    projects,
    fetchAllProjects,
    fetchSelectedProjectData,
    fetchRecommendedProjects,
    displayProjectModal,
    showProjectModal,
  } = props;

  useEffect(() => {
    fetchRecommendedProjects();
  }, []);

  useEffect(() => {
    fetchAllProjects();
    tryPushUser();
  }, [fetchAllProjects]);
  /**
     * Tries to add the user to the database on login. Should handle the "duplicate value"-error
     * when trying to push a user that already exists in our db.
     */
  const tryPushUser = () => {
    if (!userPosted) {
      KeycloakService.postNewUser();
      //sets userPosted to true
      initialAddUser();
      fetchUserData();
      fetchUserPortfolio();
      fetchUserSkills();
      fetchUserAbout();
    }
  };

  const onOpenModal = async (id) => {
    await fetchSelectedProjectData(id);
    //setSelectedProject(i);
    //console.log("i=?" + i);
    //setOpen(true);
    showProjectModal();
  };

  return (
    <div class="project-view">
      {displayProjectModal ? <ProjectModal></ProjectModal> : null}
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
              <div key={i} onClick={() => onOpenModal(project.id)} className="hover-shadow">
                <ProjectComponent
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  projectTags={project.projectTags}
                  categoryUrl={project.category}
                  skills={project.skills}
                  createdDate={project.createdDate}
                  //userUrl={project.users[0]}
                  projectStatusUrl={project.projectStatus}
                  // IM ASSUMING THAT ARRAY 0 ALWAYS CONTAINS THE ADMIN OF THE PROJECT
                  projectRoleUrl={project.projectRoles[0]}
                  key={i}
                />
              </div>
            ))}
        </Col>
        <Col sm="3"></Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userPosted: state.profile.userPosted,
    projects: state.projects.projects,
    loading: state.projects.loading,
    error: state.projects.error,
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
    fetchSelectedProjectData: (projectId) =>
      dispatch(fetchSelectedProjectData(projectId)),
    fetchRecommendedProjects: () => dispatch(fetchRecommendedProjects()),
    showAddProjectModal: () => dispatch(showAddProjectModal()),
    showProjectModal: () => dispatch(showProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
