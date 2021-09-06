import { useEffect, useState } from "react";
import ProjectComponent from "./ProjectComponent";
import ProjectRecomended from "./ProjectRecomended";
import ProjectFilterComponent from "./ProjectFilterComponent";
import "./ProjectViewStyle.css";
import { connect } from "react-redux";
import { fetchAllProjects } from "../../redux/Project/projectSlice";
import { showAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import { Button } from "react-bootstrap";
import AddProjectModal from "./AddProjectModal";
const ProjectView = (props) => {
  //const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const handleShow = () => {
    showAddProjectModal();
  };

  const {
    projects,
    fetchAllProjects,
    displayProjectModal,
    showAddProjectModal,
  } = props;

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div className="projectList">
      <ProjectRecomended />
      <br />
      <div>Filter projects</div>
      <ProjectFilterComponent />

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleShow}>
          Add new project
        </Button>
      </div>

      {displayProjectModal ? (
        <AddProjectModal show={displayProjectModal}></AddProjectModal>
      ) : null}

      {projects &&
        projects.map((project, i) => (
          <ProjectComponent
            title={project.title}
            description={project.description}
            projectTags={project.projectTags}
            skills={project.skills}
            key={i}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    loading: state.projects.loading,
    error: state.projects.error,
    displayProjectModal: state.displayAddProjectModal.displayProjectModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    showAddProjectModal: () => dispatch(showAddProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
