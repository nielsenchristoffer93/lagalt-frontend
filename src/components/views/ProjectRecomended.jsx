import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { showProjectModal, fetchSelectedProjectData } from '../../redux/Project/projectSlice'
const ProjectRecomended = (props) => {

  const {
    recommendedProjects, showProjectModal, fetchSelectedProjectData
  } = props;


  const onOpenModal = (id) => {
    fetchSelectedProjectData(id)
    showProjectModal()
  };
// onClick={() => onOpenModal(project.id)}
  return (
    <div>
      Recommended projects
      <Row>
        {recommendedProjects && recommendedProjects.map((project, i) => (
          <Col key={i} onClick={() => onOpenModal(project.id)} >
            <Card>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>
                {project.description }
                </Card.Text>
              </Card.Body>
              <Card.Img
                variant="bottom"
                src="https://source.unsplash.com//180x180"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recommendedProjects: state.projects.recommendedProjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showProjectModal: () => dispatch(showProjectModal()),
    fetchSelectedProjectData: (projectId) => dispatch(fetchSelectedProjectData(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRecomended);
