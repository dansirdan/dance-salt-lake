import React, { Component } from 'react';
import Nav from "react-bootstrap/Nav";
import {
  TinyLogo,
  ClassNav,
  PerformanceNav,
  AuditionNav,
  AboutNav,
  DropdownNavSO,
  DropdownNavSI

} from "../Links";
import { AuthConsumer } from "../AuthContext";
import Navbar from "react-bootstrap/Navbar";

class MainNav extends Component {

  render() {
    return (

      <AuthConsumer>
        {({ isAuth }) => (
          <div>
            {isAuth ? (
              <Navbar bg="light" expand="lg">
                {this.props.tinyLogo ? <TinyLogo /> : <div />}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <ClassNav />
                    <PerformanceNav />
                    <AuditionNav />
                    <DropdownNavSI />
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            ) : (
                <Navbar bg="light" expand="lg">
                  {this.props.tinyLogo ? <TinyLogo /> : <div />}
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <ClassNav />
                      <PerformanceNav />
                      <AuditionNav />
                      <AboutNav />
                      <DropdownNavSO />
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default MainNav;
