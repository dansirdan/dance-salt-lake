import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../AuthContext";
// import { FormBtn } from "../Form";
import { NavDropdown, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
// import { Dropdown } from "../Form";
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
    <LinkContainer to="/class">
      <Nav.Link>
        Class
      </Nav.Link>
    </LinkContainer>
  )
};

export function PerformanceNav() {
  return (
    <LinkContainer to="/performance">
      <Nav.Link>
        Performance
      </Nav.Link>
    </LinkContainer>
  )
};

export function AuditionNav() {
  return (
    <LinkContainer to="/audition">
      <Nav.Link>
        Audition
      </Nav.Link>
    </LinkContainer>
  )
};

export function UsersHomeNav() {
  return (
    <LinkContainer to="/usershome">
      <Nav.Link>
        Users Home
      </Nav.Link>
    </LinkContainer>
  )
};

export function AboutNav() {
  return (
    <LinkContainer to="/about">
      <Nav.Link>
        About
      </Nav.Link>
    </LinkContainer>
  )
};

export function LoginNav() {
  return (
    <LinkContainer to="/login">
      <Nav.Link>
        Login
      </Nav.Link>
    </LinkContainer>
  )
};

export function RegisterNav() {
  return (
    <LinkContainer to="/register">
      <Nav.Link>
        Register
      </Nav.Link>
    </LinkContainer>
  )
};

// dropdown nav for signed out users
// Component AS another component similar to naming a <a> tag with a button class
export function DropdownNavSO() {

  return (
    <NavDropdown title="Create Account" id="dropdown-btn" alignRight>

      <Login />
      <div className="register-link">
        <NavDropdown.Divider />
        <p>Need and account? <br />Click here to register</p>
        <LinkContainer to="/register">
          <NavDropdown.Item as={Button}>Register</NavDropdown.Item>
        </LinkContainer>
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
        <div className="register-link">
          <NavDropdown.Item as={Link} to="/usershome">Manage Account</NavDropdown.Item>
          {/* <NavDropdown.Divider /> */}
          <AuthConsumer>
            {({ logout }) => (
              <NavDropdown.Item
                /* as={FormBtn} */
                as={Link}
                to="/"
                onClick={(e) => this.handleLogout(logout, e)}
              >
                Logout
            </NavDropdown.Item>
            )}
          </AuthConsumer>
        </div>
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