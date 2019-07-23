import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap"
import { Container } from "../components/Grid";

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
                Salt Lake City is home to one of the most diverse ranges of full-time and part-time professional
                dance companies. From Ririe-Woodbury, Repertory Dance Theater, Ballet West, Odyssey Dance Theater,
                and so many more, the professional and pre-professional dancer must wade and search through multiple
                sites each week if they wish to find out about a Class, Performance, or Audition. Add in Facebook's
                chaotic and confusing group system and you'll find that information on available events for dancers
                is sorely lacking.
            </p>
              <p className="accent-text sm-text align-text-right">-Dan Mont-Eton</p>
              <hr className="my-4" />
              <p className="text-black">
                That's where we come in. Dance Salt Lake displays all of Salt Lake's regional dance information
                for aspiring dancers throughout the valley. Individual Artists and Organizations may sign up for
                a secure account that allows them to easily input information and send the word out to the community.
                Our app cuts the confusion and presents the events in an easy to navigate single page application. Even
                if your Class, Performance, or Audition takes place over multiple days, our copy-event method allows
                users to easily duplicate and edit their events.
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
                </p>
              <p>
                I am a retired professional dancer with 10 years of experience in person to person collaboration, choreography, teaching, and performance. I have toured internationally in partnership with the US Department of State and the Ririe-Woodbury Dance Company, to Mongolia and South Korea. I have also taught extensively to all ages, abilities, and communities. Stepping into my new career as a Full Stack Web Developer has allowed me to see the many similarities between choreography and coding; between art and technology.
                </p>
              <hr className="my-4" />
              <p className="text-black">
                <a href="https://danmonteton.herokuapp.com/">View my work</a>
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
                I’m passionate about the tools and technology that bring good businesses to good people. Having an opportunity to apply my web development skills to a project that fills an important need and serves my local arts community has been an incredibly rewarding experience.
            </p>
              <p className="text-black">
                I’ve always gained the greatest satisfaction out of supporting the projects and passions of others. Through the technical skills I’ve gained as a web developer I’m able to not just offer encouragement and enthusiasm but real world solutions and tangible results. This project is the first of many. I look forward to the next opportunity to serve the vast and dynamic community of creators and entrepreneurs.
            </p>
              <hr className="my-4" />
              <p className="text-black">
                <a href="https://github.com/JessiBramwell">View my work</a>
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
