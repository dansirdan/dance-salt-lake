import React, { Component } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Section } from "../Sections";
import moment from "moment";
import API from "../../utils/API"
import "./style.css";

class EditPosts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mode: '',
      classes: [],
      performances: [],
      auditions: [],
      spaces: []
    }
  }

  componentDidMount() {

    // setting up hardcoded User Id query using Jessica's method
    const query = "?UserId="

    // Classes Query (working)
    API.getQueryPosts("classes", query + "" + this.props.user.id)
      .then(res => {
        console.log(res);
        this.setState({
          classes: res.data
        })
        console.log(this.state.classes);
      })
      .catch(err => console.log(err))

    // Performances Query (working)
    API.getQueryPosts("performances", query + "" + this.props.user.id)
      .then(res => {
        console.log(res);
        this.setState({
          performances: res.data
        })
        console.log(this.state.performances);
      })
      .catch(err => console.log(err))

    // Auditions Query (working)
    API.getQueryPosts("auditions", query + "" + this.props.user.id)
      .then(res => {
        console.log(res);
        this.setState({
          auditions: res.data
        })
        console.log(this.state.auditions);
      })
      .catch(err => console.log(err))

    // Space Query (NOT WORKING YET returning 404)
    // API.getQueryPosts("space", query + "" + this.props.user.id)
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       spaces: res.data
    //     })
    //     console.log(this.state.spaces);
    //   })
    //   .catch(err => console.log(err))
  }

  render() {

    const { classes, performances, auditions, spaces } = this.state;

    return (
      <Section>
        <Container>
          <Row className="justify-content-around align-items-center">
            <h3>Classes</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th><p className="accent-text">Title</p></th>
                  <th><p className="accent-text">Instructor</p></th>
                  <th><p className="accent-text">Style</p></th>
                  <th><p className="accent-text">Level</p></th>
                  <th><p className="accent-text">Length</p></th>
                  <th><p className="accent-text">Time</p></th>
                  <th><p className="accent-text">Date</p></th>
                  <th><p className="accent-text">Actions</p></th>
                </tr>
              </thead>
              <tbody>
                {(classes.length > 0) ? classes.map(klass => {
                  return (
                    <tr>
                      <td><span className="light-text">{klass.title}</span></td>
                      <td><span className="light-text">{klass.instructorName}</span></td>
                      <td><span className="light-text">{klass.style}</span></td>
                      <td><span className="light-text">{klass.level}</span></td>
                      <td><span className="light-text">{klass.length}</span></td>
                      <td><span className="light-text">{moment(klass.time, "HH:mm:ss").format("h:mm A")}</span></td>
                      <td><span className="light-text">{moment(klass.date).format("MMM Do")}</span></td>
                      <td>
                        <li><span className="light-text">Edit</span></li>
                        <li><span className="light-text">Copy</span></li>
                        <li><span className="light-text">Delete</span></li>
                      </td>
                    </tr>
                  )
                })
                  :
                  <tr><td>No Classes to Show</td></tr>
                }
              </tbody>
            </Table>
            <br />
            <h3>Performances</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th><p className="accent-text">Title</p></th>
                  <th><p className="accent-text">Description</p></th>
                  <th><p className="accent-text">Address</p></th>
                  <th><p className="accent-text">Price</p></th>
                  <th><p className="accent-text">Time</p></th>
                  <th><p className="accent-text">Date</p></th>
                  <th><p className="accent-text">Actions</p></th>
                </tr>
              </thead>
              <tbody>
                {(performances.length > 0) ? performances.map(performance => {
                  return (
                    <tr>
                      <td><span className="light-text">{performance.title}</span></td>
                      <td><span className="light-text">{performance.description}</span></td>
                      <td><span className="light-text">{performance.address}</span></td>
                      <td><span className="light-text">{performance.price}</span></td>
                      <td><span className="light-text">{moment(performance.time, "HH:mm:ss").format("h:mm A")}</span></td>
                      <td><span className="light-text">{moment(performance.date).format("MMM Do")}</span></td>
                      <td>
                        <li><span className="light-text">Edit</span></li>
                        <li><span className="light-text">Copy</span></li>
                        <li><span className="light-text">Delete</span></li>
                      </td>
                    </tr>
                  )
                })
                  :
                  <tr><td>No Performances to Show</td></tr>
                }
              </tbody>
            </Table>
            <br />
            <h3>Auditions</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th><p className="accent-text">Title</p></th>
                  <th><p className="accent-text">Looking For</p></th>
                  <th><p className="accent-text">Contract</p></th>
                  <th><p className="accent-text">Length</p></th>
                  <th><p className="accent-text">Time</p></th>
                  <th><p className="accent-text">Date</p></th>
                  <th><p className="accent-text">Actions</p></th>
                </tr>
              </thead>
              <tbody>
                {(auditions.length > 0) ? auditions.map(audition => {
                  return (
                    <tr>
                      <td><span className="light-text">{audition.title}</span></td>
                      <td><span className="light-text">{audition.lookingFor}</span></td>
                      <td><span className="light-text">{audition.gig}</span></td>
                      <td><span className="light-text">{audition.length}</span></td>
                      <td><span className="light-text">{moment(audition.time, "HH:mm:ss").format("h:mm A")}</span></td>
                      <td><span className="light-text">{moment(audition.date).format("MMM Do")}</span></td>
                      <td>
                        <li><span className="light-text">Edit</span></li>
                        <li><span className="light-text">Copy</span></li>
                        <li><span className="light-text">Delete</span></li>
                      </td>
                    </tr>
                  )
                })
                  :
                  <tr><td>No Auditions to Show</td></tr>
                }
              </tbody>
            </Table>
            <br />
            <h3>Rental Space</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th><p className="accent-text">Name</p></th>
                  <th><p className="accent-text">Hourly Rate</p></th>
                  <th><p className="accent-text">Square Footage</p></th>
                  <th><p className="accent-text">Capacity</p></th>
                  <th><p className="accent-text">Email</p></th>
                  <th><p className="accent-text">Actions</p></th>
                </tr>
              </thead>
              <tbody>
                {(spaces.length > 0) ? spaces.map(space => {
                  return (
                    <tr>
                      <td><span className="light-text">{space.name}</span></td>
                      <td><span className="light-text">{space.rate}</span></td>
                      <td><span className="light-text">{space.squareFootage}</span></td>
                      <td><span className="light-text">{space.numPeople}</span></td>
                      <td><span className="light-text">{space.email}</span></td>
                      <td>
                        <li><span className="light-text">Edit</span></li>
                        <li><span className="light-text">Copy</span></li>
                        <li><span className="light-text">Delete</span></li>
                      </td>
                    </tr>
                  )
                })
                  :
                  <tr><td>No Rental Spaces to Show</td></tr>
                }
              </tbody>
            </Table>
          </Row>
        </Container>
      </Section>
    )
  }
}

export default EditPosts;