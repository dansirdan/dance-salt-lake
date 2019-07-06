import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { List, ClassListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import Calendar from 'react-calendar';
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

  onChange = date => this.setState({ date })

  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  handleShow() {
    // single query of an audition's id to populate state and then show more info.
    this.setState({
      show: true
    })
  }

  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("classes")
      .then(res => this.setState({ classes: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <Container fluid>
          <Row>
            <Col size="xs-12">
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
                          onClick={this.handleShow}
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
