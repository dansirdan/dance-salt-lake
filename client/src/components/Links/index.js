import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "./tinyPlaceholder.JPG";
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <Link className="navbar-brand" to="/class">
      Class
    </Link>
  )
};

export function PerformanceNav() {
  return (
    <Link className="navbar-brand" to="/performance">
      Performance
    </Link>
  )
};

export function AuditionNav() {
  return (
    <Link className="navbar-brand" to="/audition">
      Audition
    </Link>
  )
};

export function UsersHomeNav() {
  return (
    <Link className="navbar-brand" to="/usershome">
      Users Home
    </Link>
  )
};

export function AboutNav() {
  return (
    <Link className="navbar-brand" to="/about">
      About
    </Link>
  )
};

export function LoginNav() {
  return (
    <Link className="navbar-brand" to="/login">
      Login
    </Link>
  )
};

export function RegisterNav() {
  return (
    <Link className="navbar-brand" to="/register">
      Register
    </Link>
  )
};

// dropdown nav for signed out users
// Component AS another component similar to naming a <a> tag with a button class
export function DropdownNavSO() {
  return (
    <Dropdown alignRight id="dropdown-btn">
      <Dropdown.Toggle>
        <FontAwesomeIcon icon="check-square" />
        Create Account
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/login">
          Login
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/register">
          Register
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

// dropdown nav for signed in users
export function DropdownNavSI() {
  return (
    <Dropdown alignRight id="dropdown-btn">
      <Dropdown.Toggle caret="true" color="primary">
        Account
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/usershome">
          Account Page
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/logout">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}