import React, { Component } from "react";
import { Container, Row, Col, Table, Button, Modal, Tabs, Tab } from "react-bootstrap";
// import { Section, Banner } from "../Sections";
import { Nav } from "react-bootstrap";
import Post from "../Post";
import EditModal from "../EditModal";
import CopyModal from "../CopyModal";
import moment from "moment";
import API from "../../utils/API"
import "./style.css";

class EditPosts extends Component {
  constructor(props, context) {
    super(props, context);

    // EDIT
    this.editData = this.editData.bind(this);

    // COPY
    this.updateCopyTable = this.updateCopyTable.bind(this);
    this.copyData = this.copyData.bind(this);

    // DELETE
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);

    // MODAL
    this.handleClose = this.handleClose.bind(this);

    // CLICK FUNCTIONS
    this.handleClick = this.handleClick.bind(this);

    // REFRESH
    this.getInfo = this.getInfo.bind(this);

    this.state = {
      mode: '',
      editType: '',
      editId: '',
      modalData: {},
      deleteData: {},
      copyData: [],
      editShow: false,
      copyShow: false,
      deleteShow: false,
      classes: [],
      performances: [],
      auditions: [],
      spaces: []
    }
  }

  // SWITCH FUNCTION TO HANDLE CLICKS
  handleClick = (type, data) => {
    switch (type) {
      case "edit":
        this.editData(data)
        break;
      case "copy":
        this.copyData(data)
        break;
      case "delete":
        this.handleDelete(data)
        break;
      default:
        break;
    }
  }

  // INIT DELETE TO SET THE DATA THAT WILL BE DELETED
  // USER HAS A CHANCE TO SAY 'NO'
  handleDelete = data => {
    this.setState({
      deleteShow: true,
      deleteData: data
    })
  }

  // BASIC UNI HANDLE CLOSE TO SECURE DYNAMIC DATA
  handleClose() {
    this.setState({
      modalData: {},
      handleData: {},
      editShow: false,
      copyShow: false,
      deleteShow: false,
      classes: [],
      performances: [],
      auditions: [],
      spaces: [],
      copyData: []
    })
    this.getInfo();
  }

  // LIFECYCLE TO REFRESH DATA ON PAGE ON MOUNT
  componentDidMount() {
    this.getInfo();
  }

  // INIT EDIT PATH -> launches edit modal
  editData = data => {
    API.getSinglePost(data.editType, data.id)
      .then(res => {
        console.log(res);
        console.log(res.data)
        this.setState({
          editShow: true,
          editType: data.editType,
          modalData: res.data
        })
      })
      .catch(err => console.log(err))
  };

  // INIT COPY PATH -- ALLOWS FOR COPYDATA TO BE DISPLAYED DYNAMICALLY
  // -> launched copy modal
  copyData = (data) => {
    API.getSinglePost(data.editType, data.id)
      .then(res => {
        console.log(res);
        console.log(res.data)
        this.setState({
          copyShow: true,
          editType: data.editType,
          copyData: [...this.state.copyData, res.data],
          modalData: res.data
        })
      })
      .catch(err => console.log(err))
  };

  // PART OF COPY PATH UPDATES THE COPY TABLE DYNAMICALLY
  updateCopyTable = (data) => {
    API.getSinglePost(data.editType, data.id)
      .then(res => {
        console.log(res.data)
        this.setState({
          copyData: [...this.state.copyData, res.data]
        })
      })
      .catch(err => console.log(err))
  };

  // FINALIZE DELETE PATH -> closes modal
  deleteData = (data) => {
    API.deletePost(data.editType, data.id)
      .then(res => {
        console.log(res);
        console.log(res.data)
        console.log("Success");
        this.handleClose();
      })
      .catch(err => console.log(err))
  };

  // REFRESH PAGE FUNCTION BASICALLY
  getInfo() {

    // HARD CODED QUERY STRING
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

    // =================================================
    // Space Query (NOT WORKING YET returning 422)
    API.getQueryPosts("space", query + "" + this.props.user.id)
      .then(res => {
        console.log(res);
        this.setState({
          spaces: res.data
        })
        console.log(this.state.spaces);
      })
      .catch(err => console.log(err))
    // ==================================================
  }

  // RENDER....;)
  render() {

    // deconstruction of state for easy access
    const { classes, performances, auditions, spaces } = this.state;

    return (
      <>

        <Tab.Container id="user-event-tabs" defaultActiveKey="welcome">
          <Row>
            <Col md='3'>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link className="btn btn-primary" eventKey="newpost">New Post</Nav.Link>
                </Nav.Item>
                <br />
                <Nav.Item>
                  <Nav.Link className="btn btn-primary" eventKey="classes">Classes</Nav.Link>
                </Nav.Item>
                <br />
                <Nav.Item>
                  <Nav.Link className="btn btn-primary" eventKey="performances">Performances</Nav.Link>
                </Nav.Item>
                <br />
                <Nav.Item>
                  <Nav.Link className="btn btn-primary" eventKey="auditions">Auditions</Nav.Link>
                </Nav.Item>
                <br />
                <Nav.Item>
                  <Nav.Link className="btn btn-primary" eventKey="spaces">Spaces</Nav.Link>
                </Nav.Item>
                <br />
              </Nav>
            </Col>
            <Col md='9'>
              <Tab.Content>
                <Tab.Pane eventKey="welcome">
                  <Container>
                    <Row className="justify-content-around align-items-center">
                      <Col md='2' />
                      <Col md='2' />
                      <Col className="text-center" md='8'>
                        <h3>Welcome Back, {this.props.user.name}</h3>
                        <hr className="my-4" />
                        <p><span className="accent-text">Here you'll find all of your postings. You can manage them by using the buttons as navigation. Create, Update, or even Delete a posting. Anything is possible.</span></p>
                      </Col>
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="newpost">
                  <Container>
                    <Row className="justify-content-around align-items-center">
                      <Col md='2' />
                      <Col className="text-center" md='8'>
                        <h3>What would you like to post?</h3>
                        <hr className="my-4" />
                        <p><span className="accent-text">Click the dropdown below to post a new class, audition, performance, or rental space.</span></p>
                        <Post
                          user={this.props.user} />

                      </Col>
                      <Col md='2' />
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="classes">
                  <Container>
                    <Row className="justify-content-around align-items-center">
                      <h3>Classes</h3>
                      <Table responsive striped bordered hover>
                        <thead>
                          <tr>
                            <th><p className="accent-text">Style</p></th>
                            <th><p className="accent-text">Level</p></th>
                            <th><p className="accent-text">Instructor</p></th>
                            <th><p className="accent-text">Date</p></th>
                            <th><p className="accent-text">Time</p></th>
                            <th><p className="accent-text">Actions</p></th>
                          </tr>
                        </thead>
                        <tbody>
                          {(classes.length > 0) ? classes.map(klass => {
                            return (
                              <tr key={klass.id}>
                                <td><span className="light-text">{klass.instructorName}</span></td>
                                <td><span className="light-text">{klass.style}</span></td>
                                <td><span className="light-text">{klass.level}</span></td>
                                <td><span className="light-text">{moment(klass.date).format("MMM Do")}</span></td>
                                <td><span className="light-text">{moment(klass.time, "HH:mm:ss").format("h:mm A")}</span></td>
                                <td>
                                  <li><Button onClick={() => this.handleClick("edit", { id: klass.id, editType: "classes" })}>Edit</Button></li>
                                  <li><Button onClick={() => this.handleClick("copy", { id: klass.id, editType: "classes" })}>Copy</Button></li>
                                  <li><Button onClick={() => this.handleClick("delete", { id: klass.id, editType: "classes" })}>Delete</Button></li>
                                </td>
                              </tr>
                            )
                          })
                            :
                            <tr><td>No Classes to Show</td><td /><td /><td /><td /><td /></tr>
                          }
                        </tbody>
                      </Table>
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="performances">
                  <Container>
                    <Row className="justify-content-around align-items-center">
                      <h3>Performances</h3>
                      <Table responsive striped bordered hover>
                        <thead>
                          <tr>
                            <th><p className="accent-text">Title</p></th>
                            <th><p className="accent-text">Date</p></th>
                            <th><p className="accent-text">Time</p></th>
                            <th><p className="accent-text">Actions</p></th>
                          </tr>
                        </thead>
                        <tbody>
                          {(performances.length > 0) ? performances.map(performance => {
                            return (
                              <tr key={performance.id}>
                                <td><span className="light-text">{performance.title}</span></td>
                                <td><span className="light-text">{moment(performance.date).format("MMM Do")}</span></td>
                                <td><span className="light-text">{moment(performance.time, "HH:mm:ss").format("h:mm A")}</span></td>
                                <td>
                                  <li><Button onClick={() => this.handleClick("edit", { id: performance.id, editType: "performances" })}>Edit</Button></li>
                                  <li><Button onClick={() => this.handleClick("copy", { id: performance.id, editType: "performances" })}>Copy</Button></li>
                                  <li><Button onClick={() => this.handleClick("delete", { id: performance.id, editType: "performances" })}>Delete</Button></li>
                                </td>
                              </tr>
                            )
                          })
                            :
                            <tr><td>No Performances to Show</td><td /><td /><td /></tr>
                          }
                        </tbody>
                      </Table>
                    </Row>
                  </Container>

                </Tab.Pane>
                <Tab.Pane eventKey="auditions">
                  <Container>
                    <Row className="justify-content-around align-items-center">
                      <h3>Auditions</h3>
                      <Table responsive striped bordered hover>
                        <thead>
                          <tr>
                            <th><p className="accent-text">Title</p></th>
                            <th><p className="accent-text">Looking For</p></th>
                            <th><p className="accent-text">Date</p></th>
                            <th><p className="accent-text">Time</p></th>
                            <th><p className="accent-text">Actions</p></th>
                          </tr>
                        </thead>
                        <tbody>
                          {(auditions.length > 0) ? auditions.map(audition => {
                            return (
                              <tr key={audition.id}>
                                <td><span className="light-text">{audition.title}</span></td>
                                <td><span className="light-text">{audition.lookingFor}</span></td>
                                <td><span className="light-text">{moment(audition.date).format("MMM Do")}</span></td>
                                <td><span className="light-text">{moment(audition.time, "HH:mm:ss").format("h:mm A")}</span></td>
                                <td>
                                  <li><Button onClick={() => this.handleClick("edit", { id: audition.id, editType: "auditions" })}>Edit</Button></li>
                                  <li><Button onClick={() => this.handleClick("copy", { id: audition.id, editType: "auditions" })}>Copy</Button></li>
                                  <li><Button onClick={() => this.handleClick("delete", { id: audition.id, editType: "auditions" })}>Delete</Button></li>
                                </td>
                              </tr>
                            )
                          })
                            :
                            <tr><td>No Auditions to Show</td><td /><td /><td /><td /></tr>
                          }
                        </tbody>
                      </Table>
                    </Row>
                  </Container>

                </Tab.Pane>
                <Tab.Pane eventKey="spaces">
                  <Container>
                    <Row className="justify-content-around align-items-center">
                      <h3>Rental Space</h3>
                      <Table responsive striped bordered hover>
                        <thead>
                          <tr>
                            <th><p className="accent-text">Name</p></th>
                            <th><p className="accent-text">Hourly Rate</p></th>
                            <th><p className="accent-text">Square Footage</p></th>
                            <th><p className="accent-text">Capacity</p></th>
                            <th><p className="accent-text">Actions</p></th>
                          </tr>
                        </thead>
                        <tbody>
                          {(spaces.length > 0) ? spaces.map(space => {
                            return (
                              <tr key={space.id}>
                                <td><span className="light-text">{space.name}</span></td>
                                <td><span className="light-text">{space.rate}</span></td>
                                <td><span className="light-text">{space.squareFootage}</span></td>
                                <td><span className="light-text">{space.numPeople}</span></td>
                                <td>
                                  <li><Button onClick={() => this.handleClick("edit", { id: space.id, editType: "space" })}>Edit</Button></li>
                                  <li><Button onClick={() => this.handleClick("delete", { id: space.id, editType: "space" })}>Delete</Button></li>
                                </td>
                              </tr>
                            )
                          })
                            :
                            <tr><td>No Rental Spaces to Show</td><td /><td /><td /><td /></tr>
                          }
                        </tbody>
                      </Table>
                    </Row>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        <Modal
          size="sm"
          show={this.state.deleteShow}
          onHide={() => this.handleClose()}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              <h3>are you sure?</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => this.deleteData(this.state.deleteData)}><span className="light-text">delete</span></Button>
            <Button onClick={() => this.handleClose()}><span className="light-text">cancel</span></Button>
          </Modal.Body>
        </Modal>
        <EditModal
          show={this.state.editShow}
          onHide={this.handleClose}
          modalData={this.state.modalData}
          editType={this.state.editType}
        />
        <CopyModal
          user={this.props.user}
          show={this.state.copyShow}
          onHide={this.handleClose}
          copyData={this.state.copyData}
          editType={this.state.editType}
          eventData={this.state.modalData}
          updateCopyTable={this.updateCopyTable}
        />
      </>
    )
  }
}

export default EditPosts;
