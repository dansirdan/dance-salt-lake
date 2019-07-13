import React, { Component } from 'react';
import { List, SpaceListItem } from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import { Section } from "../components/Sections";
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
      <div>
        <Section>
          <h4>test</h4>
        </Section>

        <Container fluid>
          <Row>
            <Col size="lg-12">
              {!this.state.spaces.length ? (
                <h5 className="text-center">No Spaces to Display</h5>
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
                          photoLink={space.photoLink}
                          description={space.description}
                          email={space.email}
                        />
                      );
                    })}
                  </List>
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Space;
