import React, { Component } from "react";
import { Input, Dropdown, TextArea, Checkbox, FormBtn } from "../Form";
import { Row, Col, Form, InputGroup } from "react-bootstrap"
import API from "../../utils/API";
import axios from "axios";

class Post extends Component {
  constructor(props, context) {
    super(props, context);

    this.handlePosts = this.handlePosts.bind(this);
    this.handlePostType = this.handlePostType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    
    this.state = {
      postType: '',
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

  handlePostType = () => {
    let post;
    switch (this.state.postType) {
      case "auditions":
        post = {
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
        post = {
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
        post = {
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
        post = {
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
    console.log(post);
    // API.newPost(this.state.postType, this.props.user.id, post)
  }

  handlePosts = event => {
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
          this.handlePostType()
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  // handle change event
  handleSelectChange = event => {
    // set value
    this.setState({ postType: event.target.value });
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
          name="starTime"
          type="time"
        />
        <Input
          value={this.state.time}
          onChange={this.handleInputChange}
          name="endTime"
          type="time"
        />
        <Input
          value={this.state.address}
          onChange={this.handleInputChange}
          name="address"
          type="text"
          placeholder="Address"
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
          value={this.state.payment}
          onChange={this.handleInputChange}
          name="payment"
          type="text"
          placeholder="Payment Method"
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

  renderInputs() {
    switch (this.state.postType) {
      case "auditions":
        return (
          <>
            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Title</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    value={this.state.title}
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>

              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="4" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Date</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    value={this.state.date}
                    type="date"
                    placeholder="Date"
                    name="date"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>

              </Form.Group>

              <Form.Group as={Col} md="4" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Time</InputGroup.Text>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      required
                      value={this.state.startTime}
                      type="time"
                      placeholder="Start Time"
                      name="startTime"
                      onChange={this.handleInputChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    value={this.state.endTime}
                    type="time"
                    placeholder="End Time"
                    name="endTime"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Address</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    value={this.state.address}
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                  <Form.Control
                    required
                    value={this.state.city}
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                  <Form.Control
                    required
                    value={this.state.state}
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Looking For:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      required
                      value={this.state.number}
                      type="number"
                      placeholder="Number of:"
                      name="number"
                      onChange={this.handleInputChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      as="select"
                      required
                      value={this.state.lookingFor}
                      name="lookingFor"
                      onChange={this.handleInputChange}
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Both">Both</option>
                      <option value="Any">Any</option>
                    </Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Contract Length:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      required
                      value={this.state.number}
                      type="number"
                      placeholder="Number of:"
                      name="number"
                      onChange={this.handleInputChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      as="select"
                      required
                      value={this.state.lookingFor}
                      name="lookingFor"
                      onChange={this.handleInputChange}
                    >
                      <option value="Month Contract">Month Contract</option>
                      <option value="Year Contract">Year Contract</option>
                    </Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    type="text"
                    value={this.state.description}
                    name="description"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Links</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    type="text"
                    value={this.state.description}
                    name="description"
                    placeholder="Image Link"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                  <Form.Control
                    required
                    type="text"
                    value={this.state.description}
                    name="description"
                    placeholder="Website URL"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <FormBtn
              // disabled={!(this.state.email && this.state.password)}
              onClick={this.handlePosts}
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
              onClick={this.handlePosts}
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
              onClick={this.handlePosts}
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
              onClick={this.handlePosts}
            >
              Submit
          </FormBtn>
          </>
        );
      default:
    }
  }

  render() {
    return (
      // form with POST method and route adjusting to postType value
      <Form>

        {/* <Input
          name="user-id"
          type="text"
          value={this.props.user.id}
          hidden
        /> */}

        <Dropdown
          id="post-type"
          value={this.state.postType}
          onChange={this.handleSelectChange}
        >
          <option>New Post:</option>
          <option value="auditions">Auditions</option>
          <option value="classes">Classes</option>
          <option value="performances">Performances</option>
          <option value="space">Rental Space</option>
        </Dropdown>

        {this.renderInputs()}

      </Form>
    )
  }
}

export default Post;