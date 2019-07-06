import React, { Component } from "react";
import { Form, Input, TextArea, Checkbox, Dropdown } from "../Form";

class QueryDropDown extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      postType: "",
      subType: "",
      param: ""
    }
  }

  handleSelectChange(event) {
    this.setState({ subType: event.target.value })
  }

  componentDidMount() {
    let postType = window.location.pathname;
    this.setState({ postType: postType })
  }

  renderDropdown() {
    switch (this.state.postType) {
      case "/audition":
        return (
          <Dropdown
            id="sub-type"
            onChange={this.handleSelectChange}>
            <option>Search by...</option>
            <option value="gender">Looking For</option>
            <option value="style">Style</option>
            <option value="address">Location</option>
            <option value="gig">Gig</option>
          </Dropdown>
        );

      case "/class":
        return (
          <Dropdown
            id="sub-type"
            onChange={this.handleSelectChange}>
            <option>Search by...</option>
            <option value="instructor">Instructor</option>
            <option value="level">Level</option>
            <option value="master">Master Class</option>
          </Dropdown>
        );

      case "/performance":
        return (
          <p>
            Click the calendar to query a day!
          </p>
        );

      default:
    }
  }

  render() {
    return (
      <>
        <Form
          method="GET"
          action={"/api" + this.state.postType + "/" + this.state.subType + "/" + this.state.param}>
          {this.renderDropdown()}
          {/* <Dropdown
          id="sub-type"
          onChange={this.handleSelectChange}>
          <option>Search by...</option>
          <option value="gender">Looking For</option>
          <option value="style">Style</option>
          <option value="address">Location</option>
          <option value="gig">Gig</option>
        </Dropdown> */}
          {/* {renderInputs()} */}

        </Form>
      </>
    )
  }
}

export default QueryDropDown;