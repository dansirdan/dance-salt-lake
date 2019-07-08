import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import { FormBtn } from "../Form"

export function List({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}

export function ClassListItem({
  title,
  style,
  // master,
  description,
  // address,
  instructorName,
  photoLink = "https://placehold.it/300x300",
  // length,
  level,
  // payment,
  // time,
  // date,
  onClick
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <h5>Teacher: {instructorName}</h5>
            <h5>Style: {style}</h5>
            <h5>Level: {level}</h5>
            <p>Description: {description}</p>
            <FormBtn
              onClick={onClick}
            >
              Show More
            </FormBtn>
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
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <h5>Date: {date}</h5>
            <h5>Looking for: {lookingFor}</h5>
            <p>Description: {description}</p>
            <FormBtn
              onClick={onClick}
            >
              Show More
            </FormBtn>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

export function PerformanceListItem({
  title,
  description,
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
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={photoLink} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <h5>Presenting Company/Artist: </h5>
            <h5>{date} and {time}</h5>
            <p>Description: {description}</p>
            <FormBtn
              onClick={onClick}
            >
              Show More
            </FormBtn>
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
  numPeople
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-8 sm-9">
            <h3>{name}</h3>
            <p>Rate: {rate}</p>
            <p>Location: {location}</p>
            <p>Sq Ft: {squareFootage}</p>
            <p>Number of People allowed: {numPeople}</p>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
