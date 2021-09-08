import { useEffect, useState } from 'react'
import { Button,  Card, Form, Col, Row, Dropdown } from 'react-bootstrap';
import { faFilter,faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesDropdownComponent from "../higher-order-components/CategoriesDropdownComponent";
import { connect } from "react-redux";
import { fetchAllProjectsWithCategory } from '../../redux/Project/projectSlice'
const ProjectFilterComponent = (props) => {

    const {
        selectedCategory,
        fetchAllProjectsWithCategory,
      } = props;


    const filterProjects = () => {
        fetchAllProjectsWithCategory(selectedCategory)
    }

    useEffect(() => {
       console.log("hello!") 
      }, [CategoriesDropdownComponent]);

    const user = "user";
    const category = "category";
    const time = "5 h "
    const skills = ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5",]
  return (
    <div className="searchContainer">
         <Form>
             <Row>
                <Col sm="3">
                    <CategoriesDropdownComponent/>
                </Col>
                <Col sm="6">
                    <Form.Control type="text" placeholder="search" /> 
                </Col>
                <Col sm="2"></Col>
                <Col sm="1">
                <FontAwesomeIcon icon={faFilter} />
                <FontAwesomeIcon icon={faSlidersH} />
                </Col>
            </Row>
            <Button onClick={() => filterProjects()}>Search</Button>
        </Form> 
    </div>
  )
}
const mapStateToProps = (state) => {
    return {
    selectedCategory: state.categories.selectedCategory,
      
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProjectsWithCategory: (id) => dispatch(fetchAllProjectsWithCategory(id)),
    };
  
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilterComponent);
