import React, { Component } from 'react';
import Post from "../components/Post";
import EditPosts from "../components/EditPosts";
import { Section, Banner } from "../components/Sections";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { AuthConsumer } from '../components/AuthContext';

class UsersHome extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <>
            <Section>
              <Container>
                <Banner>
                  <h3>Welcome Back {user.email}</h3>
                  <hr className="my-4" />
                  <p><span className="accent-text">Click the dropdown below to post a new class, audition, performance, or rental space.</span></p>
                  <Post
                    user={user} />
                </Banner>
              </Container>
            </Section>
            <EditPosts
              user={user}
            />
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default UsersHome;
