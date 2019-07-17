import React from "react";
import { Container } from "../Grid";
import "./style.css";

function LargeLogo() {
  return (
    <Container fluid>
      <div className="row justify-content-center align-items-center logo-container">

        <div className="logo">
          <h1>Dance</h1>
          <h2>Salt Lake</h2>
        </div>
      </div>

    </Container>
  )
}

export default LargeLogo;
