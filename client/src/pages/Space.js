import React, { Component } from 'react';
import { List, SpaceListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from "../utils/API"

class Space extends Component {
  state = {
    spaces: []
  }

  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("space")
      .then(res => this.setState({ spaces: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="xs-12">
            {!this.state.spaces.length ? (
              <h1 className="text-center">No Spaces to Display</h1>
            ) : (
                <List>
                  {this.state.spaces.map(space => {
                    return (
                      <SpaceListItem
                        key={space.id}
                        name={space.name}
                        rate={space.rate}
                        location={space.location}
                        squareFootage={space.squareFootage}
                        numPeople={space.numPeople}
                      />
                    );
                  })}
                </List>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Space;
