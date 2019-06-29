import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        {this.props.isAuthed ? (
          <div>
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <Link className="navbar-brand" to="/usershome">
              Users Home
            </Link>
          </div>
        ) : (
            <div>
              <Link className="navbar-brand" to="/">
                Home
              </Link>
              <Link className="navbar-brand" to="/register">
                Register
              </Link>
              <Link className="navbar-brand" to="/login">
                Login
              </Link>
            </div>
          )
        }
      </nav>
    );
  }
}

export default NavBar;
