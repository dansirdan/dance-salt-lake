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
          <Col size="md-2" />
          <Col size="md-8">
            <h2 className="">About Us</h2>
            <br />
            <p className="lead text-black">
              Ever since my first experience in Utah as a student attending the University of Utah,
              I knew Utah was a special place for those pursuing a career in dance. From a diverse
              range of colleges, each offering a degree in dance to the many professional companies in
              Utah, including Ririe-Woodbury, Repertory Dance Theater, Ballet West, Odyssey Dance Theater,
              and so many more. Not only are there so many classes, auditions, and companies to keep track of
              there is the schedule for each organization's performance calendar.
            </p>
            <p className="align-text-right">-Dan Mont-Eton</p>
            <hr class="my-4" />
            <p className="lead text-black">
              That's where we come in. Dance Salt Lake displays all of Salt Lake's regional dance information
              for aspiring dancers throughout the valley. Individual Artists and Organizations may sign up for
              a secure account that allows them to easily input information and send the word out to the community.
            </p>
          </Col>
          <Col size="md-2" />
        </Row>
        <Row>
          <Col size="md-1" />
          <Col size="md-4">
            <img src="http://placehold.it/400x400" className="img-fluid rounded-circle" alt="aboutus" />
          </Col>
          <Col size="md-6">
            <h2 className="">Daniel Mont-Eton</h2>
            <br />
            <p className="lead text-black">
              Lorem laboris Lorem non in. Lorem laboris Lorem non in. Lorem laboris Lorem non in.
              Lorem laboris Lorem non in.
              Lorem laboris Lorem non in.
            </p>
            <hr class="my-4" />
            <p className="lead text-black">
              Lorem laboris Lorem non in. Lorem laboris Lorem non in.
            </p>
          </Col>
          <Col size="md-1" />
        </Row>
        <Row>
          <Col size="md-1" />
          <Col size="md-6">
            <h2 className="">Jessica Bramwell</h2>
            <br />
            <p className="lead text-black">
              Lorem laboris Lorem non in. Lorem laboris Lorem non in. Lorem laboris Lorem non in.
              Lorem laboris Lorem non in.
              Lorem laboris Lorem non in.
            </p>
            <hr class="my-4" />
            <p className="lead text-black">
              Lorem laboris Lorem non in. Lorem laboris Lorem non in.
            </p>
          </Col>
          <Col size="md-4">
            <img src="http://placehold.it/400x400" className="img-fluid rounded-circle" alt="aboutus" />
          </Col>
          <Col size="md-1" />
        </Row>
      </Container>
    );
  }
}

export default About;
