import React, { Component } from 'react';
import { Form, Input, Dropdown, TextArea, Checkbox, FormBtn } from "../Form";
import axios from "axios";
import "./style.css";
import API from '../../utils/API';

class EditForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleEdits = this.handleEdits.bind(this);
    this.handleEditType = this.handleEditType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectEdit = this.handleSelectEdit.bind(this);

    this.state = {
      editType: "",
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
          title: this.props.modalData.title,
          lookingFor: this.props.modalData.lookingFor,
          description: this.props.modalData.description,
          text: this.props.modalData.auditionsNotes,
          address: this.props.modalData.address,
          lat: this.props.modalData.lat,
          lng: this.props.modalData.lng,
          gig: this.props.modalData.gig,
          photoLink: this.props.modalData.photoLink,
          link: this.props.modalData.url,
          length: this.props.modalData.length,
          payment: this.props.modalData.payment,
          time: this.props.modalData.time,
          date: this.props.modalData.date,
          url: this.props.modalData.url
        })
        break;
      case "classes":
        this.setState({
          title: this.props.modalData.title,
          style: this.props.modalData.style,
          master: this.props.modalData.value,
          description: this.props.modalData.description,
          address: this.props.modalData.address,
          lat: this.props.modalData.lat,
          lng: this.props.modalData.lng,
          instructorName: this.props.modalData.instructorName,
          photoLink: this.props.modalData.photoLink,
          length: this.props.modalData.length,
          level: this.props.modalData.level,
          payment: this.props.modalData.payment,
          time: this.props.modalData.time,
          date: this.props.modalData.date,
          url: this.props.modalData.url
        })
        break;
      case "performances":
        this.setState({
          title: this.props.modalData.title,
          description: this.props.modalData.description,
          address: this.props.modalData.address,
          lat: this.props.modalData.lat,
          lng: this.props.modalData.lng,
          price: this.props.modalData.price,
          photoLink: this.props.modalData.photoLink,
          length: this.props.modalData.length,
          payment: this.props.modalData.payment,
          time: this.props.modalData.time,
          date: this.props.modalData.date,
          url: this.props.modalData.url,
          special: this.props.modalData.special
        })
        break;
      case "space":
        this.setState({
          name: this.props.modalData.name,
          rate: this.props.modalData.rate,
          location: this.props.modalData.address,
          squareFootage: this.props.modalData.squareFootage,
          url: this.props.modalData.url,
          numPeople: this.props.modalData.numPeople,
          photoLink: this.props.modalData.photoLink,
          description: this.props.modalData.description,
          email: ""
        })
        break;

      default:
        break;
    }
  }

  handleEditType = () => {
    let edit;
    switch (this.state.editType) {
      case "auditions":
        edit = {
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
        edit = {
          title: this.state.title,
          style: this.state.style,
          master: this.state.value,
          description: this.state.description,
          address: this.state.address,
          lat: this.state.lat,
          lng: this.state.lng,
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
        edit = {
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
      case "space":
        edit = {
          name: this.state.name,
          rate: this.state.rate,
          location: this.state.address,
          squareFootage: this.state.squareFootage,
          url: this.state.url,
          numPeople: this.state.numPeople,
          photoLink: this.state.photoLink,
          description: this.state.description,
          email: this.props.user.email
        }
        break;

      default:
        break;
    }
    console.log(edit);
    // API.newPost(this.state.editType, this.props.user.id, edit)
  }

  handleSelectEdit = editType => {
    // this.setState({ editType: editType });
    switch (editType) {
      case "auditions":
        return (
          <>
            {this.dateTimeLocation()}
            <Input
              value={this.state.lookingFor}
              onChange={this.handleInputChange}
              name="lookingFor"
              type="text"
              placeholder="Looking For"
            />
            <Dropdown
              value={this.state.gig}
              onChange={this.handleInputChange}
              name="gig"
            >
              <option>Gig Type</option>
              <option value="contract">Contract</option>
              <option value="project">Project Based</option>
              <option value="fulltime">Fulltime</option>
            </Dropdown>
            <TextArea
              value={this.state.auditionsNotes}
              onChange={this.handleInputChange}
              name="audtioNotes"
              type="text"
              placeholder="Notes"
            />
            <FormBtn
              // disabled={!(this.state.email && this.state.password)}
              onClick={this.handleEdits}
            >
              Submit
          </FormBtn>
          </>
        );
      case "classes":
        return (
          <>
            {this.dateTimeLocation()}
            < Input
              value={this.state.instructorName}
              onChange={this.handleInputChange}
              name="instructorName"
              type="text"
              placeholder="Instructor"
            />
            <Input
              value={this.state.style}
              onChange={this.handleInputChange}
              name="style"
              type="text"
              placeholder="Dance Style"
            />
            {/* master boolean checkbox */}
            <Checkbox
              value={this.state.value}
              onChange={this.handleInputChange}
              name="master"
              lable="Master Class"
            />
            <Dropdown
              value={this.state.level}
              onChange={this.handleInputChange}
              name="level"
            >
              <option>Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all-levels">All Levels</option>
            </Dropdown>
            <FormBtn
              // disabled={!(this.state.email && this.state.password)}
              onClick={this.handleEdits}
            >
              Submit
          </FormBtn>
          </>
        );
      case "performances":
        return (
          <>
            {this.dateTimeLocation()}
            <Input
              value={this.state.price}
              onChange={this.handleInputChange}
              name="price"
              type="number"
              placeholder="Ticket Price"
            />
            <Input
              value={this.state.special}
              onChange={this.handleInputChange}
              name="special"
              type="text"
              placeholder="Special"
            />
            <FormBtn
              // disabled={!(this.state.email && this.state.password)}
              onClick={this.handleEdits}
            >
              Submit
          </FormBtn>
          </>
        );

      case "space":
        return (
          <>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              type="text"
              placeholder="Name"
            />
            <Input
              value={this.state.address}
              onChange={this.handleInputChange}
              name="address"
              type="text"
              placeholder="address"
            />
            <Input
              value={this.state.squareFootage}
              onChange={this.handleInputChange}
              name="squareFootage"
              type="number"
              placeholder="Square Footage"
            />
            <Input
              value={this.state.rate}
              onChange={this.handleInputChange}
              name="rate"
              type="number"
              placeholder="Price"
            />
            <Input
              value={this.state.numPeople}
              onChange={this.handleInputChange}
              name="numPeople"
              type="num"
              placeholder="Number of People"
            />
            <Input
              value={this.state.url}
              onChange={this.handleInputChange}
              name="url"
              type="text"
              placeholder="Webpage Link"
            />
            <FormBtn
              // disabled={!(this.state.email && this.state.password)}
              onClick={this.handleEdits}
            >
              Submit
          </FormBtn>
          </>
        );
      default:
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  dateTimeLocation() {
    return (
      <>
        <Input
          value={this.state.title}
          onChange={this.handleInputChange}
          name="title"
          type="text"
          placeholder="Title"
        />
        <TextArea
          value={this.state.description}
          onChange={this.handleInputChange}
          name="description"
          type="text"
          placeholder="Description"
        />
        <Input
          value={this.state.photoLink}
          onChange={this.handleInputChange}
          name="photoLink"
          type="text"
          placeholder="Image link"
        />
        <Input
          value={this.state.length}
          onChange={this.handleInputChange}
          name="length"
          type="text"
          placeholder="Duration"
        />
        <Input
          value={this.state.date}
          onChange={this.handleInputChange}
          name="date"
          type="date"
          defaultValue="2019-07-01" //remove after testing
        />
        <Input
          value={this.state.time}
          onChange={this.handleInputChange}
          name="time"
          type="time"
        />
        <Input
          value={this.state.payment}
          onChange={this.handleInputChange}
          name="payment"
          type="text"
          placeholder="Payment Method"
        />
        <Input
          value={this.state.address}
          onChange={this.handleInputChange}
          name="address"
          type="text"
          placeholder="Address"
        />
        <Input
          value={this.state.url}
          onChange={this.handleInputChange}
          name="url"
          type="text"
          placeholder="Webpage Link"
        />
      </>
    )
  }

  handleEdits = event => {
    event.preventDefault();

    if (this.state.address) {
      let cityLat;
      let cityLon;
      let geoAddy = "138+Broadway,+Salt+Lake+City,+UT"
      const geoKey = ""
      let geoQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${geoAddy}&key=${geoKey}`;
      axios.get(geoQuery)
        .then(response => {
          cityLat = parseFloat(response.data.results[0].geometry.location.lat);
          cityLon = parseFloat(response.data.results[0].geometry.location.lng);
          console.log(response);
          console.log(cityLat, cityLon)
          this.setState({
            lat: cityLat,
            lng: cityLon
          })
          this.handleEditType()
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <form>
        {this.handleSelectEdit(this.props.editType)}
      </form>
    )
  }
}

export default EditForm;