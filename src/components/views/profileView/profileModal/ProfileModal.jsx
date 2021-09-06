import {FormControl, Modal, ModalBody, ModalTitle, FormLabel, ModalFooter, Button} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {showModal} from "../../../../redux/profile/profileSlice";
import {connect} from "react-redux";


const ProfileModal = (props) => {

    const {show, showModal} = props

    const handleClose = () => showModal();
    const handleSave = () => {
        //Save form to db
        console.log("Saved!")
        showModal();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Add Portfolio Entry</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormLabel>Company</FormLabel>
                <FormControl type="text" />
                <FormLabel>Title</FormLabel>
                <FormControl type="text" />
                <FormLabel>Date</FormLabel>
                <FormControl type="date" />
                <FormLabel>Description</FormLabel>
                <FormControl type="text" />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    )
}
const mapStateToProps = state => {
    return {
        show: state.profile.show,
        profile: state.profile.profile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showModal:() => dispatch(showModal()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);