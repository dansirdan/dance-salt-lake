import React, { Component } from "react";
import MoreInfo from "../components/MoreInfo";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col } from "../components/Grid";
import { ClassesPreview, PerformancesPreview, AuditionPreview } from "../components/Preview";
import Hero from "../components/Hero";
import API from "../utils/API"

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
      query: ""
    }
  }

  // React-Modal method for closing and clearing the data
  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  returnData = (data, query) => {
    // single query of an audition's id to populate state and then show more info.
    console.log(query)
    if (data) {
      this.setState({
        moreInfo: data,
        show: true,
        query: query
      })
    }
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
                returnData={this.returnData}
              />
            </Col>
            <Col size="md-4">
              <PerformancesPreview
                returnData={this.returnData}
              />
            </Col>
            <Col size="md-4">
              <Row>
                <Col size="md-12">
                  <AuditionPreview
                    returnData={this.returnData}
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
