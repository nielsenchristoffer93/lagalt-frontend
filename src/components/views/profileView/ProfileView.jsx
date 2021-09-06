import "./ProfileView.css"
import {useEffect, useState} from "react";
import PortfolioItem from "./portfolioItem/PortfolioItem";
import {Form, Button, FormControl, FormLabel, Row, Col} from "react-bootstrap";
import {showModal} from "../../../redux/profile/profileSlice";
import {connect} from "react-redux";
import ProfileModal from "./profileModal/ProfileModal";

const ProfileView = (props) => {
    const {
        showModal,
        profile
    } = props

    useEffect(() => {
    }, [])

    const handleShowModal = () => showModal()
    /*const [portfolio, setPortfolio] = useState([
        {
            title: "developer",
            company: "experis",
            date: "2021-2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Curabitur vitae luctus massa. Suspendisse potenti. " +
                "Nunc accumsan volutpat posuere. Curabitur fringilla felis non sapien" +
                " molestie, vitae sagittis tortor eleifend."
        },
        {
            title: "Scrum maste",
            company: "VGCS",
            date: "2022-2023",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Curabitur vitae luctus massa. Suspendisse potenti. " +
                "Nunc accumsan volutpat posuere. Curabitur fringilla felis non sapien" +
                " molestie, vitae sagittis tortor eleifend."
        }
    ])*/

    return (
        <div className="profile-container">
            <Row className="mb-3">
                <Col></Col>
                <Col className="d-flex justify-content-end">
                    <Button className="" >New Project</Button>
                </Col>
            </Row>
            <Form className="mb-3">
                <Row className="mb-3">
                    <Col>
                        <FormLabel>First name</FormLabel>
                        <FormControl disabled type="text" value={profile.firstName} />
                    </Col>
                    <Col>
                        <FormLabel>Last name</FormLabel>
                        <FormControl disabled type="text" value={profile.lastName} />
                    </Col>
                </Row>
                    <FormLabel>Email</FormLabel>
                    <FormControl disabled type="text" className="mb-3" value={profile.email}/>

                    <FormLabel>About</FormLabel>
                {/*Check how to set height to auto*/}
                    <FormControl disabled type="text" as="textarea" rows={"7"} className="height: 100%;" value={profile.about}/>

            </Form>

            <div className="profile-portfolio">
                <div className="profile-portfolio-header">
                    <h2>Portfolio</h2>
                    <Button onClick={handleShowModal}>Add portfolio entry</Button>
                    <ProfileModal />
                </div>
                <div>
                 {profile.portfolio.map(item => (
                    <PortfolioItem
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
        profile: state.profile.profile,
        show: state.profile.show,
        loading: state.profile.loading,
        error: state.profile.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
    showModal:() => dispatch(showModal()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);