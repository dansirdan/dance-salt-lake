import React, { Component } from 'react';
import { Card, Button } from "react-bootstrap";
import fakeAvatar from "./placeholderA.png";
import "./style.css";
import API from "../../utils/API"
import moment from "moment";

// Performance Preview will show a random performance from the database
class Perfomance extends Component {
  state = {
    performanceData: [],
    moreInfo: {}
  }

  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  }

  // handleShow = id => {
  //   // single query of an audition's id to populate state and then show more info.

  //   let randomPerf = []

  //   API.getSinglePost("performances", id)
  //     .then(res => {
  //       this.setState({ moreInfo: res.data })
  //       this.props.returnData(res.data, "Performance")
  //     })
  //     .catch(err => console.log(err));
  // };
  // lifecycle method to trigger an API CALL
  // stores a random performance from the database and displays it
  // TO DO:
  // 1. test with multiple performances in the DB
  componentWillMount() {
    let RNG;
    let randomPerformance;
    let showPerf = [];

    API.getPosts("performances")
      .then(res => {
        if (res.data.length === 0) {
          console.log("no performances")
        } else {

          RNG = Math.floor(Math.random() * res.data.length);
          randomPerformance = res.data[RNG]
          API.getSinglePost("performances", randomPerformance.id)
            .then(res => {
              showPerf.push(res.data)
              this.setState({ performanceData: showPerf })
            })
            .catch(err => console.log(err));

        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let performance = this.state.performanceData[0];

    return (
      <div className="performance-preview">
        <h3>Perfomances</h3>
        {this.state.performanceData.length > 0 ?
          <Card>
            <Card.Img variant="top" src={performance.performanceData !== "" ? performance.photoLink : "http://placehold.it/200x200"} />
            <Card.Body>
              <h5>{performance.title !== "" ? performance.title : "No Performance to show"}</h5>
              <p>{moment(performance.date).format("MMM Do YYYY, h:mm A")}</p>
              <p><span className="light-text">
                {performance.description !== "" ? performance.description : "There are no current performances within our database..."}
              </span></p>
              <p>{performance.address}</p>
              <h6>${performance.price}</h6>
              <Button variant="success" href={performance.url}>Get Tickets</Button>
            </Card.Body>
          </Card>
          :
          <Card>
            <Card.Img variant="top" src={fakeAvatar} />
            <Card.Body>
              <h5>No Performances To Show</h5>
              <p><span className="light-text">
                It seems there are no current performances in our database.
              </span></p>
              <a className="btn btn-primary" href="/register">Register</a>
            </Card.Body>
          </Card>
        }
      </div >
    )
  }
}

export default Perfomance;