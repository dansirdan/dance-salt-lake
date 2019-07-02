import React, { Component } from 'react';
import Calendar from "../components/Calendar"
import { List, PerformanceListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from "../utils/API"

class Performance extends Component {
  state = {
    performances: []
  }

  componentDidMount() {
    API.getPosts("performances")
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
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
                          key={performance.id}
                          title={performance.title}
                          description={performance.description}
                          address={performance.address}
                          photoLink={performance.photoLink}
                          length={performance.length}
                          payment={performance.payment}
                          time={performance.time}
                          date={performance.date}
                          special={performance.special}
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
