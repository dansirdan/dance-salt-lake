import React, { Component } from 'react';
import Calendar from "../components/Calendar"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { List, PerformanceListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from "../utils/API"

class Performance extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      performances: [],
      show: false,
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

    API.getPosts("performances")
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Calendar>
          <h1 className="display-4">Performance Calendar</h1>
          <p className="lead">This is a fake div to represent our calendar and query fine-tuner.</p>
          <hr className="my-4" />
        </Calendar>
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
