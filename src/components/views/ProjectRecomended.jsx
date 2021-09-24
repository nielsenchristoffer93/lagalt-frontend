import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { showProjectModal, fetchSelectedProjectData } from '../../redux/Project/projectSlice'
import "./ProjectRecommended.css";

const ProjectRecomended = (props) => {

  const {
    recommendedProjects, showProjectModal, fetchSelectedProjectData
  } = props;


  const onOpenModal = async (id) => {
    await fetchSelectedProjectData(id)
    showProjectModal()
  };
  // onClick={() => onOpenModal(project.id)}
  return (
    <div className="project-recommended-container" >
      <h3>Recommended Projects</h3>
      <Row>
        {recommendedProjects && recommendedProjects.map((project, i) => (
          <Col key={i} onClick={() => onOpenModal(project.id)}  >
            <Card className="hover-shadow">
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text className="recommended-project-description">
                  {project.description}
                </Card.Text>
              </Card.Body>
              {/* TO VIEW A BASE64 image (PNG/JPEG) */}
              <Card.Img
                className="recommended-project-image"
                variant="bottom"
                src={`data:image/png;base64,${project.image}`} alt="no_image_in_database_associated_with_project."
              >
              </Card.Img>
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
