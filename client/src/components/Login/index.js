import React, { Component } from "react";
import { Input, FormBtn } from "../Form";
<<<<<<< HEAD
import { Dropdown } from 'react-bootstrap';
const axios = require("axios");
=======
import { AuthConsumer } from "../AuthContext"
>>>>>>> master

class Login extends Component {
  // Definining State to Hold Info
  state = {
    email: "dm@gmail.com",
    password: "dansirdan"
  }

  // Method to call Auth Login function
  handleLogin = (login, e) => {
    e.preventDefault();
    login(this.state)
  }

  // Handles state change for inputs
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    return (
      <div className="container login">
        <AuthConsumer>
          {({ login }) => (
            <form>
              <Input
                autoFocus
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <Dropdown.Item as="div">
                <FormBtn
                  disabled={!(this.state.email && this.state.password)}
                  onClick={(e) => this.handleLogin(login, e)}
                >
                  Login
            </FormBtn>
              </Dropdown.Item>
            </form>
          )}
        </AuthConsumer>
      </div>
    )
  }
}

export default Login;

