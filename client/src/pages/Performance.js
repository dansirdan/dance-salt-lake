import React, { Component } from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap";
import { List, PerformanceListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import queryString from "query-string";
import API from "../utils/API"

class Performance extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      queryResults: [],
      activeDates: [],
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

  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();
    let activeDates = [];

    API.getPosts("performances")
      .then(res => {
        activeDates = [...new Set(res.data.map(x => x.date))]
        this.setState({ queryResults: res.data, activeDates: activeDates })
      })
      .catch(err => console.log(err));
  }

  handleDateUpdate = param => {
    this.setState({ date: param }, () => {
      console.log(this.state.date);
      this.stringifyParams();
    })
  };

  // converts filterParams object to query string and calls queryCall function
  stringifyParams = () => {
    const stringified = queryString.stringify(this.state.date)
    const query = "?" + stringified;
    this.queryCall("performances", query);
  }

  /**
  * the queryCall (getQueryPosts) method takes THREE argument which create the route path
  * when we get to that point, the onClick method should return data on the
  * audition(path)/date(subType)"2019/07/05"/QUERY
  */

  queryCall = (postType, param) => {
    API.getQueryPosts(postType, param)
      .then(res => {
        this.setState({ queryResults: res.data })
      })
      .catch(err => console.log(err));
  }


  render() {
    const performances = this.state.queryResults;
    return (
      <div>
        <CalendarSection
          data={performances}
          active={this.state.activeDates}
          filter={this.handleDateUpdate}
        />
        <Container fluid>
          <Row>
            <Col size="md-12">
              {!performances.length ? (
                <h5 className="text-center">No Performances to Display</h5>
              ) : (
                  <List>
                    {performances.map(performance => {
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
            <SpaceBanner />
          </Row>

        </Container>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Performance Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>{this.state.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.state.moreInfo.description}</p>
            <p>Address: {this.state.moreInfo.address}</p>
            <p>Length: {this.state.moreInfo.length}</p>
            <p>Payment: {this.state.moreInfo.payment}</p>
            <p>Time: {this.state.moreInfo.time}</p>
            <p>Date: {this.state.moreInfo.date}</p>
            <p>Special: {this.state.moreInfo.special}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Performance;
