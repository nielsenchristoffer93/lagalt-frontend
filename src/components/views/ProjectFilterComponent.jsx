import { useEffect, useState } from 'react'
import { Button,  Card, Form, Col, Row, Dropdown } from 'react-bootstrap';
import { faFilter,faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesDropdownComponent from "../higher-order-components/CategoriesDropdownComponent";
import { connect } from "react-redux";
import { fetchAllProjectsWithCategory, fetchFilteredProjects } from '../../redux/Project/projectSlice'
const ProjectFilterComponent = (props) => {
    const [searchQuery, setSearchQuery] = useState("");


    const {
        selectedCategory,
        fetchAllProjectsWithCategory,
        fetchFilteredProjects,
      } = props;


    const filterProjects = () => {
        fetchFilteredProjects(searchQuery,selectedCategory );
        
    }

  

    

    useEffect(() => {

        fetchFilteredProjects(searchQuery,selectedCategory );

      }, [selectedCategory]);

  return (
    <div className="searchContainer">
         <Form>
             <Row>
                <Col sm="3">
                    <CategoriesDropdownComponent onChange={() => filterProjects()}/>
                </Col>
                <Col sm="5">
                    <Form.Control type="text" placeholder="search" 
                    onChange={(event) => setSearchQuery(event.target.value)}/> 
                    
                </Col>
                <Col sm="1"><Button onClick={() => filterProjects()}>Search</Button></Col>
                <Col sm="2"></Col>
                <Col sm="1">
                <FontAwesomeIcon icon={faFilter} />
                <FontAwesomeIcon icon={faSlidersH} />
                </Col>
            </Row>
            
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
        fetchFilteredProjects: (title, categorId) => dispatch(fetchFilteredProjects(title, categorId)),
    };
  
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilterComponent);
