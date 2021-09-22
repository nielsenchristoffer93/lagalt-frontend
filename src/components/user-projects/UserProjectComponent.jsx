import { Col, Row, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { showAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import AddProjectModal from "../views/AddProjectModal";
import { getUserProjects } from '../../services/projects'
import "./UserProjectComponent.css";
import { useEffect, useState } from "react";
import { showProjectModal, fetchSelectedProjectData, fetchAllUserProjects } from '../../redux/Project/projectSlice'


const UserProjectComponent = (props) => {
  //const [userProjects, setUserProjects] = useState([]);

  const { displayAddProjectModal,
     showAddProjectModal,
      showProjectModal,
       fetchSelectedProjectData,
       userProjects,
       fetchAllUserProjects
       } = props;
  
  useEffect(async () => {
    fetchAllUserProjects()
  }, []);

  const handleShow = () => {
    showAddProjectModal();
  };

  const onOpenModal = async (id) => {
    await fetchSelectedProjectData(id)
    showProjectModal()
  };

  return (
    <Card className="user-project-container">
      {displayAddProjectModal ? (
        <AddProjectModal show={displayAddProjectModal} />
      ) : null}
      <div className="user-project-header">
          <h3>My projects</h3>
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
  

      {userProjects && userProjects.length > 0 &&
        userProjects.map((project, i) => (
          <li onClick={() => onOpenModal(project.id)}>
              <p style={{fontWeight:"bold"}}>{project.title}</p>
          </li>
        ))}
        {userProjects.length == 0 && <li>No project yet</li>}
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
    fetchSelectedProjectData: (projectId) => dispatch(fetchSelectedProjectData(projectId)),
    fetchAllUserProjects: () => dispatch(fetchAllUserProjects()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectComponent);
