import { Col, Row, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { showAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import AddProjectModal from "../views/AddProjectModal";
import "./UserProjectComponent.css";

const UserProjectComponent = (props) => {
  const { displayProjectModal, showAddProjectModal } = props;

  const handleShow = () => {
    showAddProjectModal();
  };

  return (
    <Card className="user-project-container">
      {displayProjectModal ? (
        <AddProjectModal show={displayProjectModal} />
      ) : null}
      {/*<div className="user-project-container">*/}
      <Row>
        <Col>
          <h3>My projects</h3>
        </Col>
        <Col md="auto">
          <Button
            variant="outline-success"
            className="new-user-project-button"
            onClick={handleShow}
          >
            <FontAwesomeIcon
              className="new-project-icon"
              icon={faEdit}
            ></FontAwesomeIcon>
            New
          </Button>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <a href="#project1">
          <FontAwesomeIcon
            className="project-icon"
            icon={faFileAlt}
          ></FontAwesomeIcon>
          Link to project 1
        </a>
      </Row>
      <Row>
        <a href="#project1">
          <FontAwesomeIcon
            className="project-icon"
            icon={faFileAlt}
          ></FontAwesomeIcon>
          Link to project 1
        </a>
      </Row>
      <Row>
        <a href="#project1">
          <FontAwesomeIcon
            className="project-icon"
            icon={faFileAlt}
          ></FontAwesomeIcon>
          Link to project 1
        </a>
      </Row>
      <Row>
        <a href="#project1">
          <FontAwesomeIcon
            className="project-icon"
            icon={faFileAlt}
          ></FontAwesomeIcon>
          Link to project 1
        </a>
      </Row>
      <Row>
        <a href="#project1">Show more...</a>
      </Row>
      {/*</div>*/}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    displayProjectModal: state.displayAddProjectModal.displayProjectModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAddProjectModal: () => dispatch(showAddProjectModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectComponent);
