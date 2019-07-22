import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  Table
} from "react-bootstrap";
import fakeAvatar from "./placeholderA.png";
import GoogleMapTWO from "../GoogleMapTWO";
import moment from "moment";
import "./style.css";

/* TODO: 
* contact button doesn't work as expected
* make the address a link to google maps
*/
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
  }

  componentWillMount() {
    this.setData(this.props.page)
  }

  handleTitle = () => {
    const { title, level } = this.props.moreInfo

    switch (this.props.page) {
      case "Audition":
        return (
          <h3>{title}</h3>
        )
      case "Class":
        return (
          <h3><b>{title}</b> / {level}</h3>
        )
      case "Performance":
        return (
          <h3>{title}</h3>
        )
      default:
        return (<></>)
    }
  }

  handlePage = () => {
    const {
      // title,
      description,
      address,
      city,
      state,
      zip,
      length,
      contract,
      payment,
      startTime,
      endTime,
      date,
      // photoLink,
      instructorName,
      url
    } = this.props.moreInfo;

    switch (this.props.page) {
      case "Audition":
        return (
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <Row>
                    <Col className="align-contetn-center">
                      <li className="accent-text">AUDITION DETAILS</li>
                      <p><span className="light-text">({length} {contract})</span></p>
                      <p><span className="light-text">{description}</span></p>
                    </Col>
                  </Row>
                  <br />
                </Col>
              </Row>
              <Row style={{ height: '200px' }}>
                <Col sm='4' md='7'>
                  <li className="accent-text">DATE</li>
                  <p><span className="light-text">{moment(date).format("MMM Do")}</span></p>
                  <li className="accent-text">TIME</li>
                  <p><span className="light-text">{moment(startTime, "HH:mm:ss").format("h:mm A")} - {moment(startTime, "HH:mm:ss").format("h:mm A")}</span></p>
                </Col>
                <Col sm='8' md='5'>
                  <li className="accent-text">LOCATION</li>
                  <div>
                    <GoogleMapTWO />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md='7'>
                  <br />
                  <Link className="btn btn-primary" to={url}>Contact</Link > 
                </Col>
                <Col>
                  <br />
                  <li><span className="light-text">{address}</span></li>
                  <li><span className="light-text">{city}, {state} {zip}</span></li> 
                </Col>
              </Row>
            </Container >
          </Modal.Body >
        )
      case "Class":
        return (
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <Row>
                    <Col md='3'>
                      <Image className="profile" src={fakeAvatar} roundedCircle fluid />
                    </Col>
                    <Col md='9'>
                      <li><p className="accent-text">w/ {<b>{instructorName}</b>}</p></li>
                      <p className="accent-text">CLASS DETAILS</p>
                      <p><span className="light-text">{description}</span></p>
                    </Col>
                  </Row>
                  <br />
                </Col>
              </Row>
              <Row style={{ height: '200px' }}>
                <Col md='7'>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th><span className="accent-text">TIME</span></th>
                        <th><span className="accent-text">DATE</span></th>
                        <th><span className="accent-text">PRICE</span></th>
                        <th><span className="accent-text">PAYMENT</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="light-text">{moment(startTime, "HH:mm:ss").format("h:mm A")} - {moment(endTime, "HH:mm:ss").format("h:mm A")}</span></td>
                        <td><span className="light-text">{moment(date).format("MMM Do")}</span></td>
                        <td><span className="light-text">{payment}</span></td>
                        <td>
                          <li><span className="light-text">Check</span></li>
                          <li><span className="light-text">Cash</span></li>
                          <li><span className="light-text">Card</span></li>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <GoogleMapTWO />
                </Col>
              </Row>
              <Row>
                <Col md='7'>
                  <br />
                  <Link className="btn btn-primary" to={url}>Contact</Link >
                </Col>
                <Col>
                  <br />
                  <li><span className="light-text">{address}</span></li>
                  <li><span className="light-text">{city}, {state} {zip}</span></li>
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
                <Col>
                  <Row>
                    <Col md='3'>
                      <Image className="profile" src={fakeAvatar} roundedCircle fluid />
                    </Col>
                    <Col md='9'>
                      <p className="accent-text">DESCRIPTION</p>
                      <p><span className="light-text">{description}</span></p>
                      <p><span className="light-text">~ {length} min.</span></p>
                    </Col>
                  </Row>
                  <br />
                </Col>
              </Row>
              <Row style={{ height: '200px' }}>
                <Col md="7">
                  <li className="accent-text">DATE</li>
                  <p><span className="light-text">{moment(date).format("MMM Do")}</span></p>
                  <li className="accent-text">TIME</li>
                  <p><span className="light-text">{moment(startTime, "HH:mm:ss").format("h:mm A")}</span></p>
                  <li className="accent-text">MISC</li>
                </Col>
                <Col>
                  <GoogleMapTWO />
                </Col>
              </Row>
              <Row>
                <Col md='7'>
                  <br />
                  <Link className="btn btn-primary" to={url}>
                    Contact
                  </Link >
                </Col>
                <Col>
                  <br />
                  <li><span className="light-text">{address}</span></li>
                  <li><span className="light-text">{city}, {state} {zip}</span></li>
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
            <this.handleTitle />
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