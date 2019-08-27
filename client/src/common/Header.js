import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../assets/images/logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="site-header">
        <Navbar bg="dark" variant="dark">
          <Link to="/" className="navbar-brand"><img src={logo} width="30" alt="site-brand"/></Link>
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
          </Nav>
          <Nav className="mr-auto">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default Header;
