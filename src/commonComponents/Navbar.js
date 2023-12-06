import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container style={{marginLeft:10}}>
        {/* <Navbar.Brand href="#">CourseCraft</Navbar.Brand> */}
        <Nav className="justify-content-left" style={{marginLeft:0 }}>
        <Nav.Item>
          <Navbar.Brand href="/home" style={{fontSize:30 }}>CourseCraft</Navbar.Brand>
        </Nav.Item>
        </Nav>
     
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;
