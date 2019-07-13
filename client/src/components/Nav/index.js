import React, { Component } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
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
import { normalize } from 'path';

export class MainNav extends Component {

  // state = {
  //   activeClass: ""
  // }

  handleScroll = () => {
    const nav = document.querySelector(".nav-wrapper");
    const hero = document.querySelector(".hero");

    const navTop = nav.offsetTop;
    const navBottom = nav.offsetBottom;
    const heroTop = hero.offsetTop;

    if (window.scrollY > navTop) {
      nav.classList.add("sticky");
      // document.body.style.paddingTop = nav.offsetHeight + 'px';
    } else {
      console.log(navTop, heroTop);
      
      nav.classList.remove("sticky");
      // document.body.style.paddingTop = 0;
    }
  }
  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }


  render() {

    return (
      <div className="nav-wrapper">
        <Container fluid>
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
        </Container>
      </div>
    );
  }
}

export function Footer() {
  return (
    <footer>
      <p className="sm-text">&copy; Copyright {moment(Date()).format("YYYY")}</p>
    </footer>
  )
}
