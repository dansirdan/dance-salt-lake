import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap"
import { Container } from "../components/Grid";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class About extends Component {

  // lifecycle method to handle Large Logo
  componentWillMount() {
    this.props.handleLogo();
  }

  render() {
    return (
      <div className="about-section">
        
        <Container>
          <Row className="justify-content-md-center">

            <Col md="9">
              <h2 className="">About Us</h2>
              <br />
              <p className="text-black">
                Ever since my first experience in Utah as a student attending the University of Utah,
                I knew Utah was a special place for those pursuing a career in dance. From a diverse
                range of colleges, each offering a degree in dance to the many professional companies in
                Utah, including Ririe-Woodbury, Repertory Dance Theater, Ballet West, Odyssey Dance Theater,
                and so many more. Not only are there so many classes, auditions, and companies to keep track of
                there is the schedule for each organization's performance calendar.
            </p>
              <p className="accent-text sm-text align-text-right">-Dan Mont-Eton</p>
              <hr className="my-4" />
              <p className="text-black">
                That's where we come in. Dance Salt Lake displays all of Salt Lake's regional dance information
                for aspiring dancers throughout the valley. Individual Artists and Organizations may sign up for
                a secure account that allows them to easily input information and send the word out to the community.
            </p>
            </Col>

          </Row>

          <Row className="about-section">
            <Col md="4" className="about-section__img--first">
              <img src="./img/headshot-dan.png" className="img-fluid rounded-circle" alt="aboutus" />
            </Col>
            <Col md="6">
              <h2 className="">Daniel Mont-Eton</h2>
              <br />
              <p className="text-black">
               I am deeply passionate about people and technology. My experience from the dance world has shaped me into a highly creative, collaborative, and adaptive developer. I enjoy resolving coding errors, creating exciting and interactive user interfaces, and love that I still get to collaborate with people who are just as excited about Web Development as I am.
 I am a retired professional dancer with 10 years of experience in person to person collaboration, choreography, teaching, and performance. I have toured internationally in partnership with the US Department of State and the Ririe-Woodbury Dance Company, to Mongolia and South Korea. I have also taught extensively to all ages, abilities, and communities. Stepping into my new career as a Full Stack Web Developer has allowed me to see the many similarities between choreography and coding; between art and technology.
            </p>
              <hr className="my-4" />
              <p className="text-black">
                Lorem laboris Lorem non in. Lorem laboris Lorem non in.
            </p>
            </Col>
            <Col md="1" />
          </Row>

          <Row className="about-section flex-row-reverse">
            <Col md="4" className="about-section__img--second">
              <img src="./img/headshot-jessi.png" className="img-fluid rounded-circle" alt="aboutus" />
            </Col>
            <Col md="6">
              <h2 className="">Jessica Bramwell</h2>
              <br />
              <p className="text-black">
                Lorem laboris Lorem non in. Lorem laboris Lorem non in. Lorem laboris Lorem non in.
                Lorem laboris Lorem non in.
                Lorem laboris Lorem non in.
            </p>
              <hr className="my-4" />
              <p className="text-black">
                Lorem laboris Lorem non in. Lorem laboris Lorem non in.
            </p>
            </Col>
            <Col md="1" />
          </Row>
        </Container>

      </div>
    );
  }
}

export default About;
