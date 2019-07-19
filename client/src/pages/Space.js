import React, { Component } from 'react';
import { List, SpaceListItem } from "../components/List";
import { Container, Row, Col } from "react-bootstrap";
// import { Container, Row, Col } from "../components/Grid";
import { Banner } from "../components/Sections";
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
      <>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md="12" lg="8">
              <Banner className="register-section">
                <h3>Studio Space</h3>
                <h6>Explore available studio space</h6>
              </Banner>
            </Col>
          </Row>
        </Container>
        
        <div className="space-section">
        <Container fluid>
          <Row>
            <Col lg="12">
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
      </>
    );
  }
}

export default Space;
