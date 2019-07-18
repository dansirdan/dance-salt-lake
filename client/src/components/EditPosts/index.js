import React, { Component } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Section } from "../Sections";
import moment from "moment";
import "./style.css";

class EditPosts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mode: '',
      classes: [],
      performances: [],
      auditions: [],
      spaces: []
    }
  }

  render() {

    const { classes, performances, auditions, spaces } = this.state;

    return (
      <Section>
        <Container>
          <Row className="justify-content-around align-items-center">
            CLASS
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            </Table>
            <br />
            PERFORMANCE
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            </Table>
            <br />
            AUDITION
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            </Table>
          </Row>
        </Container>
      </Section>
    )
  }
}

export default EditPosts;