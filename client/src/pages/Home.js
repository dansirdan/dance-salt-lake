import React, { Component } from "react";
import MoreInfo from "../components/MoreInfo";
import { Row, Col } from "react-bootstrap";
import { Container } from "../components/Grid";
import { Class, Audition, Performance, SpaceBanner } from "../components/Preview";
import Hero from "../components/Hero";

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.returnData = this.returnData.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      performances: [],
      show: false,
      date: new Date(),
      moreInfo: {},
      page: ""
    }
  }

  componentDidMount() {
    this.props.handleShow();
    this.props.sessions();
  }

  // React-Modal method for closing and clearing the data
  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  returnData = (data, page) => {
    // single page of an audition's id to populate state and then show more info.
    console.log(page)
    if (data) {
      this.setState({
        moreInfo: data,
        show: true,
        page: page
      })
    }
  };

  // TO DO:
  // 1. Decide where to put the space rental button
  // 2. Design the Component
  // 3. Place it somewhere HERE
  render() {
    return (
      <>
        <Hero />
        <Container>
          <div className="preview">
            <Row>
              <Col md="12" lg="4">
                <ClassesPreview />
              </Col>

              <Col md="12" lg="4">
                <Performance />
              </Col>

              <Col md="12" lg="4">
                <Row>
                  <Col md="12">
                    <Audition
                      returnData={this.returnData}
                      page="Audition"
                    />
                  </Col> 
                </Row>
              </Col>
            </Row>
          </div>

          <Row className="justify-content-center">
            <SpaceBanner />
          </Row>
          <MoreInfo
            page="Audition"
            show={this.state.show}
            onHide={this.handleClose}
            moreInfo={this.state.moreInfo}
          />
        </Container>
      </>
    )
  }
}

export default Home;
