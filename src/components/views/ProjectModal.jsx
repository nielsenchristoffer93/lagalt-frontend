import { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap';

import DiscussionBoardComponent from './discussionBoard/DiscussionBoardComponent'
import { connect } from 'react-redux';
import "./ProjectModal.css";

const ProjectModal = (props) => {


  const {
    projects,
    selectedProject,



  } = props

  useEffect(() => {



  }, []);







  return (
    <Container>
      <Row>
        <Col >
          <Card className="projectComponent" style={{ marginTop: "0px" }}>
            <Card.Body>

              <Card.Title>{projects[selectedProject - 1].title}</Card.Title>
              <Card.Text>{projects[selectedProject - 1].description}</Card.Text>
            </Card.Body>
            <img style={{ minHeight: "250px" }} src="https://source.unsplash.com/1600x900" alt="" />
            <br />

            {/* <Card.Body> */}
            <div class="BoardWrapper">
              <DiscussionBoardComponent />
            </div>


            {/* </Card.Body> */}
          </Card>
        </Col>
        {/* if user is member of project*/}
        <Col sm="4" >
          Chat
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={{ span: 2, offset: 5 }}><Button>Apply to project</Button></Col>
      </Row>
      <br />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    messages: state.messages.messages,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
