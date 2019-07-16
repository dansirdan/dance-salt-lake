import React, { Component } from "react";
import { Input, FormBtn } from "../Form";
import { NavDropdown, Dropdown } from 'react-bootstrap';
const axios = require("axios");

class Login extends Component {

  state = {
    email: "dan@gmail.com",
    password: "dansirdan"
  }

  authenticateStuff = (bool, emailUser) => {
    this.props.handleAuth(bool, emailUser);
  }

  handleLogin = event => {
    event.preventDefault();
    let bool;
    let currentUser;

    if (this.state.email && this.state.password) {
      axios.post("/api/auth/login", {
        email: this.state.email,
        password: this.state.password
      }).then(data => {

        if (data.status === 200) {
          bool = true;
          currentUser = JSON.parse(data.config.data);
          let emailUser = currentUser.email;
          this.authenticateStuff(bool, emailUser);
        }
      }).catch(err => {
        console.log("error")
        console.log(err);
      });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    return (
      <div className="container login">

          <form>
          <Dropdown.Item as="div">
            <Input
              autoFocus
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="Email (required)"
            />
          </Dropdown.Item>
          <Dropdown.Item as="div">
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              placeholder="Password (required)"
            />
          </Dropdown.Item>
          <Dropdown.Item as="div">
            <FormBtn
              disabled={!(this.state.email && this.state.password)}
              onClick={this.handleLogin}
            >
              Login
            </FormBtn>
          </Dropdown.Item>
          </form>

      </div>
    )
  }
}

export default Login;

