import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../AuthContext";
import { Input, FormBtn } from "../Form";
import { NavDropdown, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Dropdown } from "../Form";
import Login from "../Login";
import "./style.css";

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
    <Link tag={Link} to="/class">
      Class
    </Link>
  )
};

export function PerformanceNav() {
  return (
    <Link tag={Link} to="/performance">
      Performance
    </Link>
  )
};

export function AuditionNav() {
  return (
    <Link tag={Link} to="/audition">
      Audition
    </Link>
  )
};

export function UsersHomeNav() {
  return (
    <Link tag={Link} to="/usershome">
      Users Home
    </Link>
  )
};

export function AboutNav() {
  return (
    <Link tag={Link} to="/about">
      About
    </Link>
  )
};

export function LoginNav() {
  return (
    <Link tag={Link} to="/login">
      Login
    </Link>
  )
};

export function RegisterNav() {
  return (
    <Link tag={Link} to="/register">
      Register
    </Link>
  )
};

// dropdown nav for signed out users
// Component AS another component similar to naming a <a> tag with a button class
export function DropdownNavSO() {

  return (
    <NavDropdown title="Create Account" id="dropdown-btn" alignRight>

      <Login />
      <NavDropdown.Divider />
      <div className="register-link">
        <NavDropdown.Item as="p">
          Need and account? <br />Click here to register
          </NavDropdown.Item>
        <NavDropdown.Item as={Button} tag={Link} to="/register">Register</NavDropdown.Item>
      </div>

    </NavDropdown>
  )
}

// dropdown nav for signed in users
export class DropdownNavSI extends Component {
  handleLogout = (logout, e) => {
    e.preventDefault();
    logout()
  }
  render() {
    return (
      <NavDropdown title="Account" alignRight id="dropdown-btn">

        <NavDropdown.Item as={Link} to="/usershome">Manage Account</NavDropdown.Item>
        <NavDropdown.Divider />
        <AuthConsumer>
          {({ logout }) => (
            <NavDropdown.Item
              as={FormBtn}
              onClick={(e) => this.handleLogout(logout, e)}
            >
              Logout
          </NavDropdown.Item>
          )}
        </AuthConsumer>

      </NavDropdown>
    )
  }
}

// export class DropdownNavSI extends Component {

//   handleLogout = (logout, e) => {
//     e.preventDefault();
//     logout()
//   }

//   render() {
//     return (
//       <Dropdown alignRight id="dropdown-btn">
//         <Dropdown.Toggle caret="true">
//           Account
//       </Dropdown.Toggle>
//         <Dropdown.Menu>
//           <Dropdown.Item as={Link} to="/usershome">
//             Account Page
//         </Dropdown.Item>
//           <AuthConsumer>
//             {({ logout }) => (
//               <Dropdown.Item
//                 as={FormBtn}
//                 onClick={(e) => this.handleLogout(logout, e)}
//               >
//                 Logout
//             </Dropdown.Item>
//             )}
//           </AuthConsumer>
//         </Dropdown.Menu>
//       </Dropdown>
//     )
//   }
// }