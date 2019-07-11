import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { List, ClassListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import { Jumbotron } from "../components/Sections"
import QueryDropDown from "../components/QueryDrop";
import Calendar from 'react-calendar';
import API from "../utils/API"
import moment from "moment";

class Class extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      classes: [],
      show: false,
      date: new Date(),
      moreInfo: {
        title: "",
        style: "",
        master: false,
        description: "",
        address: "",
        instructorName: "",
        photoLink: "",
        length: "",
        level: "",
        payment: "",
        time: "",
        date: ""
      }
    }
  }

  // React-Calendar Method for setting the current date of the calendar
  onChange = date => this.setState({ date })

  // React-Calendar Method for querying on the clicked day
  onClickDay = value => {
    let param = moment(value).format('YYYY-MM-DD')
    this.queryCall("classes", "date", param)
  };

  /**
  * the getQueryPosts method takes THREE argument which create the route path
  * when we get to that point, the onClick method should return data on the
  * classes(path)/date(subType)"2019/07/05"/QUERY
  */
  queryCall = (postType, subType, param) => {
    API.getQueryPosts(postType, subType, param)
      .then(res => this.setState({ classes: res.data }))
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

    API.getSinglePost("classes", id) //--hard coded post id
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  };

  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("classes")
      .then(res => this.setState({ classes: res.data }))
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
            <Col size="md-12">
              {!this.state.classes.length ? (
                <h1 className="text-center">No Classes to Display</h1>
              ) : (
                  <List>
                    {this.state.classes.map(klass => {
                      return (
                        <ClassListItem
                          key={klass.id}
                          title={klass.title}
                          style={klass.style}
                          master={klass.master}
                          description={klass.description}
                          address={klass.address}
                          instructorName={klass.instructorName}
                          photoLink={klass.photoLink}
                          length={klass.length}
                          level={klass.level}
                          payment={klass.payment}
                          time={klass.time}
                          date={klass.date}
                          onClick={() => this.handleShow(klass.id)}
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
              Class Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>{this.state.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.state.moreInfo.description}</p>
            <p>Address: {this.state.moreInfo.address}</p>
            <p>Instructor: {this.state.moreInfo.instructorName}</p>
            <p>Length: {this.state.moreInfo.length}</p>
            <p>Payment: {this.state.moreInfo.payment}</p>
            <p>Time: {this.state.moreInfo.time}</p>
            <p>Date: {this.state.moreInfo.date}</p>
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

export default Class;
