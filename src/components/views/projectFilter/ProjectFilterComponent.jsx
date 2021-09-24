import "./ProjectFilterComponent.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchFilteredProjects } from "../../../redux/project/ProjectSlice";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import CategoriesDropdownComponent from "../../higher-order-components/CategoriesDropdownComponent";

const ProjectFilterComponent = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    selectedCategory,
    fetchFilteredProjects,
    displayAddProjectModal,
  } = props;

  /**
   * Fetches projects based on the searchQuery state and/or the selectedCategory state in redux.
   */
  const filterProjects = () => {
    fetchFilteredProjects(searchQuery, selectedCategory);
  };

  useEffect(() => {
    if(!displayAddProjectModal){
    fetchFilteredProjects(searchQuery, selectedCategory);
    }
  }, [displayAddProjectModal, fetchFilteredProjects, searchQuery, selectedCategory]);

  return (
    <Card>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Row>
            <Col sm="4">
              <CategoriesDropdownComponent
                disableDefault={false}
                onChange={() => filterProjects()}
              />
            </Col>
            <Col sm="7">
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    filterProjects();
                  }
                }}
              />
            </Col>
            <Col sm="1">
              <Button onClick={() => filterProjects()}>
                <FontAwesomeIcon icon={faSearch}/>
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedCategory: state.categories.selectedCategory,
    displayAddProjectModal: state.displayAddProjectModal.displayAddProjectModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilteredProjects: (title, categoryId) =>
      dispatch(fetchFilteredProjects(title, categoryId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectFilterComponent);
