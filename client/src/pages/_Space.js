import React, { Component } from 'react';
import { List, SpaceListItem } from "../components/List";
import { Container, Row, Col } from "./components/Grid";

class Space extends Component {
  state = {
    spaces: []
  }

  componentDidMount() {

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
                        key={space.title}
                        title={space.title}
                        href={space.href}
                        ingredients={space.ingredients}
                        thumbnail={space.thumbnail}
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
