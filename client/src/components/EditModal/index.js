import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Row,
  Col,
  Container
} from "react-bootstrap";
import EditForm from "../EditForm";
import "./style.css";

class EditModal extends Component {

  render() {
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
          <EditForm
            editId={this.props.editId}
            editType={this.props.editType}
            modalData={this.props.modalData}
          />
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

