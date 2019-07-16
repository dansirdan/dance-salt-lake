import React, { Component } from 'react';
import { Jumbotron } from "../components/Sections"
// import { LogoutBtn } from "../components/Form";
import Post from "../components/Post";

class UsersHome extends Component {

  componentWillMount() {
    this.props.handleLogo();
  }

  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-4">Create a new Posting</h1>
          <p className="lead">Welcome, {this.props.userInfo}</p>
          <hr className="my-4" />
          <p>Click the dropdown below to post a new class, audition, performance, or rental space.</p>
          <Post />

        </Jumbotron>
      </div>
    );
  }
}

export default UsersHome;
