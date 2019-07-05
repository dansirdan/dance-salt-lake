import React, { Component } from 'react';
import { Link } from "react-router-dom";
import image from "./tinyPlaceholder.JPG";

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        {this.props.isAuthed ? (
          <div>
            {this.props.tinyLogo ?
              <Link className="navbar-brand" to="/">
                <img src={image} alt="dance-sale-lake" />
              </Link>
              :
              <div></div>
            }
            <Link className="navbar-brand" to="/class">
              Class
            </Link>
            <Link className="navbar-brand" to="/performance">
              Performance
            </Link>
            <Link className="navbar-brand" to="/audition">
              Audition
            </Link>
            <Link className="navbar-brand" to="/usershome">
              Users Home
            </Link>
          </div>
        ) : (
            <div>
              {this.props.tinyLogo ?
                <Link className="navbar-brand" to="/">
                  <img src={image} alt="placeholder" />
                </Link>
                :
                <div></div>
              }
              <Link className="navbar-brand" to="/class">
                Class
              </Link>
              <Link className="navbar-brand" to="/performance">
                Performance
              </Link>
              <Link className="navbar-brand" to="/audition">
                Audition
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
