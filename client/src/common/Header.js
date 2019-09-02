import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="site-header bg-gray-200">
        <div className="fixed z-100 inset-x-0 top-0 lg:static flex items-center">
          <div className="w-full max-w-screen-xl relative mx-auto px-6">
            <div className="h-16 flex flex-col justify-center">
              <div className="flex items-center -mx-6">
                <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6">
                  <div className="flex items-center">
                    <Link to="/" className="navbar-brand"><img src={logo} width="30" alt="site-brand"/></Link>
                  </div>
                </div>
                <div className="flex flex-grow lg:w-3/4 xl:w-4/5">
                  <div className="w-full lg:px-6 lg:w-3/4 xl:px-12">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:w-1/4 px-6">
                    <div className="flex justify-start items-center text-gray-500">
                      <Link to="/login" className="nav-link">Login</Link>
                      <Link to="/register" className="nav-link">Register</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
