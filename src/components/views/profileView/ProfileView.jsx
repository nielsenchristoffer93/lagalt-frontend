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
import {
    fetchUserAbout,
    fetchUserData,
    fetchUserPortfolio,
    fetchUserSkills,
    setAbout
} from "../../../redux/User/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {postUserAbout} from "../../../services/user";

const ProfileView = (props) => {
    const {
        showModal,
        user,
        fetchUserData,
        fetchUserPortfolio,
        fetchUserSkills,
        fetchUserAbout
    } = props

    /**
     * Fetches all relevant user data on load. This is done because rerender of clears redux.
     */
    useEffect(() => {
        fetchUserAbout();
        fetchUserData();
        fetchUserPortfolio();
        fetchUserSkills();
    }, []);

    /**
     * Ensures that the user is logged in. Redirects back to ProjectView if the user isn't logged in.
     */
    useEffect(() => {
        if(!KeycloakService.isLoggedIn()) {
            setShouldRedirect(true);
        }
    }, [user.portfolio])

    /**
     * Rerenders the users portfolio if it's uppdated.
     */
    useEffect(() => {
        portfolio(user.portfolio);
    },[user.portfolio])

    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [userAbout, setUserAbout] = useState (user.about);

    const handleShowModal = () => showModal()

    const handleSubmit = () => {
        postUserAbout(userAbout)
        .finally(fetchUserAbout());
    }

    const portfolio = (portfolio) => {
        return (
            <div>
                {portfolio.map(item => (
                    <PortfolioItem
                        id={item.id}
                        title={item.title}
                        company={item.company}
                        startDate={item.startDate}
                        endDate={item.endDate}
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
                <FormControl onChange={(e) =>
                     setUserAbout(e.target.value)}
                     type="text"
                     as="textarea"
                     rows={"7"}
                     className="height: 100%;"
                     value={userAbout}/>
                <Button onClick={() => handleSubmit()}>Save about</Button>
            </Form>
            <ProfileSkills/>

            <div className="profile-portfolio">
                <div className="profile-portfolio-header">
                    <h3>Portfolio</h3>
                    <Button onClick={handleShowModal}><FontAwesomeIcon icon={faEdit}/> Add portfolio entry</Button>
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
        setAbout: () => dispatch(setAbout()),
        showModal: () => dispatch(showModal()),
        fetchUserData: () => dispatch(fetchUserData()),
        fetchUserSkills: () => dispatch(fetchUserSkills()),
        fetchUserPortfolio: () => dispatch(fetchUserPortfolio()),
        fetchUserAbout: () => dispatch(fetchUserAbout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);