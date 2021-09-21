import {showModal} from "../../../redux/joinProject/joinSlice";
import {useState} from "react";
import {Form, FormControl, Modal, ModalBody, ModalTitle, FormLabel, ModalFooter, Button} from "react-bootstrap";
import {connect} from "react-redux";
import { getUserId } from "../../../services/user"
import { postNewProjectRole } from "../../../services/projectRole" 
import ModalHeader from "react-bootstrap/ModalHeader";


const JoinProject = (props) => {

   

   // const [motivation, setMotivation] = useState("")

    const {show, showModal, selectedProject} = props
    const handleClose = () => showModal();


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
        console.log(selectedProject.id)
        console.log(userId)
    
        const newProjectRole = await postNewProjectRole(formDataProjectRole).then(response => response.json());
        //console.log(newProjectRole);
    
       
        showModal();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Join Project</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleJoin}>
                <FormControl disabled type="text" rows={"7"} className="height: 100%;" placeholder="*This will allow the project admins to acess your profile."/>
                <br />
                </Form>
            </ModalBody>
            <ModalFooter>
            
                <Button variant="primary" onClick={handleJoin}>
                    Apply
                </Button>
            </ModalFooter>
        </Modal>
    )
}
const mapStateToProps = state => {
    return {
        show: state.join.show,
        join: state.join.join,
        selectedProject: state.projects.selectedProject,
     
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showModal:() => dispatch(showModal()),
        

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinProject);