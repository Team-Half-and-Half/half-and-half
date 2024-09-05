import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <Navbar expand="lg" style={{ height: '125px' }} className="basic-nav gradient">
      <Container>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-end basic-nav">
            <NavLink to="/home"><Image style={{ marginTop: '8px', marginBottom: '20px', marginRight: '15px', width: '200px', height: '95px' }} src="/images/spirebooks-logo.png" /></NavLink>
            {currentUser ? ([
              <Nav.Link style={{ marginTop: '35px', marginLeft: '15px' }} id={COMPONENT_IDS.NAVBAR_ADD_STUFF} as={NavLink} to="/add" key="add">FINANCES</Nav.Link>,
              <Nav.Link style={{ marginTop: '35px', marginLeft: '15px' }} id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/list" key="list">AUDIT</Nav.Link>,
              <Nav.Link style={{ marginTop: '35px', marginLeft: '15px' }} id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/list" key="list">VISUALIZE</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
                </NavDropdown>]
            ) : ''}
          </Nav>
          <Nav className="justify-content-start basic-nav">
            {currentUser === '' ? (
              <NavDropdown className="basic-nav" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item className="basic-nav" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item className="basic-nav" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown className="basic-nav" id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item className="basic-nav" id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
