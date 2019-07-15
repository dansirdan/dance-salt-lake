import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image
} from "react-bootstrap";
import fakeGoogle from "./google.png";
import fakeAvatar from "./placeholderA.png";
import moment from "moment";

class MoreInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: ""
    }
  }

  setData = (page) => {
    this.setState({
      page: page
    })
    console.log(this.state.moreInfo)
  }

  componentWillMount() {
    this.setData(this.props.page)
  }

  handlePage = () => {
    const {
      title,
      description,
      address,
      gig,
      length,
      payment,
      time,
      date,
      link,
      instructorName,
      special
    } = this.props.moreInfo;

    switch (this.props.page) {
      case "Audition":
        return (
          <Modal.Body>
            <Container>
              <Row>
                <Col md="8">
                  <Row className="align-text-center">
                    <Col>
                      <h4>{title}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="9">
                      <h6>DESCRIPTION</h6>
                      <p><span className="light-text">{description}</span></p>
                    </Col>
                    <Col md="3">
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p><span className="light-text">OFFERING: {gig}</span></p>
                      <p><span className="light-text">DATE: {moment(date).format("MMM Do YYYY")}</span></p>
                      <p><span className="light-text">TIME: {moment(time, "HH:mm:ss").format("h:mm A")}</span></p>
                      <p><span className="light-text">LENGTH: {length} minutes</span></p>
                    </Col>
                  </Row>
                </Col>
                <Col md="4">
                  <Row>
                    <Image src={fakeGoogle} rounded fluid />
                  </Row>
                  <Row>
                    <p><span className="light-text">{address}</span></p>
                  </Row>
                  <Row>
                    <Link className="btn btn-primary" to={link} >
                      Contact
                    </Link >
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        )
      case "Class":
        return (
          <Modal.Body>
            <Container>
              <Row>
                <Col md="8">
                  <Row className="align-text-center">
                    <Col>
                      <h4>{title}</h4>
                      <p className="accent-text">w/ {instructorName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <Image src={fakeAvatar} roundedCircle fluid />
                    </Col>
                    <Col md="9" />
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <h6>DESCRIPTION</h6>
                      <p><span className="light-text">{description}</span></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p><span className="light-text">{moment(date).format("MMM Do YYYY")}</span></p>
                      <p><span className="light-text">TIME: {moment(time, "HH:mm:ss").format("h:mm A")}</span></p>
                      <p><span className="light-text">LENGTH: {length} minutes</span></p>
                      <p><span className="light-text">{payment}</span></p>
                    </Col>
                  </Row>
                </Col>
                <Col md="4">
                  <Row>
                    <Image src={fakeGoogle} rounded fluid />
                  </Row>
                  <Row>
                    <p><span className="light-text">{address}</span></p>
                  </Row>
                  <Row>
                    <Link className="btn btn-primary" to={link} >
                      Contact
                    </Link >
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        )
      case "Performance":
        return (
          <Modal.Body>
            <Container>
              <Row>
                <Col md="8">
                  <Row className="align-text-center">
                    <Col>
                      <h4>{title}</h4>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <h6>DESCRIPTION</h6>
                      <p><span className="light-text">{description}</span></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p><span className="light-text">{moment(date).format("MMM Do YYYY")}</span></p>
                      <p><span className="light-text">TIME: {moment(time, "HH:mm:ss").format("h:mm A")}</span></p>
                      <p><span className="light-text">LENGTH: {length} minutes</span></p>
                      <p><span className="light-text">{payment}</span></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p><span className="light-text">{special}</span></p>
                    </Col>
                  </Row>
                </Col>
                <Col md="4">
                  <Row>
                    <Image src={fakeGoogle} rounded fluid />
                  </Row>
                  <Row>
                    <p><span className="light-text">{address}</span></p>
                  </Row>
                  <Row>
                    <Link className="btn btn-primary" to={link} >
                      Contact
                    </Link >
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        )
      default:
        return (<></>)
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fluid="true"
      >
        <Modal.Header>
          <Modal.Title>
            <h3>{(this.state.page).toLocaleUpperCase()} INFO</h3>

          </Modal.Title>
          <Button variant="secondary" onClick={this.props.onHide}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <this.handlePage />
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default MoreInfo;