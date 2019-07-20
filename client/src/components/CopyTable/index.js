import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import "./style.css";

export function CopyClass(props) {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th><p className="accent-text">Class</p></th>
                <th><p className="accent-text">Date</p></th>
                <th><p className="accent-text">Time</p></th>
              </tr>
            </thead>
            <tbody>
              {(props.data.length > 0) ? props.data.map(klass => {
                return (
                  <tr key={klass.id}>
                    <td><span className="light-text">{`${klass.style} / ${klass.level} / ${klass.instructorName}`}</span></td>
                    <td><span className="light-text">{moment(klass.date).format("MMM Do")}</span></td>
                    <td><span className="light-text">{moment(klass.time, "HH:mm:ss").format("h:mm A")}</span></td>
                  </tr>
                )
              })
                :
                <tr><td>There Was An Error</td></tr>

              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )

}

export function CopyAudition(props) {

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th><p className="accent-text">Title</p></th>
                <th><p className="accent-text">Date</p></th>
                <th><p className="accent-text">Time</p></th>
              </tr>
            </thead>
            <tbody>
              {(props.data.length > 0) ? props.data.map(audition => {
                return (
                  <tr key={audition.id}>
                    <td><span className="light-text">{audition.title}</span></td>
                    <td><span className="light-text">{moment(audition.date).format("MMM Do")}</span></td>
                    <td><span className="light-text">{moment(audition.time, "HH:mm:ss").format("h:mm A")}</span></td>
                  </tr>
                )
              })
                :
                <tr><td>There Was An Error</td></tr>
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )

}

export function CopyPerformance(props) {

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th><p className="accent-text">Title</p></th>
                <th><p className="accent-text">Date</p></th>
                <th><p className="accent-text">Time</p></th>
              </tr>
            </thead>
            <tbody>
              {(props.data.length > 0) ? props.data.map(performance => {
                return (
                  <tr key={performance.id}>
                    <td><span className="light-text">{performance.title}</span></td>
                    <td><span className="light-text">{moment(performance.date).format("MMM Do")}</span></td>
                    <td><span className="light-text">{moment(performance.time, "HH:mm:ss").format("h:mm A")}</span></td>
                  </tr>
                )
              })
                :
                <tr><td>There Was An Error</td></tr>
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )

}