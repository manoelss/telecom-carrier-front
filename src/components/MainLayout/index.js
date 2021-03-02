import React from "react";
import { 
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";

export default function MainLayout(props) {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Telecom Carrier</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Available Numbers" id="nav-dropdown">
              <NavDropdown.Item href="/available-numbers">See all numbers</NavDropdown.Item>
              <NavDropdown.Item href="/available-numbers/add">Add new number</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="pt-4 pb-4">
        {props.children}
      </div>
    </Container>
  );
}