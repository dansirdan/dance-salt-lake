import React, { Component } from 'react';
import Calendar from "../components/Calendar";
import { List, ClassListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from "../utils/API"

class Class extends Component {
  state = {
    classes: []
  }
  componentDidMount() {
    API.getPosts("classes")
      .then(res => this.setState({ classes: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Calendar>
          <h1 className="display-4">Class Calendar</h1>
          <p className="lead">This is a fake div to represent our calendar and query fine-tuner.</p>
          <hr className="my-4" />
        </Calendar>
        <Container fluid>
          <Row>
            <Col size="xs-12">
              {!this.state.classes.length ? (
                <h1 className="text-center">No Classes to Display</h1>
              ) : (
                  <List>
                    {this.state.classes.map(klass => {
                      return (
                        <ClassListItem
                          key={klass.id}
                          title={klass.title}
                          style={klass.style}
                          master={klass.master}
                          description={klass.description}
                          address={klass.address}
                          instructorName={klass.instructorName}
                          photoLink={klass.photoLink}
                          length={klass.length}
                          level={klass.level}
                          payment={klass.payment}
                          time={klass.time}
                          date={klass.date}
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

export default Class;
