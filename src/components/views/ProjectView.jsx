import { useEffect, useState } from 'react'
import ProjectComponent from './ProjectComponent'
import ProjectRecomended from './ProjectRecomended'
import ProjectFilterComponent from './ProjectFilterComponent'
import ProjectModal from './ProjectModal'
import Modal from "react-bootstrap/Modal";
import './ProjectViewStyle.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { fetchAllProjects, setSelectedProject } from '../../redux/Project/projectSlice'
const ProjectView = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const {
		projects,
    fetchAllProjects,
    setSelectedProject,
	} = props

  useEffect(() => {
    fetchAllProjects();

  },[])

  const onOpenModal = i => {
    setSelectedProject(i);
    console.log("i=?"+i)
    setSelectedPost(i);
    setOpen(true);
    
  }

  /* const onOpenModal = () => {
    console.log("helle there!")
  } */

  const onCloseModal = () => {
    setOpen(false);
};

 const renderModal = () => {
  if (selectedPost !== null) {
    const project = projects[selectedPost];
    return (
      <ProjectModal/>
    );
  }
  }


  return (
    <div  className="projectList">
        

        <ProjectRecomended/>
        <br/>
        <div>Filter projects</div>
        <ProjectFilterComponent/>
        
        {projects && projects.map((project, i) => <div onClick={() => onOpenModal(i)} ><ProjectComponent 
          
         title={project.title}
         description={project.description}
         projectTags={project.projectTags}
         skills={project.skills}
         key={i} 
         
         /></div>)}
        
        <Modal show={open} onHide={onCloseModal} center dialogClassName="custom-modal-80w">
          {renderModal()}
        </Modal>
        

    </div>
  )
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    loading: state.projects.loading,
		error: state.projects.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    setSelectedProject: (projectId) => dispatch(setSelectedProject(projectId)),
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);