import React, { Component } from 'react';
import MoreInfo from "../components/MoreInfo";
import { Row, Col } from "react-bootstrap";
import { List, PerformanceListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import API from "../utils/API"
import moment from "moment";

class Performance extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      performances: [],
      show: false,
      date: new Date(),
      moreInfo: {
        title: "",
        description: "",
        address: "",
        photoLink: "",
        length: "",
        payment: "",
        time: "",
        date: "",
        special: ""
      }
    }
  }

  // React-Modal method for closing and clearing the data
  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  handleShow = id => {
    // single query of an audition's id to populate state and then show more info.

    API.getSinglePost("performances", id) //--hard coded post id
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  };

  // method for passing query results from calendar component to page
  handleQuery = results => {
    this.setState({ auditions: results });
  }

  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("performances")
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <CalendarSection
          path="performances"
          handleQuery={this.handleQuery}
        />
        <Container fluid>
          <Row>
            <Col size="md-12">
              {!this.state.performances.length ? (
                <h5 className="text-center">No Performances to Display</h5>
              ) : (
                  <List>
                    {this.state.performances.map(performance => {
                      return (
                        <PerformanceListItem
                          key={performance.id}
                          title={performance.title}
                          description={performance.description}
                          address={performance.address}
                          photoLink={performance.photoLink}
                          length={performance.length}
                          payment={performance.payment}
                          time={performance.time}
                          date={performance.date}
                          special={performance.special}
                          onClick={() => this.handleShow(performance.id)}
                        />
                      )
                    })}
                  </List>
                )
              }
            </Col>
          </Row>

          <Row className="justify-content-lg-center">
            <Col md="8">
              <SpaceBanner />
            </Col>
          </Row>

        </Container>
        <MoreInfo
          page="Performance"
          show={this.state.show}
          onHide={this.handleClose}
          moreInfo={this.state.moreInfo}
        />
      </>
    );
  }
}

export default Performance;
