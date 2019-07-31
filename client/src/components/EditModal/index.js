import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
// import EditForm from "../EditForm";
import { Audition, Class, Performance, Space } from "../PostType"
import "./style.css";

class EditModal extends Component {

  renderInputs = () => {
    switch (this.props.editType) {
      case "auditions":
        return <Audition 
          modalData={this.props.modalData}
          clear={this.handleClear} // this method isn't working but we need to pass a 'clear' method to the component to prevent an error. 
        />;

      case "classes":
        return <Class 
          modalData={this.props.modalData}
          clear={this.handleClear}
        />;

      case "performances":
        return <Performance 
          modalData={this.props.modalData}
          clear={this.handleClear}
        />;

      case "space":
        return <Space 
          modalData={this.props.modalData}
          clear={this.handleClear}
        />;

      default:
        break
    }
  }

  handleClear = () => {
    console.log("clear");    
    this.props.show = false
  }

  render() {
    
    const EditForm = this.renderInputs

    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fluid="true"
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Edit Form</h3>
          </Modal.Title>
          <Button variant="secondary" onClick={this.props.onHide}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>

          <EditForm />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default EditModal;

