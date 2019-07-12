import React, { Component } from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

import {
  TinyLogo,
  ClassNav,
  PerformanceNav,
  AuditionNav,
  AboutNav,
  DropdownNavSO,
  DropdownNavSI
} from "../Links";
import "./style.css"

class MainNav extends Component {

  render() {

    return (
      <div>
        <Navbar expand="lg">
          {this.props.tinyLogo ? <TinyLogo /> : <div />}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <ClassNav />
              <PerformanceNav />
              <AuditionNav />

              {this.props.isAuthed ? (
                <DropdownNavSI />
              ) : (
                <>
                  <AboutNav />
                  <DropdownNavSO />
                </>
                )}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MainNav;
