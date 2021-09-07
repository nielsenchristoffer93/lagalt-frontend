import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import UserService from "../../services/UserService";
import './Navbar.css'

const NavbarComponent = () => {

    return (
        <Navbar bg="navbar navbar-dark bg-dark" expand="lg" fixed="top" >
            <Container>
                <Navbar.Brand href="/">Lagalt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        

                    </Nav>
                    <Nav>
                        {UserService.isLoggedIn() && <Button  className="danger" id="btn" onClick={() => UserService.doLogout()}>Log-out</Button>}
                        {!UserService.isLoggedIn() && <Button className="primary" id="btn" onClick={() => UserService.doLogin()}>Log-in</Button>}
                        {!UserService.isLoggedIn() && <Button className="primary" id="btn" onClick={() => UserService.doRegister()}>Sign Up</Button>}
                        <Nav.Link eventKey={2} href="/profile"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg> {UserService.getUsername()}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavbarComponent;
