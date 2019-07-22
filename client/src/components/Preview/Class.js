import React, { Component } from 'react';
import { Container } from "../Grid";
import Thumbnail from "../Thumbnail";
import { Card, Row, Col } from "react-bootstrap";
import "./style.css";
import API from "../../utils/API";
import moment from "moment";

// using state and componentWillMount lifecycle methods
// each preview item makes a call to the API before mounting
// Class Preview shows 3 Items always
class Class extends Component {
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

        if (res.data.length === 0) {
          console.log("no classes");
        } else {
          for (let i = 0; i < res.data.length || i < 2; i++) {
            // const element = res.data[i];
            twoClasses.push(res.data[i]);
          }
          this.setState({ classData: twoClasses });
        }
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
        {this.state.classData.length > 0 ? this.state.classData.map(klass => {
          return (
            <Card key={klass.id}>
              <Card.Body as="a" onClick={() => this.handleShow(klass.id)}>
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
        })
          :
          <Card>
            <Card.Body>
              <Container>
                <Row>
                  <Col md="12">
                    <div className="class-description no-margin text-center">
                      <h6>No Classes Available</h6>
                      <br />
                      <p><span className="light-text">It seems there are no current classes in our database. Would you like to add some?</span></p>
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

export default Class;
