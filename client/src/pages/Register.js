import React, { Component } from "react";
import { Banner } from "../components/Sections";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Input } from "../components/Form";
import API from "../utils/API"
const axios = require("axios");

class Register extends Component {

  state = {
    name: 'Daniel',
    logo: 'https://scontent.faus1-1.fna.fbcdn',
    website: 'https://www.facebook.com/dmonteton',
    address: '8 E Hillside Ave',
    phone: '3032049046',
    email: 'dmont@gmail.com',
    password: '111111'
  }

  handleRegister = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.signUp({
        name: this.state.name,
        logo: this.state.logo,
        website: this.state.website,
        address: this.state.address,
        password: this.state.password,
        email: this.state.email
      })
        .then(function (res) {
          console.log(res.data);
        }).catch(err => console.log(err));
    }
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentWillMount() {
    this.props.handleLogo();
  }

  render() {
    return (
      <>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md="12" lg="8">
              <Banner className="register-section">
                <h3>Register</h3>
                <h6>Please fill out the form below to create an account</h6>
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
