import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col } from "../components/Grid";
import { ClassesPreview, PerformancesPreview, AuditionPreview } from "../components/Preview";
import Hero from "../components/Hero";

class Home extends Component {

  // lifecycle method to trigger the Large Logo animation
  componentDidMount() {
    this.props.handleShow();
  }

  // TO DO:
  // 1. Decide where to put the space rental button
  // 2. Design the Component
  // 3. Place it somewhere HERE
  render() {
    return (
      <div>
        <Hero />
        <Container>
          <Row>
            <Col size="md-4">
              <ClassesPreview />
            </Col>
            <Col size="md-4">
              <PerformancesPreview />
            </Col>
            <Col size="md-4">
              <Row>
                <Col size="md-12">
                  <AuditionPreview />
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  {/* HERE */}
                  <Link className="btn btn-primary" to="/space">
                    Check Out Some Spaces
                </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

export default Home;
