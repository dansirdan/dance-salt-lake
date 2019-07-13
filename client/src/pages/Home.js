import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid";
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
              <Col size="md-12 lg-4">
                <ClassesPreview />
              </Col>

              <Col size="md-12 lg-4">
                <PerformancesPreview />
              </Col>

              <Col size="md-12 lg-4">
                <Row>
                  <Col size="md-12">
                    <AuditionPreview />
                  </Col>
                </Row>
              </Col>

            </Row>
          </div>

          <Row>
            <Col size="md-12">
              <SpaceBanner />
            </Col>
          </Row>

        </Container>
      </div >
    )
  }
}

export default Home;
