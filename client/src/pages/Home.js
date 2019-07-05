import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
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
          {/* <Hero /> */}
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
                  <Link className="btn btn-primary" to="/space">
                    Check Out Some Spaces
                </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Post />
        </Container>
      </div >
    )
  }
}

export default Home;
