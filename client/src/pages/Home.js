import React from "react";
// import Jumbotron from "../components/Jumbotron"
// import { Link } from "react-router-dom";
import { Container, Row, Col } from "../components/Grid";
import { ClassesPreview, PerformancesPreview, AuditionPreview } from "../components/Preview";
import Post from "../components/Post"
import Hero from "../components/Hero";

function Home() {
  return (
    <div>
      <Hero />
      <Container>
        <Hero />
        <Row>
          <Col size="md-4">
            <ClassesPreview>

            </ClassesPreview>
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
    </div>
  )
}

export default Home;
