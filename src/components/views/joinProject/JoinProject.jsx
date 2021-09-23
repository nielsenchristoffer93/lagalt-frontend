import { showJoinProjectModal } from "../../../redux/joinProject/joinSlice";
import {
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getUserId } from "../../../services/user";
import { postNewProjectRole } from "../../../services/projectRole";
import ModalHeader from "react-bootstrap/ModalHeader";
import { fetchAllUserProjects, fetchSelectedProjectData } from '../../../redux/Project/projectSlice'


const JoinProject = (props) => {
  // const [motivation, setMotivation] = useState("")

  const { displayJoinProjectModal,
      showJoinProjectModal,
      selectedProject,
      fetchAllUserProjects,
      fetchSelectedProjectData
  } = props;
    
  const handleClose = () => {
    showJoinProjectModal();
  };

  const handleJoin = async () => {
    //Save form to db
    //    var date = new Date();
    //    const projectId = await getSelectedProjectData();
    const userId = await getUserId();

    const formDataProjectRole = new FormData();
    formDataProjectRole.append("projectId", selectedProject.id);
    formDataProjectRole.append("userId", userId);
    // roleId 1 is administrator and roleId 2 is user.
    formDataProjectRole.append("roleId", 2);


    const newProjectRole = await postNewProjectRole(formDataProjectRole).then(
      (response) => response.json()
    );
    //console.log(newProjectRole);

    showJoinProjectModal();
    fetchAllUserProjects();

    console.log("selectedProject.id: " + selectedProject.id);
    await fetchSelectedProjectData(selectedProject.id);
  };

  return (
    <Modal show={displayJoinProjectModal} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Join Project</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleJoin}>
          <FormControl
            disabled
            type="text"
            rows={"7"}
            className="height: 100%;"
            placeholder="*This will allow the project admins to acess your profile."
          />
          <br />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleJoin}>
          Apply
        </Button>
      </ModalFooter>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    displayJoinProjectModal: state.join.displayJoinProjectModal,
    selectedProject: state.projects.selectedProject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showJoinProjectModal: () => dispatch(showJoinProjectModal()),
    fetchAllUserProjects: () => dispatch(fetchAllUserProjects()),
    fetchSelectedProjectData: (id) => dispatch(fetchSelectedProjectData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinProject);
