import React, { Component } from 'react';
import { Container, Row, Col } from "../Grid";
import Thumbnail from "../Thumbnail";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import "./style.css";
import API from "../../utils/API"

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
        for (let i = 0; i < 3; i++) {
          threeClasses.push(res.data[i]);
        }
        this.setState({ classData: threeClasses })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h1>CLASSES</h1>

        {this.state.classData.map(klass => {
          return (
            <Card key={klass.id}>
              <Card.Header>Teacher / Style / Level</Card.Header>
              <Card.Body>
                <Card.Title>{klass.instructorName} / {klass.style} / {klass.level}</Card.Title>
                <Container>
                  <Row>
                    <Col size="md-4">
                      <Thumbnail src={klass.photoLink} />
                    </Col>
                    <Col size="md-8">
                      <Card.Text>
                        {klass.description}
                      </Card.Text>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          )
        })}

      </>
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
      <div>
        <h1>PERFORMANCES</h1>
        <Card>
          <Card.Img variant="top" src={this.state.performanceData.performanceData !== "" ? this.state.performanceData.photoLink : "http://placehold.it/200x200"} />
          <Card.Body>
            <Card.Title>{this.state.performanceData.title !== "" ? this.state.performanceData.title : "No Performance to show"}</Card.Title>
            <Card.Text>
              {this.state.performanceData.description !== "" ? this.state.performanceData.description : "There are no current performances within our database..."}
            </Card.Text>
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
      <div>
        <h1>AUDITIONS</h1>
        <Accordion defaultActiveKey="1">
          {this.state.auditionData.map(audition => {
            return (
              <Card key={audition.id}>
                <Accordion.Toggle as={Card.Header} eventKey={audition.id} caret="true">
                  <h3>{audition.title}</h3>
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
