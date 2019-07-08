import React, { Component } from "react";
import { Dropdown } from "../Form";
import Button from "react-bootstrap/Button";

class QueryDropDown extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);

    this.state = {
      postType: "",
      subType: "",
      param: ""
    }
  }

  handleSelectChange(event) {
    this.setState({ subType: event.target.value })
  }

  handleParamChange(event) {
    this.setState({ param: event.target.value })
  }

  componentDidMount() {
    let url = window.location.pathname.split("/")[1];
    let postType;
    switch (url) {
      case "class":
        postType = "classes"
        break;
      case "audition":
        postType = "auditions"
        break;
      case "performance":
        postType = "peformances"
        break;
      default:
        break;
    }
    this.setState({ postType: postType })
  }

  renderDropdown() {
    switch (this.state.postType) {
      case "auditions":
        return (
          <Dropdown
            id="sub-type"
            onChange={this.handleSelectChange}>
            <option>Search by...</option>
            <option value="gender">Looking For</option>
            <option value="style">Style</option>
            <option value="gig">Gig</option>
          </Dropdown>
        );

      case "classes":
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

      case "performances":
        return (
          <p>
            Click the calendar to query a day!
          </p>
        );

      default:
    }
  }

  renderInputs() {
    switch (this.state.subType) {
      case "gender":
        return (
          <Dropdown
            id="gender-param"
            onChange={this.handleParamChange}>
            <option>Select Gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
          </Dropdown>
        );

      case "style":
        return (
          <Dropdown
            id="style-param"
            onChange={this.handleParamChange}>
            <option>Select Style...</option>
            <option value="jazz">Jazz</option>
            <option value="ballet">Ballet</option>
            <option value="tap">Tap</option>
            <option value="modern">Modern</option>
            <option value="contemporary">Contemporary</option>
            <option value="other">Other</option>
          </Dropdown>
        );

      case "gig":
        return (
          <Dropdown
            id="gig-param"
            onChange={this.handleParamChange}>
            <option>Gig Type</option>
            <option value="contract">Contract</option>
            <option value="project">Project Based</option>
            <option value="fulltime">Fulltime</option>
          </Dropdown>
        );

      case "instructor":
        return (
          <p>IN PROGRESS</p>
        );

      case "level":
        return (
          <Dropdown
            id="level-param"
            onChange={this.handleParamChange}>
            <option>Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all-levels">All Levels</option>
          </Dropdown>
        );

      case "master-param":
        return (
          <Dropdown
            id="master-param"
            onChange={this.handleParamChange}>
            <option>Master Class</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </Dropdown>
        );

      default:
        return <></>;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value)

  }

  render() {
    const {
      postType,
      subType,
      param
    } = this.state;

    return (
      <>
        <>
          {this.renderDropdown()}
          {this.renderInputs()}
          <Button
            onClick={() => this.props.queryCall(postType, subType, param)}
          >
            Search
          </Button>
        </>
      </>
    )
  }
}

export default QueryDropDown;