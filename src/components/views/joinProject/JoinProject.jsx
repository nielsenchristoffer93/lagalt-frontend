import {showModal} from "../../../redux/joinProject/joinSlice";
import {useState} from "react";
import {Form, FormControl, Modal, ModalBody, ModalTitle, FormLabel, ModalFooter, Button} from "react-bootstrap";
import {connect} from "react-redux";
import ModalHeader from "react-bootstrap/ModalHeader";


const JoinProject = (props) => {

    const [motivation, setMotivation] = useState("")

    const {show, showModal} = props
    const handleClose = () => showModal();


    const handleJoin = () => {
        //Save form to db

        let item = {
            
            motivation: motivation

        }
        // addPortfolioEntry(item);
        showModal();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Join Project</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleJoin}>
                <FormControl disabled type="text" rows={"7"} className="height: 100%;" placeholder="*This will allow the project admins to
            acess my profile."/>
                <br />
                    <FormLabel>Motivation</FormLabel>
                {/*Check how to set height to auto*/}
                    <FormControl type="text" as="textarea" rows={"7"} className="height: 100%;" onChange={event => setMotivation(event.target.value)}/>
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
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showModal:() => dispatch(showModal()),
        

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinProject);