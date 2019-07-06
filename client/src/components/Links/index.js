import React from "react";
import {
  Link,
  NavLink
} from "react-router-dom";
import image from "./tinyPlaceholder.JPG";
import Dropdown from 'react-bootstrap/Dropdown'

export function TinyLogo() {
  return (
    <Link className="navbar-brand" to="/">
      <img src={image} alt="dance-sale-lake" />
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
export function DropdownNavSO() {
  return (
    <Dropdown>
      <Dropdown.Toggle caret color="primary">
        Account
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <NavLink as={Dropdown.Item} to="/login">
            Login
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink as={Dropdown.Item} to="/register">
            Register
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink as={Dropdown.Item} to="/logout">
            Logout
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

// dropdown nav for signed in users
export function DropdownNavSI() {
  return (
    <Dropdown>
      <Dropdown.Toggle caret color="primary">
        Account
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <NavLink as={Dropdown.Item} to="/usershome">
            Account Page
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink as={Dropdown.Item} to="/logout">
            Logout
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}