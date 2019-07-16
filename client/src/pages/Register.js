import React, { Component } from "react";
import { Section, Banner } from "../components/Sections";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Input, FormBtn } from "../components/Form";
const axios = require("axios");

class Register extends Component {

  state = {
    name: '',
    logo: '',
    website: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  }

  handleRegister = event => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      axios.post("/api/auth/signup", {
        email: this.state.email,
        password: this.state.password
      }).then(function (data) {
        console.log(data);
      }).catch(err => console.log(err));
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
      <>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md="12" lg="8">
              <Banner className="register-section">
                <h3>Register</h3>
                <h6>Please fill out the form below to create an account.</h6>
              </Banner>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row className="justify-content-center">
            <Col md="10" lg="6">

              <Form>
                <Input
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  name="name"
                  type="text"
                  placeholder="Organization/Artist"
                />
                <Input
                  value={this.state.logo}
                  onChange={this.handleInputChange}
                  name="logo"
                  type="text"
                  placeholder="Link to Logo"
                />
                <Input
                  value={this.state.website}
                  onChange={this.handleInputChange}
                  name="website"
                  type="text"
                  placeholder="Link to Website"
                />
                <Input
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  name="address"
                  type="text"
                  placeholder="Address"
                />
                <Input
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                />
                {/* boolean */}
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
                <Button
                  disabled={!(this.state.email && this.state.password)}
                  onClick={this.handleRegister}
                >Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Register;
