import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "../components/Grid";
import { ClassesPreview, PerformancesPreview, AuditionPreview, SpaceBanner } from "../components/Preview";
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
          <div className="preview">

            <Row>
              <Col md="12" lg="4">
                <ClassesPreview />
              </Col>

              <Col md="12" lg="4">
                <PerformancesPreview />
              </Col>

              <Col md="12" lg="4">
                <Row>
                  <Col md="12">
                    <AuditionPreview />
                  </Col>
                </Row>
              </Col>

            </Row>
          </div>

          <Row className="justify-content-center">
            <SpaceBanner />
          </Row>

        </Container>
      </div >
    )
  }
}

export default Home;
