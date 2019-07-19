import React, { Component } from 'react';
import { Form, Input, Dropdown, TextArea, Checkbox, FormBtn } from "../Form";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
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
      lookingFor: '',
      auditionsNotes: '',
      gig: '',
      title: '',
      description: '',
      photoLink: '',
      length: '',
      date: '',
      time: '',
      address: '',
      payment: '',
      url: '',
      instructorName: '',
      value: '',
      level: '',
      style: '',
      price: '',
      special: '',
      rate: '',
      numPeople: '',
      name: '',
      squareFootage: '',
      lat: '',
      lng: ''
    }
  }

  componentDidMount() {
    console.log(this.props);
    switch (this.props.editType) {
      case "auditions":
        this.setState({
          title: this.props.eventData.title,
          lookingFor: this.props.eventData.lookingFor,
          description: this.props.eventData.description,
          text: this.props.eventData.auditionsNotes,
          address: this.props.eventData.address,
          lat: this.props.eventData.lat,
          lng: this.props.eventData.lng,
          gig: this.props.eventData.gig,
          photoLink: this.props.eventData.photoLink,
          link: this.props.eventData.url,
          length: this.props.eventData.length,
          payment: this.props.eventData.payment,
          time: this.props.eventData.time,
          date: this.props.eventData.date,
          url: this.props.eventData.url
        })
        break;
      case "classes":
        this.setState({
          title: this.props.eventData.title,
          style: this.props.eventData.style,
          master: this.props.eventData.value,
          description: this.props.eventData.description,
          address: this.props.eventData.address,
          lat: this.props.eventData.lat,
          lng: this.props.eventData.lng,
          instructorName: this.props.eventData.instructorName,
          photoLink: this.props.eventData.photoLink,
          length: this.props.eventData.length,
          level: this.props.eventData.level,
          payment: this.props.eventData.payment,
          time: this.props.eventData.time,
          date: this.props.eventData.date,
          url: this.props.eventData.url
        })
        break;
      case "performances":
        this.setState({
          title: this.props.eventData.title,
          description: this.props.eventData.description,
          address: this.props.eventData.address,
          lat: this.props.eventData.lat,
          lng: this.props.eventData.lng,
          price: this.props.eventData.price,
          photoLink: this.props.eventData.photoLink,
          length: this.props.eventData.length,
          payment: this.props.eventData.payment,
          time: this.props.eventData.time,
          date: this.props.eventData.date,
          url: this.props.eventData.url,
          special: this.props.eventData.special
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
          title: this.state.title,
          lookingFor: this.state.lookingFor,
          description: this.state.description,
          text: this.state.auditionsNotes,
          address: this.state.address,
          lat: this.state.lat,
          lng: this.state.lng,
          gig: this.state.gig,
          photoLink: this.state.photoLink,
          link: this.state.url,
          length: this.state.length,
          payment: this.state.payment,
          time: this.state.time,
          date: this.state.date,
          url: this.state.url
        }
        break;
      case "classes":
        copy = {
          title: this.state.title,
          style: this.state.style,
          master: 1,
          // for testing purposes
          description: this.state.description,
          address: this.state.address,
          // lat: this.state.lat,
          // lng: this.state.lng,
          instructorName: this.state.instructorName,
          photoLink: this.state.photoLink,
          length: this.state.length,
          level: this.state.level,
          payment: this.state.payment,
          time: this.state.time,
          date: this.state.date,
          url: this.state.url
        }
        break;
      case "performances":
        copy = {
          title: this.state.title,
          description: this.state.description,
          address: this.state.address,
          lat: this.state.lat,
          lng: this.state.lng,
          price: this.state.price,
          photoLink: this.state.photoLink,
          length: this.state.length,
          payment: this.state.payment,
          time: this.state.time,
          date: this.state.date,
          url: this.state.url,
          special: this.state.special
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

    // WORKING! Run after the API post above
  }

  render() {
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
                      value={this.state.time}
                      onChange={this.handleInputChange}
                      name="time"
                      type="time"
                    />
                  </Col>
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