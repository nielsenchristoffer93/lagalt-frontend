import React from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import KeycloakService from "../../services/keycloakService";
import { connect } from "react-redux";
import { resetAddUser } from "../../redux/User/userSlice.js";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignInAlt,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const NavbarComponent = (props) => {
  const { fullName } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(KeycloakService.isLoggedIn());

  const history = useHistory();

  const handleLogout = () => {
    resetAddUser();
    KeycloakService.doLogout();
  };

  const goToProfilePage = async () => {
    history.push("/profile");
  };

  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg" fixed="top">
      <Navbar.Brand href="/">Lagalt</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          {!isLoggedIn && (
            <Button
              variant="outline-primary"
              id="btn"
              onClick={() => KeycloakService.doLogin()}
            >
              Log In
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              variant="primary"
              id="btn"
              onClick={() => KeycloakService.doRegister()}
            >
              Sign Up
            </Button>
          )}
          <NavDropdown
            title={
              <FontAwesomeIcon className="" icon={faUser}></FontAwesomeIcon>
            }
            align="end"
          >
            {isLoggedIn ? (
              <NavDropdown.Item onClick={() => goToProfilePage()}>
                <FontAwesomeIcon
                  className="sign-in-icon"
                  icon={faUserCircle}
                ></FontAwesomeIcon>
                {fullName}
              </NavDropdown.Item>
            ) : null}
            {isLoggedIn ? <NavDropdown.Divider /> : null}
            {isLoggedIn ? (
              <NavDropdown.Item onClick={() => handleLogout()}>
                <FontAwesomeIcon
                  className="sign-out-icon"
                  icon={faSignOutAlt}
                ></FontAwesomeIcon>
                {"Sign Out"}
              </NavDropdown.Item>
            ) : null}
            {!isLoggedIn ? <NavDropdown.Divider /> : null}
            {!isLoggedIn ? (
              <NavDropdown.Item onClick={() => KeycloakService.doLogin()}>
                <FontAwesomeIcon
                  className="sign-in-icon"
                  icon={faSignInAlt}
                ></FontAwesomeIcon>
                {"Log In / Sign Up"}
              </NavDropdown.Item>
            ) : null}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    fullName: `${state.user.firstname} ${state.user.lastname}`,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAddUser: () => dispatch(resetAddUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
