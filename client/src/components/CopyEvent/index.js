import React, { Component } from 'react';
import { Input } from "../Form";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./style.css";
import API from '../../utils/API';

class CopyEvent extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCopyMode = this.handleCopyMode.bind(this);
    this.handlePostCopy = this.handlePostCopy.bind(this);
    this.state = {
      copyMode: false,
      UserId: "",
      address: "",
      city: "",
      contract: "",
      date: "",
      description: "",
      email: "",
      endTime: "",
      instructorName: "",
      lat: "",
      length: "",
      level: "",
      lng: "",
      lookingFor: "",
      master: "",
      name: "",
      numberOf: "",
      numPeople: "",
      payment: "",
      photoLink: "",
      price: "",
      rate: "",
      startTime: "",
      state: "",
      style: "",
      squareFootage: "",
      title: "",
      url: "",
      zip: ""
    }

  }

  componentDidMount() {
    console.log(this.props);

    const {
      eventData,
      editType
    } = this.props;

    switch (editType) {
      case "auditions":
        this.setState({
          UserId: eventData.UserId,
          address: eventData.address,
          city: eventData.city,
          contract: eventData.contract,
          date: eventData.date,
          description: eventData.description,
          endTime: eventData.endTime,
          lat: eventData.lat,
          length: eventData.length,
          lng: eventData.lng,
          lookingFor: eventData.lookingFor,
          numberOf: eventData.numberOf,
          photoLink: eventData.photoLink,
          startTime: eventData.startTime,
          state: eventData.state,
          title: eventData.title,
          url: eventData.url,
          zip: eventData.zip
        })
        break;
      case "classes":
        this.setState({
          UserId: eventData.UserId,
          title: eventData.title,
          instructorName: eventData.instructorName,
          style: eventData.style,
          level: eventData.level,
          master: eventData.value,
          payment: eventData.payment,
          date: eventData.date,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          address: eventData.address,
          city: eventData.city,
          state: eventData.state,
          zip: eventData.zip,
          lat: eventData.lat,
          lng: eventData.lng,
          description: eventData.description,
          photoLink: eventData.photoLink,
          url: eventData.url
        })
        break;
      case "performances":
        this.setState({
          UserId: eventData.UserId,
          title: eventData.title,
          date: eventData.date,
          startTime: eventData.startTime,
          length: eventData.length,
          address: eventData.address,
          city: eventData.city,
          state: eventData.state,
          zip: eventData.zip,
          lat: eventData.lat,
          lng: eventData.lng,
          price: eventData.price,
          payment: eventData.payment,
          description: eventData.description,
          photoLink: eventData.photoLink,
          url: eventData.url
        })
        break;
      default:
        break;
    }
  }

  handleCopyMode = event => {
    event.preventDefault()
    this.setState({
      copyMode: true
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handlePostCopy = event => {
    event.preventDefault()
    let copy;
    switch (this.props.editType) {
      case "auditions":
        copy = {
          UserId: this.state.UserId,
          address: this.state.address,
          city: this.state.city,
          contract: this.state.contract,
          date: this.state.date,
          description: this.state.description,
          endTime: this.state.endTime,
          lat: this.state.lat,
          length: this.state.length,
          lng: this.state.lng,
          lookingFor: this.state.lookingFor,
          numberOf: this.state.numberOf,
          photoLink: this.state.photoLink,
          startTime: this.state.startTime,
          state: this.state.state,
          title: this.state.title,
          url: this.state.url,
          zip: this.state.zip
        }
        break;
      case "classes":
        copy = {
          UserId: this.state.UserId,
          title: this.state.title,
          instructorName: this.state.instructorName,
          style: this.state.style,
          level: this.state.level,
          master: this.state.value,
          payment: this.state.payment,
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          lat: this.state.lat,
          lng: this.state.lng,
          description: this.state.description,
          photoLink: this.state.photoLink,
          url: this.state.url
        }
        break;
      case "performances":
        copy = {
          UserId: this.state.UserId,
          title: this.state.title,
          date: this.state.date,
          startTime: this.state.startTime,
          length: this.state.length,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          lat: this.state.lat,
          lng: this.state.lng,
          price: this.state.price,
          payment: this.state.payment,
          description: this.state.description,
          photoLink: this.state.photoLink,
          url: this.state.url
        }
        break;

      default:
        break;
    }
    console.log(copy);
    API.newPost(this.props.editType, copy)
      .then(res => {
        console.log(res.data)
        this.props.updateCopyTable({ editType: this.props.editType, id: res.data.id })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { editType } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button onClick={this.handleCopyMode}>+ Add Another</Button>
          </Col>
          {
            this.state.copyMode ?
              (
                <>
                  <Col>
                    <Input
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      name="date"
                      type="date"
                    // defaultValue="2019-07-01" //remove after testing
                    />
                  </Col>
                  <Col>
                    <Input
                      value={this.state.startTime}
                      onChange={this.handleInputChange}
                      name="startTime"
                      type="time"
                    />
                  </Col>
                  {editType !== "performances" ?
                    <Col>
                      <Input
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        name="endTime"
                        type="time"
                      />
                    </Col>
                    :
                    <></>
                  }
                  <Button onClick={this.handlePostCopy}>Submit</Button>
                </>
              )
              :
              <>
                <Col />
                <Col />
              </>
          }

        </Row>

      </Container>
    )
  }
}

export default CopyEvent;