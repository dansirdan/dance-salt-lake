import React, { Component } from 'react';
import Calendar from "../components/Calendar";
import { List, AuditionListItem } from "../components/List";
import { Container, Row, Col } from "./components/Grid";

class Audition extends Component {
  state = {
    auditions: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <Container fluid>
        <Calendar>
          <h1 className="display-4">Audition Calendar</h1>
          <p className="lead">This is a fake div to represent our calendar and query fine-tuner.</p>
          <hr className="my-4" />
        </Calendar>
        <Container fluid>
          <Row>
            <Col size="xs-12">
              {!this.state.auditions.length ? (
                <h1 className="text-center">No Auditions to Display</h1>
              ) : (
                  <List>
                    {this.state.auditions.map(audition => {
                      return (
                        <AuditionListItem
                          key={audition.title}
                          title={audition.title}
                          href={audition.href}
                          ingredients={audition.ingredients}
                          thumbnail={audition.thumbnail}
                        />
                      )
                    })}
                  </List>
                )
              }
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Audition;
