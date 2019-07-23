import React from 'react';
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

function SpaceBanner() {
  return (
    <Col md="12">
      <div className="banner">
        <h4>Looking for studio space?</h4>
        <p>Click here to view available rental spaces</p>
        <Link className="btn btn-primary" to="/space" >
          View
    </Link >
      </div>
    </Col>
  )
}

export default SpaceBanner;