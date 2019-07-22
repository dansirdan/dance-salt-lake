import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  CopyClass,
  CopyAudition,
  CopyPerformance
} from "../CopyTable";
import CopyEvent from "../CopyEvent";
// import EditForm from "../EditForm";
import "./style.css";

class CopyModal extends Component {

  handleCopyTable = () => {
    switch (this.props.editType) {
      case "classes":
        return <CopyClass
          data={this.props.copyData}
        />
      case "auditions":
        return <CopyAudition
          data={this.props.copyData}
        />
      case "performances":
        return <CopyPerformance
          data={this.props.copyData}
        />
      default:
        break;
    }
  }

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
            <h3>Copy an Event</h3>
          </Modal.Title>
          <Button variant="secondary" onClick={this.props.onHide}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <this.handleCopyTable
          />
          <CopyEvent
            eventData={this.props.eventData}
            editType={this.props.editType}
            updateCopyTable={this.props.updateCopyTable}
            user={this.props.user}
          />
          {/* <EditForm
            editId={this.props.editId}
            editType={this.props.editType}
            modalData={this.props.modalData}
          /> */}
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

export default CopyModal;
