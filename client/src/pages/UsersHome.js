import React, { Component } from 'react';
import EditPosts from "../components/EditPosts";
import { Section, Banner } from "../components/Sections";
import Post from "../components/Post";

import { Container, Row, Col } from "react-bootstrap";

import { AuthConsumer } from '../components/AuthContext';

class UsersHome extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.handleLogo();
  }

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <>
            <Section>
              <Row>
                <Col>
                  <Banner>
                    <EditPosts
                      user={user}
                    />
                  </Banner>
                </Col>
              </Row>
            </Section>
            <Container>
              <Row>
                <Col>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default UsersHome;
