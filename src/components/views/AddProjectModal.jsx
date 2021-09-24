import SkillsCheckboxComponent from "../higher-order-components/SkillsCheckboxComponent";
import CategoriesDropdownComponent from "../higher-order-components/CategoriesDropdownComponent";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { hideAddProjectModal } from "../../redux/addProject/AddProjectSlice";
import { useState } from "react";
import { postNewProject } from "../../services/projects";
import {
  fetchAllProjects,
  fetchAllUserProjects,
} from "../../redux/project/ProjectSlice";
import { getUserId } from "../../services/user";
import { postNewProjectRole } from "../../services/projectRole";
import { postNewChatBoard } from "../../services/chatBoard";
import { postNewDiscussionBoard } from "../../services/discussionBoard";

const AddProjectModal = (props) => {
  const {
    displayAddProjectModal,
    hideAddProjectModal,
    selectedCategory,
    selectedSkills,
    fetchAllProjects,
    resetSkillsStates,
    fetchAllUserProjects,
  } = props;

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    hideAddProjectModal();
  };

  /**
   * Adds a project to the db.
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    let date = new Date();

    const userId = await getUserId();

    if (projectTitle.length < 1) {
      alert("Title to short");
      return;
    }
    if (projectDescription.length < 1) {
      alert("Description to short");
      return;
    }
    if (selectedFile == null) {
      alert("Select an image");
      return;
    }
    if (selectedCategory === -1) {
      alert("Select a category");
      return;
    }
    if (selectedSkills.length < 1) {
      alert("Select at least one skill");
      return;
    }

    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", projectDescription);
    formData.append("image", selectedFile, selectedFile.name);
    formData.append("createdDate", date);
    formData.append("category", selectedCategory);
    formData.append("skills", selectedSkills);

    const newProject = await postNewProject(formData).then((response) =>
      response.json()
    );
    const projectId = newProject.id;

    const formDataProjectRole = new FormData();
    formDataProjectRole.append("projectId", projectId);
    formDataProjectRole.append("userId", userId);
    formDataProjectRole.append("roleId", 1);

    const newProjectRole = await postNewProjectRole(formDataProjectRole).then(
      (response) => response.json()
    );
    console.log("NEW PROJECT ROLE");
    console.log(newProjectRole);

    const formDataProjectId = new FormData();
    formDataProjectId.append("projectId", projectId);

    await postNewChatBoard(formDataProjectId);
    await postNewDiscussionBoard(formDataProjectId);

    hideAddProjectModal();
    fetchAllProjects();
    resetSkillsStates();
    fetchAllUserProjects();
  };

  return (
    <Modal
      show={displayAddProjectModal}
      onHide={handleClose}
      dialogClassName="modal-80w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a title..."
              onChange={(event) => setProjectTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Project Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Add description..."
              onChange={(event) => setProjectDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Category</Form.Label>
            <CategoriesDropdownComponent disableDefault={true}/>
          </Form.Group>
          <SkillsCheckboxComponent/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    displayAddProjectModal: state.displayAddProjectModal.displayAddProjectModal,
    selectedSkills: state.skills.selectedSkills,
    selectedCategory: state.categories.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideAddProjectModal: () => dispatch(hideAddProjectModal()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllUserProjects: () => dispatch(fetchAllUserProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectModal);
