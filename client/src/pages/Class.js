import React, { Component } from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap"
import { List, ClassListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import API from "../utils/API"

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

  // method for passing query results from calendar component to page
  handleQuery = results => {
    this.setState({ classes: results });
  }
  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("classes")
      .then(res => this.setState({ classes: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <CalendarSection
        path="classes"
        handleQuery={this.handleQuery}
        results={this.state.classes}
      />
        <Container fluid>
          <Row>
            <Col size="md-12">
              {!this.state.classes.length ? (
                <h5 className="text-center">No Classes to Display</h5>
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

          <Row className="justify-content-lg-center">
            <Col md="8">
              <SpaceBanner />
            </Col>
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
      </div>
    );
  }
}

export default Class;
