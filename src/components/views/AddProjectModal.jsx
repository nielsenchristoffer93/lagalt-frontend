import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import "./AddProjectModal.css";
import CategoriesDropdownComponent from "../higher-order-components/CategoriesDropdownComponent";
import { hideAddProjectModal } from "../../redux/AddProject/AddProjectSlice";
import { useState } from "react";
import SkillsCheckboxComponent from "../higher-order-components/SkillsCheckboxComponent";

const AddProjectModal = (props) => {

    const [projectTitle, setprojectTitle] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

  const handleClose = () => {
    hideAddProjectModal();
  };

  const { displayProjectModal, hideAddProjectModal, selectedCategory } = props;

  return (
    <Modal
      show={displayProjectModal}
      onHide={handleClose}
      dialogClassName="modal-80w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Title</Form.Label>
            <Form.Control type="text" placeholder="Project 1" onChange={(e) => setprojectTitle(e.target.value)}/>
          </Form.Group>
          {projectTitle}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Project Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
          </Form.Group>
          {console.log(selectedFile)}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </Form.Group>
          {projectDescription}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Category</Form.Label>
            <CategoriesDropdownComponent></CategoriesDropdownComponent>
          </Form.Group>
          {console.log(selectedCategory)}
          <SkillsCheckboxComponent></SkillsCheckboxComponent>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    displayProjectModal: state.displayAddProjectModal.displayProjectModal,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideAddProjectModal: () => dispatch(hideAddProjectModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectModal);
