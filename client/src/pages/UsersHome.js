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
            <Container>
              <Row>
                <Col>
                  <Banner>
                    <h3>Welcome Back {user.email}</h3>
                    <hr className="my-4" />
                    <p><span className="accent-text">Here you'll find all of your postings. You can manage them by clicking the tabs below. Create, Update, or even Delete a posting. Anything is possible.</span></p>
                  </Banner>
                </Col>
              </Row>
              <Row>
                <Col md='3'>

                </Col>
                <Col md='9'>
                  <EditPosts
                    user={user}
                  />
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
