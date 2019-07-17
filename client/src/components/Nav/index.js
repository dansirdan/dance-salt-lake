import React, { Component } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { AuthConsumer } from "../AuthContext"
import moment from "moment";

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

export class MainNav extends Component {

  render() {

    return (
      <div className="nav-wrapper">
        <Container fluid>
          <AuthConsumer>
            {({ isAuth }) => (
              < Navbar expand="lg">
                {this.props.tinyLogo ? <TinyLogo /> : <div />}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <ClassNav />
                    <PerformanceNav />
                    <AuditionNav />
                    <AboutNav />

                    {isAuth ? (
                      <DropdownNavSI
                      />
                    ) : (
                        <>
                          <DropdownNavSO />
                        </>
                      )}

                  </Nav>
                </Navbar.Collapse>
              </Navbar>

            )}
          </AuthConsumer>
  
        </Container>
      </div >
    );
  }
}

export function Footer() {
  return (
    <footer>
      <p className="sm-text">&copy; Copyright {moment(new Date()).format("YYYY")}</p>
    </footer>
  )
}
