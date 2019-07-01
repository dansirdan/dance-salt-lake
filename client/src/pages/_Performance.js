import React, { Component } from 'react';
import Calendar from "../components/Calendar"
import { List, PerformanceListItem } from "../components/List";
import { Container, Row, Col } from "./components/Grid";

class Performance extends Component {
  state = {
    performances: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <Container fluid>
        <Calendar>
          <h1 className="display-4">Performance Calendar</h1>
          <p className="lead">This is a fake div to represent our calendar and query fine-tuner.</p>
          <hr className="my-4" />
        </Calendar>
        <Container fluid>
          <Row>
            <Col size="xs-12">
              {!this.state.performances.length ? (
                <h1 className="text-center">No Performances to Display</h1>
              ) : (
                  <List>
                    {this.state.performances.map(performance => {
                      return (
                        <PerformanceListItem
                          key={performance.title}
                          title={performance.title}
                          href={performance.href}
                          ingredients={performance.ingredients}
                          thumbnail={performance.thumbnail}
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

export default Performance;
