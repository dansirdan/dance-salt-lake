import React, { Component } from "react";
import { Form, Dropdown } from "../Form";
import { Checkbox } from "../Form";

function Filter(props) {

  switch (props.path) {
    case "auditions":
      return <AuditionFilter {...props} />
      break;
    case "classes":
      return <ClassFilter {...props} />
      break;
    default:
      return <></>
      break;
  }
}


class AuditionFilter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lookingFor: "",
      gig: "",
    }
  }
  
  
  handleInputChange = event => {    
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // this.props.queryCall(this.props.path, this.state)
    console.log(this.state);
    
  };
  
  render() {

    const gender = [...new Set(this.props.results.map(x => x.lookingFor))]
    const gig = [...new Set(this.props.results.map(x => x.gig))]

    return (
      // {props.results ? (

      <Form>

        <Dropdown 
          name="lookingFor" 
          onChange={this.handleInputChange}
        >          
          <option>Gender: All</option>          
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
          <option>Gig Type: All</option>
          {gig.map((type, i) => <option key={i} value={type}>{type}</option>)}
        </Dropdown>

      </Form>

      // ) : ("")}
    )
  }

}

class ClassFilter extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      instructorName: "",
      level: "",
      style: "",
      master: false
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({ [name]: value });
  };

  render() {
    const instructors = [...new Set(this.props.results.map(x => x.instructorName))]
    const levels = [...new Set(this.props.results.map(x => x.level))]
    const styles = [...new Set(this.props.results.map(x => x.style))]

    return (
      <Form>

        <Dropdown 
          name="instructorName"
          onChange={this.handleInputChange}
        >
          <option>Instructor: All</option>
          {instructors.map((name, i) => <option key={i} value={name}>{name}</option>)}
        </Dropdown>

        <Dropdown 
          name="level"
          onChange={this.handleInputChange}  
        >
          <option>Level: All</option>
          {levels.map((level, i) => <option key={i} value={level}>{level}</option>)}
        </Dropdown>

        <Dropdown 
          name="style"
          onChange={this.handleInputChange}  
        >
          <option>Style: All</option>
          {styles.map((style, i) => <option key={i} value={style}>{style}</option>)}
        </Dropdown>

        <Checkbox
          name="master"
          onChange={this.handleInputChange}
          lable="Master Class"
        />

      </Form>
    )
  }
}

export default Filter

