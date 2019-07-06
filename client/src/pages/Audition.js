import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { List, AuditionListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import Calendar from "react-calendar";
import API from "../utils/API";

class Audition extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      auditions: [],
      show: false,
      date: new Date(),
      moreInfo: {
        title: "",
        lookingFor: "",
        description: "",
        text: "",
        address: "",
        gig: "",
        photoLink: "",
        length: "",
        payment: "",
        time: "",
        date: "",
        link: ""
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

  /**
   * the getSinglePost method takes two argument which create the route path
   * when we get to that point, the onClick method should return a list item id
   */

  handleShow() {
    // single query of an audition's id to populate state and then show more info.

    API.getSinglePost("auditions", 1) //--hard coded post id
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("auditions")
      .then(res => this.setState({ auditions: res.data }))
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
              {!this.state.auditions.length ? (
                <h1 className="text-center">No Auditions to Display</h1>
              ) : (
                  <List>
                    {this.state.auditions.map(audition => {
                      return (
                        <AuditionListItem
                          key={audition.id}
                          title={audition.title}
                          lookingFor={audition.lookingFor}
                          description={audition.description}
                          text={audition.text}
                          address={audition.address}
                          gig={audition.gig}
                          photoLink={audition.photoLink}
                          length={audition.length}
                          payment={audition.payment}
                          time={audition.time}
                          date={audition.date}
                          link={audition.link}
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
              Audition Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>{this.state.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.state.moreInfo.description}</p>
            <p>Address: {this.state.moreInfo.address}</p>
            <p>Gig Type: {this.state.moreInfo.gig}</p>
            <p>Length: {this.state.moreInfo.length}</p>
            <p>Payment: {this.state.moreInfo.payment}</p>
            <p>Time: {this.state.moreInfo.time}</p>
            <p>Date: {this.state.moreInfo.date}</p>
            <p>Link: {this.state.moreInfo.link}</p>
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

export default Audition;
