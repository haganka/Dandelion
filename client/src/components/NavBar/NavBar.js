import React from "react";
import { Nav, NavItem } from 'react-bootstrap';

const NavBar = () =>


<Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
  <NavItem eventKey="1" href="/">
    Project 3
  </NavItem>
  <NavItem eventKey="2" href="/about">
    About
  </NavItem>
  <NavItem eventKey="3" href="/login">
    Login
  </NavItem>
</Nav>

export default NavBar;