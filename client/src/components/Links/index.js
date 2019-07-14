import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../Form";
import image from "./tinyPlaceholder.JPG";
import { NavDropdown, Nav, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from "../Login"
import "./style.css"

export function TinyLogo() {
  return (
    <Link className="navbar-brand" to="/">
      <div className="logo">
        <h1>Dance</h1>
        <h2>Salt Lake</h2>
      </div>
    </Link>
  )
};

export function ClassNav() {
  return (
    <Nav.Link href="/class">
      Class
    </Nav.Link>
  )
};

export function PerformanceNav() {
  return (
    <Nav.Link href="/performance">
      Performance
    </Nav.Link>
  )
};

export function AuditionNav() {
  return (
    <Nav.Link href="/audition">
      Audition
    </Nav.Link>
  )
};

export function UsersHomeNav() {
  return (
    <Nav.Link href="/usershome">
      Users Home
    </Nav.Link>
  )
};

export function AboutNav() {
  return (
    <Nav.Link href="/about">
      About
    </Nav.Link>
  )
};

export function LoginNav() {
  return (
    <Nav.Link href="/login">
      Login
    </Nav.Link>
  )
};

export function RegisterNav() {
  return (
    <Nav.Link href="/register">
      Register
    </Nav.Link>
  )
};

// dropdown nav for signed out users
// Component AS another component similar to naming a <a> tag with a button class
export function DropdownNavSO() {
  return (
    <NavDropdown title="Create Account" alignRight id="dropdown-btn">

      <NavDropdown.Item as="div">
        <Login />
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/register">Register</NavDropdown.Item>
        
    </NavDropdown>

  )
}

// dropdown nav for signed in users
export function DropdownNavSI() {
  return (
    <NavDropdown title="Account" alignRight id="dropdown-btn">

      <NavDropdown.Item href="/usershome">Manage Account</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>    

    </NavDropdown>
  )
}