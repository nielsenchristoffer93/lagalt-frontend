import React from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import KeycloakService from "../../services/keycloakService";
import { connect } from "react-redux";
import { resetAddUser } from "../../redux/User/userSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavbarComponent = (props) => {

  const { fullName } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(KeycloakService.isLoggedIn());

  /**
   * Method for logging out the user from keycloak.
   * Sets the state.userPosted in redux to false;
   */
  const handleLogout = () => {
    resetAddUser();
    KeycloakService.doLogout();
  };

  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">Lagalt</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="me-auto"></Nav>
        <Nav>
          {/* Log In button */}
          {!isLoggedIn && (
            <Button
              variant="outline-primary"
              id="btn"
              onClick={() => KeycloakService.doLogin()}
            >
              Log In
            </Button>
          )}

          {/* Sign Up button */}
          {!isLoggedIn && (
            <Button
              variant="primary"
              id="btn"
              onClick={() => KeycloakService.doRegister()}
            >
              Sign Up
            </Button>
          )}

          {/* Dropdown menu for user-profile */}
          <NavDropdown
            title={
              <FontAwesomeIcon className="" icon={faUser}></FontAwesomeIcon>
            }
            align="end"
            className="navbar-dropdown"
          >
            {/* Displays the signed in user. (fullname) */}
            {isLoggedIn ? (
              <NavDropdown.Header>Signed in as</NavDropdown.Header>
            ) : null}
            {isLoggedIn ? (
              <NavDropdown.Header>{fullName}</NavDropdown.Header>
            ) : null}

            {/* Profile dropdown item*/}
            {isLoggedIn ? <NavDropdown.Divider /> : null}
            {isLoggedIn ? (
              <NavDropdown.Item as={Link}/*onClick={() => goToProfilePage()}*/ to="/profile"> 
                {"My Profile"}
              </NavDropdown.Item>
            ) : null}

            {/* Logout dropdown item*/}
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

            {/* Login/Sign Up dropdown item*/}
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

/**
 * Mapping redux states to props in component.
 * 
 * @param {*} state 
 * @returns Javascript object contaning redux state data.
 */
const mapStateToProps = (state) => {
  return {
    fullName: `${state.user.firstname} ${state.user.lastname}`,
  };
};

/**
 * Mapping redux actions/dispatches to be called in component.
 * 
 * @param {*} dispatch 
 * @returns Different redux actions that can be called in component.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    resetAddUser: () => dispatch(resetAddUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
