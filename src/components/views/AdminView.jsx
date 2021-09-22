import { connect } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchProjectStatus } from "../../services/projects";
import { updateProject, getProjectsStatuses } from "../../services/projects";
import { fetchSelectedProjectData, fetchAllProjectstatus } from "../../redux/Project/projectSlice";

const AdminView = (props) => {
  const {
    selectedProject,
    fetchAllProjectstatus,
    projectStatus,
    projectsStatusHasLoaded,
    fetchSelectedProjectData,
  } = props;

  const [projectTitle, setprojectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProjectStatus, setSelectedProjectStatus] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [postSuccessful, setpostSuccessful] = useState(false);

  const fetchProjectStatusWithUrl = async (url) => {
    let statusObj = await fetchProjectStatus(url).then((response) =>
      response.json()
    );
    setSelectedProjectStatus(statusObj.id);
  };

  const handleUpdateProject = async () => {
    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", projectDescription);
    formData.append("createdDate", selectedProject.createdDate);
    formData.append("projectStatusId", selectedStatus);

    const updatedProject = await updateProject(
      formData,
      selectedProject.id
    ).then((response) => response.json());

    await fetchSelectedProjectData(selectedProject.id);

    //Alerts the user when making a update
    setpostSuccessful(true);
    setTimeout(() => {
      setpostSuccessful(false);
    }, 1800);
  };

  useEffect(() => {
    setprojectTitle(selectedProject.title);
    setProjectDescription(selectedProject.description);
    fetchProjectStatusWithUrl(selectedProject.projectStatus);
    console.log(projectStatus)
    console.log("projectsStatusHasLoaded")
    
    console.log(projectsStatusHasLoaded)
    //if (!projectsStatusHasLoaded) {
      fetchAllProjectstatus();
      console.log(projectStatus)
    //}
  }, []);

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
            onChange={(event) => setprojectTitle(event.target.value)}
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
        <Form.Group style={{height:"70px"}}>
          <Form.Label>Project Status</Form.Label>
          {selectedProjectStatus != -1 && (
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
              {/* {categories && populateOptions(categories)} */}
            </Form.Select>
          )}
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Category</Form.Label>
            <CategoriesDropdownComponent disableDefault={true}></CategoriesDropdownComponent>
          </Form.Group>
          <SkillsCheckboxComponent></SkillsCheckboxComponent> */}
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
    projectsStatusHasLoaded: state.projects.projectsStatusHasLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProjectstatus: () => dispatch(fetchAllProjectstatus()),
    fetchSelectedProjectData: (id) => dispatch(fetchSelectedProjectData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
