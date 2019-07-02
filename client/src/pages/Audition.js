import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Calendar from "../components/Calendar";
import { List, AuditionListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from "../utils/API"

class Audition extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      auditions: [],
      show: false,
      moreInfo: {}
    }
  }

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

  componentDidMount() {    
    API.getPosts("auditions")
      .then(res => this.setState({ auditions: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Calendar>
          <h1 className="display-4">Audition Calendar</h1>
          <p className="lead">This is a fake div to represent our calendar and query fine-tuner.</p>
          <hr className="my-4" />
        </Calendar>
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
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Test Text in a modal
            {this.state.moreInfo.title}
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
