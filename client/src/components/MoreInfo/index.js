import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class MoreInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: ""
    }
  }

  setData = (page) => {
    this.setState({
      page: page
    })
    console.log(this.state.moreInfo)
  }

  componentWillMount() {
    this.setData(this.props.page)
  }

  handlePage = () => {
    switch (this.props.page) {
      case "Audition":
        return (
          <Modal.Body>
            <h2>{this.props.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.props.moreInfo.description}</p>
            <p>Address: {this.props.moreInfo.address}</p>
            <p>Gig Type: {this.props.moreInfo.gig}</p>
            <p>Length: {this.props.moreInfo.length}</p>
            <p>Payment: {this.props.moreInfo.payment}</p>
            <p>Time: {this.props.moreInfo.time}</p>
            <p>Date: {this.props.moreInfo.date}</p>
            <p>Link: {this.props.moreInfo.link}</p>
          </Modal.Body>
        )
      case "Class":
        return (
          <Modal.Body>
            <h2>{this.props.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.props.moreInfo.description}</p>
            <p>Address: {this.props.moreInfo.address}</p>
            <p>Instructor: {this.props.moreInfo.instructorName}</p>
            <p>Length: {this.props.moreInfo.length}</p>
            <p>Payment: {this.props.moreInfo.payment}</p>
            <p>Time: {this.props.moreInfo.time}</p>
            <p>Date: {this.props.moreInfo.date}</p>
          </Modal.Body>
        )
      case "Performance":
        return (
          <Modal.Body>
            <h2>{this.props.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.props.moreInfo.description}</p>
            <p>Address: {this.props.moreInfo.address}</p>
            <p>Length: {this.props.moreInfo.length}</p>
            <p>Payment: {this.props.moreInfo.payment}</p>
            <p>Time: {this.props.moreInfo.time}</p>
            <p>Date: {this.props.moreInfo.date}</p>
            <p>Special: {this.props.moreInfo.special}</p>
          </Modal.Body>
        )
      default:
        return (<></>)
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {this.state.page} Info
          </Modal.Title>
          <Button variant="secondary" onClick={this.props.onHide}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <this.handlePage />
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default MoreInfo;