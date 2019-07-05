import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid";
import { ClassesPreview, PerformancesPreview, AuditionPreview } from "../components/Preview";
import Post from "../components/Post"
import Hero from "../components/Hero";

class Home extends Component {

  // Will trigger the larger logo to appear
  componentDidMount() {
    this.props.handleShow();
  }

  render() {
    return (
      <div>
        <Hero />
        <Container>
          <Hero />
          <Row>
            <Col size="md-4">
              <ClassesPreview />
            </Col>
            <Col size="md-4">
              <PerformancesPreview />
            </Col>
            <Col size="md-4">
              <AuditionPreview />
            </Col>
          </Row>
          <Post />
        </Container>
      </div >
    )
  }
}

export default Home;
