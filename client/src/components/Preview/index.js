import React, { Component } from 'react';
import { Container, Row, Col } from "../Grid";
import Thumbnail from "../Thumbnail";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API"
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons'

// using state and componentWillMount lifecycle methods
// each preview item makes a call to the API before mounting
// Class Preview shows 3 Items always
export class ClassesPreview extends Component {

  // declaring state to store class data
  state = {
    classData: []
  }

  // lifecycle method to trigger an API CALL
  // stores the first 3 classes in the database currently
  // TO DO:
  // 1. define the query based off the date, time, master class, etc. CHOOSE
  // 2. the route is defined already
  componentWillMount() {
    let threeClasses = [];

    API.getPosts("classes")
      .then(res => {
        for (let i = 0; i < 2; i++) {
          threeClasses.push(res.data[i]);
        }
        this.setState({ classData: threeClasses })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="class-preview">
        <h3>Classes</h3>

        {this.state.classData.map(klass => {
          return (
            <Card key={klass.id}>
              <Card.Body>
                <Container>
                  <Row>
                    <Col size="md-4">
                      <Thumbnail src={klass.photoLink} />
                    </Col>
                    <Col size="md-8">
                      <div className="details no-margin">
                        <div>
                          <h6>{klass.title}</h6>
                          <p className="accent-text">{klass.instructorName} Lastname</p>
                          {/* <span className="badge">{klass.level}</span> */}
                          <p>{moment(klass.date).format("MMM Do, h:mm A")}</p>
                        </div>
                      </div>
                    </Col>
                    <Row>
                      <Col size="md-12">
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

  // declaring state to store performance data
  state = {
    performanceData: {}
  }

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
    return (
      <div className="performance-preview">
        <h3>Perfomances</h3>
        <Card>
          <Card.Img variant="top" src={this.state.performanceData.performanceData !== "" ? this.state.performanceData.photoLink : "http://placehold.it/200x200"} />
          <Card.Body>
            <h5>{this.state.performanceData.title !== "" ? this.state.performanceData.title : "No Performance to show"}</h5>
            <p>{moment(this.state.performanceData.date).format("MMM Do YYYY, h:mm A")}</p>
            <p><span className="light-text">
              {this.state.performanceData.description !== "" ? this.state.performanceData.description : "There are no current performances within our database..."}
            </span></p>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

// audition preview will show 3 audition items as well
export class AuditionPreview extends Component {

  // declaring state to store audition data
  state = {
    auditionData: []
  }

  // lifecycle method to trigger an API CALL
  // stores the first 3 auditions in the database currently
  // TO DO:
  // 1. figure out how to have one tab already open

  componentWillMount() {
    let threeAuditions = [];

    API.getPosts("auditions")
      .then(res => {
        for (let i = 0; i < 3; i++) {
          threeAuditions.push(res.data[i]);
        }
        this.setState({ auditionData: threeAuditions })
        console.log(this.state.auditionData[0].id)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="audition-preview">
        <h3>Auditions</h3>
        <Accordion defaultActiveKey="1">
          {this.state.auditionData.map((audition, index) => {
            console.log(index);

            return (
              <Card key={audition.id}>
                <Accordion.Toggle as={Card.Header} eventKey={audition.id} caret="true">
                  <div className="audition-header">
                    <div className="date">
                      <p className="day">{moment(audition.date).format("DD")}</p>
                      <h6 className="month">{moment(audition.date).format("MMM")}</h6>
                    </div>
                    <div className="details">
                      <h6>{audition.title}</h6>
                      <p><span className="light-text">{audition.address}</span></p>
                    </div>
                    <span className="fa-layers fa-fw">
                      <FontAwesomeIcon icon={faCircle} />
                      <FontAwesomeIcon icon={faPlus} inverse transform="shrink-6" />
                    </span>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={audition.id}>
                  <Card.Body>
                    <Card.Text>
                      <b>Time:</b> {audition.time}
                    </Card.Text>
                    <Card.Text>
                      <b>Place:</b> {audition.address}

                    </Card.Text>
                    <Card.Text>
                      <b>Description:</b> {audition.description}

                    </Card.Text>

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
    <div className="banner">
      <h4>Looking for studio space?</h4>
      <p>Click here to view available rental spaces</p>
      <Link className="btn btn-primary" to="/space" >
        View
    </Link >

    </div>
  )
}
