import React from "react";
import { Container } from "../Grid";
import image from "./largePlaceholder.JPG";
import "./style.css";

function LargeLogo() {
  return (
    <Container fluid>
      <div className="row h-100 justify-content-center align-items-center">
        <img className="large-logo" src={image} alt="large-placeholder" />
      </div>
    </Container>
  )
}

export default LargeLogo;
