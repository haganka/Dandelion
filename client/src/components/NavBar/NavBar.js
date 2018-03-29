import React from "react";
import { Nav, NavItem, Navbar, Header, Brand } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () =>


<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/" className="wish-nav">Wish</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="/home" className="nav-item">
      Home
    </NavItem>
    <NavItem eventKey={2} href="/account" className="nav-item">
      Account
    </NavItem>
    <NavItem eventKey={3} href="/logout" className="nav-item">
      Logout
    </NavItem>
  </Nav>
</Navbar>


export default NavBar;