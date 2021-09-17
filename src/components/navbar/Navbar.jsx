import React from "react";
import {Navbar, Nav, Button } from "react-bootstrap";
import KeycloakService from "../../services/keycloakService";
import {connect} from "react-redux";
import {resetAddUser} from "../../redux/User/userSlice.js";
import { useHistory } from 'react-router-dom';
import './Navbar.css'

const NavbarComponent = () => {

    const history = useHistory();

    const handleLogout = () => {
        resetAddUser();
        KeycloakService.doLogout();
    }
    const handleTest = async () => {
        history.push('/profile');
    }
    return (
        <Navbar bg="navbar navbar-dark bg-dark" expand="lg" fixed="top" >
            
                <Navbar.Brand href="/">Lagalt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        
                    </Nav>
                    <Nav>
                        {KeycloakService.isLoggedIn() && <Button className="danger" id="btn" onClick={() => handleLogout()}>Log-out</Button>}
                        {!KeycloakService.isLoggedIn() && <Button className="primary" id="btn" onClick={() => KeycloakService.doLogin()}>Log-in</Button>}
                        {!KeycloakService.isLoggedIn() && <Button className="primary" id="btn" onClick={() => KeycloakService.doRegister()}>Sign Up</Button>}
                        {KeycloakService.isLoggedIn() && <Nav.Link eventKey={2} onClick={() => handleTest()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="35" fill="currentColor"
                                 className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            &nbsp; {KeycloakService.getUsername()}</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            
        </Navbar>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        resetAddUser:() => dispatch(resetAddUser()),

    }
};


export default connect(mapDispatchToProps)(NavbarComponent);
