import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
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
      axios.post("/api/login", {
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
      <div className="container">
        <Jumbotron>
          <h5>Login Below:</h5>
          <form>
            <Input
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
            <FormBtn
              disabled={!(this.state.email && this.state.password)}
              onClick={this.handleLogin}
            >
              Login
          </FormBtn>
          </form>

        </Jumbotron>
      </div>
    )
  }
}

export default Login;
