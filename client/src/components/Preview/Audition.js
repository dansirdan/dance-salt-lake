import React, { Component } from 'react';
import { Card, Accordion, Row, Col, Container } from "react-bootstrap";
import { FormBtn } from "../Form";
import "./style.css";
import API from "../../utils/API"
import moment from "moment";

// audition preview will show 3 audition items as well
class Audition extends Component {

  // declaring state to store audition data
  state = {
    auditionData: [],
    moreInfo: {}
  }

  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  handleShow = id => {
    // single query of an audition's id to populate state and then show more info.

    API.getSinglePost("auditions", id) //--hard coded post id
      .then(res => {
        this.setState({ moreInfo: res.data })
        this.props.returnData(res.data, "Audition")
      })
      .catch(err => console.log(err));
  };
  // lifecycle method to trigger an API CALL
  // stores the first 3 auditions in the database currently

  componentWillMount() {
    let threeAuditions = [];

    API.getPosts("auditions")
      .then(res => {
        for (let i = 0; i < 3; i++) {
          threeAuditions.push(res.data[i]);
        }
        this.setState({ auditionData: threeAuditions })
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="audition-preview">
        <h3>Auditions</h3>
        {/* TRUE/FALSE if no auditions available */}
        {(this.state.auditionData > 0) ? <Accordion defaultActiveKey="0">
          {this.state.auditionData.map((audition, index) => {

            return (
              <Card key={audition.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index.toString()} caret="true">
                  <div className="audition-header">
                    <Row>
                      <Col lg="4" md="2" xs="3">
                        <div className="date">
                          <p className="day">{moment(audition.date).format("DD")}</p>
                          <h6 className="month">{moment(audition.date).format("MMM")}</h6>
                        </div>
                      </Col>
                      <Col lg="8" md="10" xs>
                        <div className="details">
                          <h6>{audition.title}</h6>
                          <p><span className="light-text">{audition.address}</span></p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body>
                    <Card.Text>
                      <b>Start Time:</b> {moment(audition.time, "HH:mm:ss").format("h:mm A")}
                    </Card.Text>
                    <Card.Text className="light-text">
                      {audition.description}
                    </Card.Text>
                    <FormBtn
                      onClick={() => this.handleShow(audition.id)}
                    >
                      Show Audition
                    </FormBtn>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )

          })}
        </Accordion>
          :
          <Card>
            <Card.Body>
              <Container>
                <Row>
                  <Col md="12">
                    <div className="class-description no-margin text-center">
                      <h6>No Auditions Available</h6>
                      <br />
                      <p><span className="light-text">It seems there are no current auditions in our database. Would you like to add some?</span></p>
                      <br />
                      <a className="btn btn-primary" href="/register">Register</a>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        }
      </div>
    )
  }
}

export default Audition;
