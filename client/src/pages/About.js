import React, { Component } from 'react';
import { Container, Row, Col } from "../components/Grid";

class About extends Component {

  componentWillMount() {
    this.props.handleLogo();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            About Us
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
