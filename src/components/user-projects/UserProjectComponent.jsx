import { Col, Row, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { showAddProjectModal } from "../../redux/addProject/AddProjectSlice";
import AddProjectModal from "../views/AddProjectModal";
import "./UserProjectComponent.css";
import { useEffect } from "react";
import {
  showProjectModal,
  fetchSelectedProjectData,
  fetchAllUserProjects,
} from "../../redux/project/projectSlice";

const UserProjectComponent = (props) => {
  const {
    displayAddProjectModal,
    showAddProjectModal,
    showProjectModal,
    fetchSelectedProjectData,
    userProjects,
    fetchAllUserProjects,
  } = props;

  /**
   * Fetches all of the users projects on component creation.
   */
  useEffect(() => {
    fetchAllUserProjects();
  }, []);

  /**
   * Shows the AddProjectModal component on button-click.
   */
  const handleShow = () => {
    showAddProjectModal();
  };

  /**
   * Opens a new project modal window based the supplied projectId.
   * 
   * @param {*} id of the project to open in a new project modal.
   */
  const onOpenModal = async (id) => {
    await fetchSelectedProjectData(id);
    showProjectModal();
  };

  return (
    <Card className="user-project-container">
      {/* Show the AddProjectModal component if displayAddProjectModal is true in redux. */}
      {displayAddProjectModal ? (
        <AddProjectModal show={displayAddProjectModal} />
      ) : null}
      <div className="user-project-header">
        <h3>My projects</h3> 
        {/* Button for opening the AddProjectModal (changing the state in redux) */}
        <Button
          variant="outline-success"
          className="user-project-button"
          onClick={handleShow}
        >
          <FontAwesomeIcon
            className="new-project-icon"
            icon={faEdit}
          ></FontAwesomeIcon>
          New
        </Button>
      </div>
      <hr></hr>
      <ul>
        {/* Loops through the projects that a user is a member of and displays them. */}
        {userProjects &&
          userProjects.length > 0 &&
          userProjects.map((project, i) => (
            <li onClick={() => onOpenModal(project.id)}>
              <p className="user-project" style={{ fontWeight: "bold" }}>
                {project.title}
              </p>
            </li>
          ))}
        {userProjects.length === 0 && <li>No project yet</li>}
      </ul>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    displayAddProjectModal: state.displayAddProjectModal.displayAddProjectModal,
    userProjects: state.projects.userProjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAddProjectModal: () => dispatch(showAddProjectModal()),
    showProjectModal: () => dispatch(showProjectModal()),
    fetchSelectedProjectData: (projectId) =>
      dispatch(fetchSelectedProjectData(projectId)),
    fetchAllUserProjects: () => dispatch(fetchAllUserProjects()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectComponent);
