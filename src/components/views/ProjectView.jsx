import { useEffect, useState } from "react";
import ProjectComponent from "./ProjectComponent";
import ProjectRecomended from "./ProjectRecomended";
import ProjectFilterComponent from "./ProjectFilterComponent";
import "./ProjectViewStyle.css";
import { connect } from "react-redux";
import {
  fetchAllProjects,
  setSelectedProject,
} from "../../redux/Project/projectSlice";
import { showAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import { Button, Modal } from "react-bootstrap";
import AddProjectModal from "./AddProjectModal";
import ProjectModal from "./ProjectModal";
const ProjectView = (props) => {
  //const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleShow = () => {
    showAddProjectModal();
  };

  const {
    projects,
    fetchAllProjects,
    displayProjectModal,
    showAddProjectModal,
    setSelectedProject,
  } = props;

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const onOpenModal = (i) => {
    setSelectedProject(i);
    console.log("i=?" + i);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const renderModal = () => {
    return <ProjectModal />;
  };

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
        {projects && projects.map((project, i) => <div onClick={() => onOpenModal(project.id)} ><ProjectComponent 
          
         title={project.title}
         description={project.description}
         projectTags={project.projectTags}
         skills={project.skills}
         key={project.id} 
         
         /></div>)}
        
        <Modal show={open} onHide={onCloseModal} center dialogClassName="custom-modal-80w">
          {renderModal()}
        </Modal>
        

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
    setSelectedProject: (projectId) => dispatch(setSelectedProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
