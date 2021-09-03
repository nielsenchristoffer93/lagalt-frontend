import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import './Navbar.css'

const NavbarComponent = () => {

    return (
        <Navbar bg="navbar navbar-dark bg-secondary" expand="lg" >
            <Container>
                <Navbar.Brand href="#home">Lagalt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link eventKey={2} href="/">Public Component</Nav.Link>

                        {/* <Nav.Link eventKey={2} href="/secured">Sceured Component</Nav.Link> */}

                    </Nav>
                    <Nav>
                        <Nav.Link href="/secured"><button type="button" class="btn btn-outline-light" id="btn">Log-in</button></Nav.Link>
                        <Nav.Link href="/secured"> <button type="button" class="btn btn-primary" id="btn">Sign Up</button></Nav.Link>
                        <Nav.Link eventKey={2} href="/profile"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg> Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavbarComponent;
