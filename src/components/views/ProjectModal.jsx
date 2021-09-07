import { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProjectModal = (props) => {

    const {
		projects,
        selectedProject,
	} = props
    
  return (
      <Container>
      <Row>
          <Col >
    <Card className="projectComponent" style={{marginTop:"0px"}}>
        <Card.Body>
            
        <Card.Title>{projects[selectedProject].title}</Card.Title>
        <Card.Text>{projects[selectedProject].description}</Card.Text>
        </Card.Body>
        <img style={{minHeight:"250px"}}src="https://source.unsplash.com/1600x900" alt="" />
        <Card.Body>
            <div style={{height:"200px", border:"solid black 1px"}}></div>
            message board
        </Card.Body>
    </Card>
    </Col>
    {/* if user is member of project*/}
    <Col sm="4" >
    Chat
    </Col>    
    </Row>
    <br/>
    <Row>
        <Col xs={{ span: 2, offset: 5 }}><Button>Apply to project</Button></Col>
    </Row>
    <br/>
    </Container>
  )
}

const mapStateToProps = state => {
    return {
      projects: state.projects.projects,
      selectedProject: state.projects.selectedProject,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {}
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
