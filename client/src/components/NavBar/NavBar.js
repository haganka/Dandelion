import React from "react";
import { Nav, NavItem, Navbar, Header, Brand } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () =>


<Navbar className="navbar">
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/" className="wish-nav">DANDELION</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="/" className="nav-item nav-link">
      Home
    </NavItem>
    <NavItem eventKey={2} href="/user/account" className="nav-item nav-link">
      Account
    </NavItem>
    <NavItem eventKey={3} href="/logout" className="nav-item nav-link">
      Logout
    </NavItem>
  </Nav>
</Navbar>


export default NavBar;