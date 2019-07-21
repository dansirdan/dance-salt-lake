import React, { Component } from 'react';
import { Container } from "../Grid";
import Thumbnail from "../Thumbnail";
import { Card, Accordion, Button, Row, Col } from "react-bootstrap";
import { FormBtn } from "../Form";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API"
import moment from "moment";

// using state and componentWillMount lifecycle methods
// each preview item makes a call to the API before mounting
// Class Preview shows 3 Items always
export class ClassesPreview extends Component {
  state = {
    classData: [],
    moreInfo: {}
  }

  // lifeCycle Method to grab two classes
  componentWillMount() {

    let twoClasses = [];

    // API Get All Routes take a str
    // Returns all classes...who would have thought
    API.getPosts("classes")
      .then(res => {
        console.log(res);
        for (let i = 0; i < 2; i++) {
          twoClasses.push(res.data[i]);
        };
        this.setState({ classData: twoClasses });
      })
      .catch(err => console.log(err));
  }

  // MODAL METHOD #1
  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  // MODAL METHOD #2
  handleShow = id => {
    // API Get Single Post Route takes a str and id
    // Returns a single class data object
    API.getSinglePost("classes", id)
      .then(res => {
        this.setState({ moreInfo: res.data })
        this.props.returnData(res.data, "Class")
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="class-preview">
        <h3>Classes</h3>

        {this.state.classData.map(klass => {
          return (
            <Card key={klass.id}>
              <Card.Body>
                <Container>
                  <Row className="justify-content-xs-center">
                    <Col lg="4" md="3" xs="6">
                      <Thumbnail src={klass.photoLink} />
                    </Col>
                    <Col lg="8" md xs="6">
                      <div className="details no-margin">
                        <div>
                          <h6>{klass.title}</h6>
                          <p className="accent-text">{klass.instructorName} Lastname</p>
                          <p>{moment(klass.date).format("MMM Do, h:mm A")}</p>
                        </div>
                      </div>
                    </Col>
                    <Row>
                      <Col md="12">
                        <div className="class-description no-margin">
                          <p><span className="light-text">{klass.description}</span></p>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          )
        })}

      </div>
    )
  }
}

// Performance Preview will show a random performance from the database
export class PerformancesPreview extends Component {
  state = {
    performanceData: {},
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

    API.getSinglePost("performances", id) //--hard coded post id
      .then(res => {
        this.setState({ moreInfo: res.data })
        this.props.returnData(res.data, "Performance")
      })
      .catch(err => console.log(err));
  };
  // lifecycle method to trigger an API CALL
  // stores a random performance from the database and displays it
  // TO DO:
  // 1. test with multiple performances in the DB
  componentWillMount() {
    let RNG;
    let randomPerformance;

    API.getPosts("performances")
      .then(res => {
        RNG = Math.floor(Math.random() * res.data.length);
        randomPerformance = res.data[RNG]
        API.getSinglePost("performances", randomPerformance.id)
          .then(res => {
            this.setState({ performanceData: res.data })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    let performance = this.state.performanceData;

    return (
      <div className="performance-preview">
        <h3>Perfomances</h3>

        <Card>
          <Card.Img variant="top" src={performance.performanceData !== "" ? performance.photoLink : "http://placehold.it/200x200"} />
          <Card.Body>
            <h5>{performance.title !== "" ? performance.title : "No Performance to show"}</h5>
            <p>{moment(performance.date).format("MMM Do YYYY, h:mm A")}</p>
            <p><span className="light-text">
              {performance.description !== "" ? performance.description : "There are no current performances within our database..."}
            </span></p>
            <div className="no-margin">
              <p>{performance.address}</p>
              <p>{performance.city}, {performance.state}</p>
            </div>
            <br />
            <h6>${performance.price}</h6>
            <Button variant="success" href={performance.url}>Get Tickets</Button>
          </Card.Body>
        </Card>
      </div >
    )
  }
}

// audition preview will show 3 audition items as well
export class AuditionPreview extends Component {

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

        <Accordion defaultActiveKey="0">
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
                          <p><span className="light-text">{audition.city} {audition.state}</span></p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body>
                    <Card.Text>
                      <p> {moment(audition.startTime, "HH:mm:ss").format("h:mm A")} - {moment(audition.endTime, "HH:mm:ss").format("h:mm A")}</p>
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
      </div>
    )
  }
}

export function SpaceBanner() {
  return (
    <Col lg="8" md="12">
      <div className="banner">
        <h4>Looking for studio space?</h4>
        <p>Click here to view available rental spaces</p>
        <Link className="btn btn-primary" to="/space">View</Link >
      </div>
    </Col>
  )
}
