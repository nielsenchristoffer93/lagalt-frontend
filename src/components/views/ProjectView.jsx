import { useEffect, useState } from 'react'
import ProjectComponent from './ProjectComponent'
import ProjectRecomended from './ProjectRecomended'
import ProjectFilterComponent from './ProjectFilterComponent'
import './profileView/ProjectViewStyle.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { fetchAllProjects } from '../../redux/Project/projectSlice'
const ProjectView = (props) => {

  const {
		projects,
    fetchAllProjects,
    
	} = props

  useEffect(() => {
    fetchAllProjects();

  },[])

  return (
    <div  className="projectList">

        <ProjectRecomended/>
        <br/>
        <div>Filter projects</div>
        <ProjectFilterComponent/>
        
        {projects && projects.map((project, i) => <ProjectComponent
         title={project.title}
         description={project.description}
         projectTags={project.projectTags}
         skills={project.skills}
         key={i} />)}
        
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);