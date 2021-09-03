import "./ProfileView.css"
import {useState} from "react";
import PortfolioItem from "./portfolioItem/PortfolioItem";
import {Form, Button, FormControl, FormLabel, Row, Col} from "react-bootstrap";

const ProfileView = () => {

    const [portfolio, setPortfolio] = useState([
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
    ])

    return (
        <div className="profile-container">

            <Form className="mb-3">
                <Row className="mb-3">
                    <Col>
                        <FormLabel>First name</FormLabel>
                        <FormControl type="text" />
                    </Col>
                    <Col>
                        <FormLabel>Last name</FormLabel>
                        <FormControl type="text" />
                    </Col>
                </Row>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="text" className="mb-3"/>

                <FormLabel>About</FormLabel>
                <FormControl type="text" className="p-5"/>

            </Form>

            <div className="profile-portfolio">
                <div className="profile-portfolio-header">
                    <h2>Portfolio</h2>
                    <Button>Add portfolio entry</Button>
                </div>
                <div>
                 {portfolio.map(item => (
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

export default ProfileView;