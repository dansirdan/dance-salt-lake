import React, { Component } from 'react';
import { Jumbotron } from "../components/Sections"
import Post from "../components/Post"
import EditPosts from "../components/EditPosts"
import { AuthConsumer } from '../components/AuthContext';

class UsersHome extends Component {
  constructor(props, context) {
    super(props, context);

    this.returnData = this.returnData.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      performances: [],
      show: false,
      date: new Date(),
      editId: "",
      editType: ""
    }
  }

  componentWillMount() {
    this.props.handleLogo();
  }

  handleClose() {
    this.setState({
      show: false,
      editId: ""
    })
  }

  returnData = data => {
    // single page of an audition's id to populate state and then show more info.
    if (data) {
      this.setState({
        editId: data.id,
        show: true,
        editType: data.editType
      })
    }
  };

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <>
            <div className="container">
              <Jumbotron>
                <h1 className="display-4">Create a new Posting</h1>
                <p className="lead">Welcome, {user.email}</p>
                <hr className="my-4" />
                <p>Click the dropdown below to post a new class, audition, performance, or rental space.</p>
                <Post
                  user={user} />
              </Jumbotron>
            </div>
            <EditPosts
              user={user}
              returnData={this.returnData}
            />
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default UsersHome;
