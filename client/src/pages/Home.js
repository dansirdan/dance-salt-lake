import React, { Component } from "react";
import MoreInfo from "../components/MoreInfo";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col } from "../components/Grid";
import { ClassesPreview, PerformancesPreview, AuditionPreview } from "../components/Preview";
import Hero from "../components/Hero";

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      performances: [],
      show: false,
      date: new Date(),
      moreInfo: {},
      queryType: ""
    }
  }

  // React-Modal method for closing and clearing the data
  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  handleShow = (str, obj) => {
    this.setState({
      queryType: str,
      moreInfo: obj,
      show: true
    })
  };

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
              <ClassesPreview
                handleShow={() => this.handleShow}
              />
            </Col>
            <Col size="md-4">
              <PerformancesPreview
                handleShow={() => this.handleShow}
              />
            </Col>
            <Col size="md-4">
              <Row>
                <Col size="md-12">
                  <AuditionPreview
                    handleShow={() => this.handleShow}
                  />
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
          <MoreInfo
            page={this.state.query}
            show={this.state.show}
            onHide={this.handleClose}
            moreInfo={this.state.moreInfo}
          />
        </Container>
      </div >
    )
  }
}

export default Home;
