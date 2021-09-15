import {showModal} from "../../../../redux/profile/profileSlice";
import {useState} from "react";
import {Form, FormControl, Modal, ModalBody, ModalTitle, FormLabel, ModalFooter, Button} from "react-bootstrap";
import {connect} from "react-redux";
import ModalHeader from "react-bootstrap/ModalHeader";


const ProfileModal = (props) => {

    const [company, setCompany] = useState("")
    const [title, setTitle] = useState("")
    const [date, setDate] = useState()
    const [description, setDescription] = useState("")

    const {show, showModal} = props
    const handleClose = () => showModal();


    const handleSave = () => {
        //Save form to db

        let item = {
            company: company,
            title: title,
            date: date,
            description: description

        }
        // addPortfolioEntry(item);
        showModal();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Add Portfolio Entry</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSave}>
                    <FormLabel>Company</FormLabel>
                    <FormControl type="text" value={company} onChange={event => setCompany(event.target.value)}/>
                    <FormLabel>Title</FormLabel>
                    <FormControl type="text" onChange={event => setTitle(event.target.value)}/>
                    <FormLabel>Date</FormLabel>
                    <FormControl type="date" onChange={event => setDate(event.target.value)}/>
                    <FormLabel>Description</FormLabel>
                    <FormControl type="text" onChange={event => setDescription(event.target.value)}/>
                </Form>
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
        // addPortfolioEntry: (entry) => dispatch(addPortfolioEntry(entry))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);