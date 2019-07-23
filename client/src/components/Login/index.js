import React, { Component } from "react";
import { Input } from "../Form";
import { Button } from 'react-bootstrap';
import { AuthConsumer } from "../AuthContext"
import history from "../../history";

class Login extends Component {
  // Definining State to Hold Info
  state = {
    email: "",
    password: ""
  }

  // Method to call Auth Login function
  handleLogin = (e, login) => {
    e.preventDefault()
    login(this.state, () => {
      history.push("/usershome")
    })
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
      <div className="container auth-dropdown">
        <AuthConsumer>
          {({ login }) => (
            <form>
              <Input
                autoFocus
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                type="email"
                placeholder="Email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                type="password"
                placeholder="Password (required)"
                autocomplete="current-password"
              />
              {/* <Dropdown.Item as="div"> */}
              <Button
                disabled={!(this.state.email && this.state.password)}
                onClick={(e) => this.handleLogin(e, login)}
              >
                Login
            </Button>
              {/* </Dropdown.Item> */}
            </form>
          )}
        </AuthConsumer>
      </div>
    )
  }
}

export default Login;

