import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import { FormBtn } from "../Form";
import moment from "moment";
import "./style.css"

export function List({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}

export function ClassListItem({
  title,
  style,
  master,
  description,
  startTime,
  // address,
  instructorName,
  photoLink = "https://placehold.it/300x300",
  // length,
  level,
  // payment,
  // time,
  date,
  onClick
}) {
  return (
    <li className="list-group-item list class-list">
      <Container>

        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>

          <Col size="xs-8 sm-9">
            <div className="class-list_title">
              <h3>{title}</h3>
              <span className="badge">{level}</span>
              <span className="badge">{master}</span>
            </div>
            <div className="no-margin">
              <h6>{moment(date).format("MMM Do YYYY")} {moment(startTime, "HH:mm:ss").format("h:mm A")}</h6>
              <p>Style: {style}</p>
            </div>
            <p>Instructed by {instructorName}</p>
            <p>{description}</p>
          </Col>

          <Col size="sm-1">
            <FormBtn onClick={onClick}>View</FormBtn>
          </Col>
        </Row>

      </Container>
    </li>
  );
}

export function AuditionListItem({
  title,
  lookingFor,
  description,
  startTime,
  // text,
  // address,
  // gig,
  photoLink = "https://placehold.it/300x300",
  // length,
  // payment,
  // time,
  date,
  // link,
  onClick
}) {
  return (
    <li className="list-group-item list audition-list">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>
          <Col size="xs-8 sm-9">
            <div className="audition-list_title">
              <h3>{title}</h3>
              <h6>{moment(date).format("MMM Do YYYY")} {moment(startTime, "HH:mm:ss").format("h:mm A")}</h6>
            </div>
            <p>Looking for: {lookingFor}</p>
            <p>{description}</p>
          </Col>

          <Col size="sm-1">
            <FormBtn onClick={onClick}>View</FormBtn>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

export function PerformanceListItem({
  title,
  description,
  startTime,
  // address,
  photoLink = "https://placehold.it/300x300",
  // length,
  // payment,
  time,
  date,
  // special,
  onClick
}) {
  return (
    <li className="list-group-item list performance-list">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            {/* <h5>Presenting Company/Artist: </h5> */}
            <h6>{moment(date).format("MMM Do YYYY")} {moment(startTime, "HH:mm:ss").format("h:mm A")}</h6>
            <p>Description: {description}</p>
          </Col>

          <Col size="sm-1">
            <FormBtn onClick={onClick}>View</FormBtn>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

export function SpaceListItem({
  name,
  rate,
  location,
  squareFootage,
  numPeople,
  photoLink,
  description,
  email
}) {
  return (
    <li className="list-group-item list space-list">
      <Container>

        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>

          <Col size="xs-8 sm-9">
            <div className="space-list_title">
              <h3>{name}</h3>
              <p className="badge">${rate}</p>
            </div>
            <div className="space-list_details">
              <p className="sm-text">{location}</p>
              <p className="sm-text">Max Capacity: {numPeople}</p>
              <p className="sm-text">{squareFootage}sq. ft</p>
            </div>
            <p>{description}</p>
          </Col>
          <Col size="sm-1">
            <FormBtn href="mailto:{email}">Contact</FormBtn>
          </Col>

        </Row>
      </Container>
    </li>
  );
}
