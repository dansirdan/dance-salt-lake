import React, { Component } from 'react';
import { List, ListItem } from "../List";
import { Container, Row, Col } from "../Grid";
import Thumbnail from "../Thumbnail";
import Card from "react-bootstrap/Card";
import "./style.css";
import API from "../../utils/API"

// using state and componentWillMount lifecycle methods
// each preview item makes a call to the API before mounting
// Class Preview shows 3 Items always
export class ClassesPreview extends Component {

  state = {
    classData: []
  }

  componentWillMount() {
    let threeClasses = [];

    API.getPosts("classes")
      .then(res => {
        // for-loop to only grab three classes
        if (res.data.length > 3) {
          for (let i = 0; i < 3; i++) {
            threeClasses.push(res.data[i]);
          }
        }
        this.setState({ classData: threeClasses })
        console.log(this.state.classData);
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div>
        <h1>CLASSES</h1>
        <List>
          {this.state.classData.map(klass => {
            return (
              <ListItem key={klass.id}>
                <Container>
                  <Row>
                    <Col size="md-4">
                      <Thumbnail src={klass.photoLink} />
                    </Col>
                    <Col size="md-8">
                      <h3>{klass.title}</h3>
                      <h5>Teacher: {klass.instructorName}</h5>
                      <h5>Style: {klass.style}</h5>
                      <h5>Level: {klass.level}</h5>
                    </Col>
                  </Row>
                </Container>
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

// Performance Preview will show a random performance from the database
export class PerformancesPreview extends Component {

  state = {
    performanceData: {}
  }

  componentWillMount() {
    let RNG;
    let randomPerformance;

    API.getPosts("performances")
      .then(res => {
        RNG = Math.floor(Math.random() * res.data.length) - 1;
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
          <Card.Img variant="top" src={this.state.performanceData.performanceData ? this.state.performanceData.photoLink : "http://placehold.it/200x200"} />
          <Card.Body>
            <Card.Title>{this.state.performanceData.title ? this.state.performanceData.title : "No Performance to show"}</Card.Title>
            <Card.Text>
              {this.state.performanceData.description ? this.state.performanceData.description : "There are no current performances within our database..."}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

// audition preview will show 3 audition items as well
export class AuditionPreview extends Component {

  state = {
    auditionData: []
  }

  componentWillMount() {
    let threeAuditions = [];

    API.getPosts("classes")
      .then(res => {
        for (let i = 0; i < 3; i++) {
          threeAuditions.push(res.data[i]);
        }
        this.setState({ classData: threeAuditions })
        console.log(this.state.classData);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>AUDITIONS</h1>
        <List>
          {this.state.auditionData.map(audition => {
            return (
              <ListItem key={audition.id}>
                <Container>
                  <Row>
                    <Col size="md-4">
                      <Thumbnail src={audition.photoLink} />
                    </Col>
                    <Col size="md-8">
                      <h3>{audition.title}</h3>
                      <h5>{audition.time} @ {audition.address}</h5>
                    </Col>
                  </Row>
                </Container>
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}