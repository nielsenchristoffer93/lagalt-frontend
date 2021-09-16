import {connect} from "react-redux";
import {Form, Button, FormControl, FormLabel, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import {showModal} from "../../../redux/profile/profileSlice";
import ProfileModal from "./profileModal/ProfileModal";
import PortfolioItem from "./portfolioItem/PortfolioItem";
import "./ProfileView.css"
import KeycloakService from "../../../services/keycloakService";
import {Redirect} from "react-router-dom";

const ProfileView = (props) => {
    const {
        showModal,
        user,
    } = props

    const [shouldRedirect, setShouldRedirect] = useState(false)

    useEffect(() => {

        if(!KeycloakService.isLoggedIn()) {
            setShouldRedirect(true);
        }

    }, [user.portfolio])

    const handleShowModal = () => showModal()

    return (
        <div className="profile-container">
            {/* If statement for checking if we should redirect or not */}
            {shouldRedirect ? <Redirect to="/"></Redirect> : null}
            <Row className="mb-3">
                <Col className="d-flex justify-content-end">
                    <Button className="" >New Project</Button>
                </Col>
            </Row>
            <Form className="mb-3">
                <Row className="mb-3">
                    <Col>
                        <FormLabel>First name</FormLabel>
                        <FormControl disabled type="text" value={user.firstname} />
                    </Col>
                    <Col>
                        <FormLabel>Last name</FormLabel>
                        <FormControl disabled type="text" value={user.lastname} />
                    </Col>
                </Row>
                    <FormLabel>Email</FormLabel>
                    <FormControl disabled type="text" className="mb-3" value={user.email}/>

                    <FormLabel>About</FormLabel>
                {/*Check how to set height to auto*/}
                    <FormControl disabled type="text" as="textarea" rows={"7"} className="height: 100%;" value={user.about}/>

            </Form>

            <div className="profile-portfolio">
                <div className="profile-portfolio-header">
                    <h2>Portfolio</h2>
                    <Button onClick={handleShowModal}>Add portfolio entry</Button>
                    <ProfileModal />
                </div>
                <div>
                 {user.portfolio.map(item => (
                    <PortfolioItem
                        id = {item.id}
                        title = {item.title}
                        company = {item.company}
                        date = {item.date}
                        description={item.description}
                    />
                      ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        profile: state.profile.profile,
        show: state.profile.show,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    showModal:() => dispatch(showModal()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);