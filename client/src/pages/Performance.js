import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { List, PerformanceListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import QueryDropDown from "../components/QueryDrop";
import { Jumbotron } from "../components/Sections";
import Calendar from 'react-calendar';
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

  // React-Calendar Method for setting the current date of the calendar
  onChange = date => this.setState({ date })

  // React-Calendar Method for querying on the clicked day
  onClickDay = value => {
    let param = moment(value).format('YYYY-MM-DD')
    this.queryCall("performances", "date", param)
  };

  /**
  * the getQueryPosts method takes THREE argument which create the route path
  * when we get to that point, the onClick method should return data on the
  * performances(path)/date(subType)"2019/07/05"/QUERY
  */
  queryCall = (postType, subType, param) => {
    API.getQueryPosts(postType, subType, param)
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
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

    API.getPosts("performances")
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <Container fluid>
            <Row>
              <Col size="md-2" />
              <Col size="md-3">
                <QueryDropDown
                  queryCall={this.queryCall}
                />
              </Col>
              <Col size="md-1" />
              <Col size="md-4">
                <Calendar
                  onChange={this.onChange}
                  value={this.state.date}
                  onClickDay={this.onClickDay}
                />
              </Col>
              <Col size="md-2" />
            </Row>
          </Container>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col size="xs-12">
              {!this.state.performances.length ? (
                <h1 className="text-center">No Performances to Display</h1>
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
        </Container>
        {/* <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button> */}
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
      </Container>
    );
  }
}

export default Performance;
