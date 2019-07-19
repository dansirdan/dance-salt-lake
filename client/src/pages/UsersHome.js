import React, { Component } from 'react';
import { Jumbotron } from "../components/Sections";
import Post from "../components/Post";
import EditPosts from "../components/EditPosts";
import EditModal from "../components/EditModal";
import { AuthConsumer } from '../components/AuthContext';
import API from '../utils/API';

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
      editType: "",
      modalData: {}
    }
  }

  componentWillMount() {
    this.props.handleLogo();
  }

  handleClose() {
    this.setState({
      show: false,
      editId: "",
      modalData: {}
    })
  }

  returnData = (data) => {
    // single page of an audition's id to populate state and then show more info.

    API.getSinglePost(data.editType, data.id)
      .then(res => {
        console.log(res);
        console.log(res.data)
        this.setState({
          show: true,
          editType: data.editType,
          modalData: res.data
        })

      })
      .catch(err => console.log(err))
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
            <EditModal
              show={this.state.show}
              onHide={this.handleClose}
              modalData={this.state.modalData}
              editType={this.state.editType}
            />
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default UsersHome;
