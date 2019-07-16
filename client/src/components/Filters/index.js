import React, { Component } from "react";
import { Form, Dropdown, Checkbox } from "../Form";

function Filter(props) {

  switch (props.path) {
    case "auditions":
      return <AuditionFilter {...props} />

    case "classes":
      return <ClassFilter {...props} />

    default:
      return <></>
  }
}

class AuditionFilter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.props.filter(this.state))
  };

  render() {

    // arrays of only unique values for filter dropdown
    const gender = [...new Set(this.props.data.map(x => x.lookingFor))]
    const gig = [...new Set(this.props.data.map(x => x.gig))]

    return (
      <Form>

        <Dropdown
          name="lookingFor"
          onChange={this.handleInputChange}
        >
          <option value="0">Gender: All</option>
          {gender.map((gender, i) => <option key={i} value={gender}>{gender}</option>)}
        </Dropdown>

        {/* <Dropdown>
          <option>Style:</option>
          {props.style.map(style => {
            return (
              <option value={style}>{style}</option>
            )
          })}
        </Dropdown> */}

        <Dropdown
          name="gig"
          onChange={this.handleInputChange}
        >
          <option value="0">Gig Type: All</option>
          {gig.map((type, i) => <option key={i} value={type}>{type}</option>)}
        </Dropdown>

      </Form>
    )
  }
}

class ClassFilter extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      master: "0"
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.props.filter(this.state))
  };

  handleCheckbox = event => {
    let { name, checked } = event.target;
    checked === true ? checked = "1" : checked = "0"
    this.setState({ [name]: checked }, () => this.props.filter(this.state))
  };

  render() {

    // arrays of only unique values for filter dropdown
    const instructors = [...new Set(this.props.data.map(x => x.instructorName))]
    const levels = [...new Set(this.props.data.map(x => x.level))]
    const styles = [...new Set(this.props.data.map(x => x.style))]

    return (
      <Form>

        <Dropdown
          name="instructorName"
          onChange={this.handleInputChange}
        >
          <option value="0">Instructor: All</option>
          {instructors.map((name, i) => <option key={i} value={name}>{name}</option>)}
        </Dropdown>

        <Dropdown
          name="level"
          onChange={this.handleInputChange}
        >
          <option value="0">Level: All</option>
          {levels.map((level, i) => <option key={i} value={level}>{level}</option>)}
        </Dropdown>

        <Dropdown
          name="style"
          onChange={this.handleInputChange}
        >
          <option value="0">Style: All</option>
          {styles.map((style, i) => <option key={i} value={style}>{style}</option>)}
        </Dropdown>

        <Checkbox
          value={this.state.checked}
          name="master"
          onChange={this.handleCheckbox}
          lable="Master Class"
        />

      </Form>
    )
  }
}

export default Filter

