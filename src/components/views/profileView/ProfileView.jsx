import {connect} from "react-redux";
import {Form, Button, FormControl, FormLabel, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import {showModal} from "../../../redux/profile/profileSlice";
import PortfolioItem from "./portfolioItem/PortfolioItem";
import "./ProfileView.css"
import ProfileModal from "./profileModal/ProfileModal";
import ProfileSkills from "./profileSkills/ProfileSkills";
import KeycloakService from "../../../services/keycloakService";
import {Redirect} from "react-router-dom";
import {fetchUserData, fetchUserPortfolio, fetchUserSkills} from "../../../redux/User/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileView = (props) => {
    const {
        showModal,
        user,
        fetchUserData,
        fetchUserPortfolio,
        fetchUserSkills
    } = props

    const [shouldRedirect, setShouldRedirect] = useState(false)

    useEffect(() => {
        fetchUserData();
        fetchUserPortfolio();
        fetchUserSkills();
    }, []);

    useEffect(() => {

        if(!KeycloakService.isLoggedIn()) {
            setShouldRedirect(true);
        }

    }, [user.portfolio])
    useEffect(() => {
        portfolio(user.portfolio);
    },[user.portfolio])

    const handleShowModal = () => showModal()

    const portfolio = (portfolio) => {
        return (
            <div>
                {portfolio.map(item => (
                    <PortfolioItem
                        id={item.id}
                        title={item.title}
                        company={item.company}
                        date={item.date}
                        description={item.description}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="profile-container">
            {/* If statement for checking if we should redirect or not */}
            {shouldRedirect ? <Redirect to="/"></Redirect> : null}
            <Form className="mb-3">
                <Row className="mb-3">
                    <Col>
                        <FormLabel>First name</FormLabel>
                        <FormControl disabled type="text" value={user.firstname}/>
                    </Col>
                    <Col>
                        <FormLabel>Last name</FormLabel>
                        <FormControl disabled type="text" value={user.lastname}/>
                    </Col>
                </Row>
                <FormLabel>Email</FormLabel>
                <FormControl disabled type="text" className="mb-3" value={user.email}/>

                <FormLabel>About</FormLabel>
                {/*Check how to set height to auto*/}
                <FormControl disabled type="text" as="textarea" rows={"7"} className="height: 100%;"
                             value={user.about}/>

            </Form>
            <ProfileSkills/>

            <div className="profile-portfolio">
                <div className="profile-portfolio-header">
                    <h3>Portfolio</h3>
                    <Button onClick={handleShowModal}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Add portfolio entry</Button>
                    <ProfileModal/>
                </div>
                {portfolio(user.portfolio)}
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
        showModal: () => dispatch(showModal()),
        fetchUserData: () => dispatch(fetchUserData()),
        fetchUserSkills: () => dispatch(fetchUserSkills()),
        fetchUserPortfolio: () => dispatch(fetchUserPortfolio()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);