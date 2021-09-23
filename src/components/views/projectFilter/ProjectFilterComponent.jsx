import { useEffect, useState } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./ProjectFilterComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesDropdownComponent from "../../higher-order-components/CategoriesDropdownComponent";
import { connect } from "react-redux";
import {
  fetchFilteredProjects,
} from "../../../redux/Project/projectSlice";

const ProjectFilterComponent = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    selectedCategory,
    fetchFilteredProjects,
    displayAddProjectModal,
  } = props;

  const filterProjects = () => {
    fetchFilteredProjects(searchQuery, selectedCategory);
  };

  useEffect(() => {
    if(!displayAddProjectModal){
    fetchFilteredProjects(searchQuery, selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <Card>
      {/*<div className="searchContainer">*/}
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
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </Button>
            </Col>
            {/*<Col sm="2"></Col>*/}
            
          </Row>
        </Form>
        {/*</div>*/}
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
    fetchFilteredProjects: (title, categorId) =>
      dispatch(fetchFilteredProjects(title, categorId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectFilterComponent);
