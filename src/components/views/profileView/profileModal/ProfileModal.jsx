import {showModal} from "../../../../redux/profile/profileSlice";
import {useState} from "react";
import {fetchUserPortfolio} from "../../../../redux/user/userSlice";
import {postNewPortfolioItem} from "../../../../services/user";
import {Form, FormControl, Modal, ModalBody, ModalTitle, FormLabel, ModalFooter, Button} from "react-bootstrap";
import {connect} from "react-redux";
import ModalHeader from "react-bootstrap/ModalHeader";

const ProfileModal = (props) => {
  const { show, showModal, fetchUserPortfolio } = props;

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    showModal();
  };

  /**
   * Collects all the portfolio related states and sends them as a form to the backend to be saved.
   * @returns {Promise<void>}
   */
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("company", company);
    formData.append("title", title);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", description);

    await postNewPortfolioItem(formData);
    fetchUserPortfolio();
    showModal();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Add Portfolio Entry</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSave}>
          <FormLabel>Company</FormLabel>
          <FormControl
            type="text"
            onChange={(event) => setCompany(event.target.value)}
          />
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormLabel>Start date</FormLabel>
          <FormControl
            type="date"
            onChange={(event) => setStartDate(event.target.value)}
          />
          <FormLabel>End date</FormLabel>
          <FormControl
            type="date"
            onChange={(event) => setEndDate(event.target.value)}
          />
          <FormLabel>Description</FormLabel>
          <FormControl
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    show: state.profile.show,
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    fetchUserPortfolio: () => dispatch(fetchUserPortfolio()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
