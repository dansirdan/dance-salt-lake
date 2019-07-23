import React, { Component } from 'react';
import EditPosts from "../components/EditPosts";
import { Section, Banner } from "../components/Sections";
import { Container, Row, Col } from "react-bootstrap";
import { AuthConsumer } from '../components/AuthContext';

class UsersHome extends Component {

  componentWillMount() {
    this.props.handleLogo();
  }

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <>
            <Section className="usershome">
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
