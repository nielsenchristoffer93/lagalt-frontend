import { connect } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchProjectStatus } from "../../services/projects";
import { updateProject, getProjectsStatuses } from "../../services/projects";
import { fetchSelectedProjectData, fetchAllProjectstatus } from "../../redux/project/projectSlice";


const AdminView = (props) => {
  const {
    selectedProject,
    fetchAllProjectStatus,
    projectStatus,
    fetchSelectedProjectData,
  } = props;

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProjectStatus, setSelectedProjectStatus] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [postSuccessful, setPostSuccessful] = useState(false);

  /**
   * Fetches the status of the project based on the projectUrl.
   * @param url
   * @returns {Promise<void>}
   */
  const fetchProjectStatusWithUrl = async (url) => {
    let statusObj = await fetchProjectStatus(url).then((response) =>
      response.json()
    );
    setSelectedProjectStatus(statusObj.id);
  };

  /**
   * Used to update the different fields in a project.
   * @returns {Promise<void>}
   */
  const handleUpdateProject = async () => {
    if (projectTitle.length < 1) {
      alert("Title to short");
      return;
    }
    if (projectDescription.length < 1) {
      alert("Description to short");
      return;
    }
    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", projectDescription);
    formData.append("createdDate", selectedProject.createdDate);
    formData.append("projectStatusId", selectedStatus);

    // const updatedProject = await updateProject(
    //   formData,
    //   selectedProject.id
    // ).then((response) => response.json());

    await fetchSelectedProjectData(selectedProject.id);

    //Alerts the user when making a update
    setPostSuccessful(true);
    setTimeout(() => {
      setPostSuccessful(false);
    }, 1800);
  };

  useEffect(() => {
    setProjectTitle(selectedProject.title);
    setProjectDescription(selectedProject.description);
    fetchProjectStatusWithUrl(selectedProject.projectStatus);
    fetchAllProjectStatus();
  }, [selectedProject.description, selectedProject.projectStatus, selectedProject.title]);

  const handleProjectStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <Modal.Body>
      <Form noValidate encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            value={projectTitle}
            onChange={(event) => setProjectTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ height: "70px" }}>
          <Form.Label>Project Status</Form.Label>
          {selectedProjectStatus !== -1 && (
            <Form.Select
              aria-label="Default select example"
              required
              defaultValue={selectedProjectStatus}
              onChange={handleProjectStatusChange}
            >
              {projectStatus &&
                projectStatus.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.title}
                  </option>
                ))}
            </Form.Select>
          )}
        </Form.Group>
      </Form>
      <br />
      <Button onClick={() => handleUpdateProject()} variant="success">
        Update project
      </Button>
      {postSuccessful ? (
        <Alert variant="success" style={{ float: "right", padding: "6px" }}>
          Update successful!
        </Alert>
      ) : null}
    </Modal.Body>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedProject: state.projects.selectedProject,
    projectStatus: state.projects.projectStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProjectStatus: () => dispatch(fetchAllProjectStatus()),
    fetchSelectedProjectData: (id) => dispatch(fetchSelectedProjectData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
