import React, { Component } from 'react';
import { Jumbotron } from "../components/Sections";
import Post from "../components/Post";
import EditPosts from "../components/EditPosts";
import EditModal from "../components/EditModal";
import CopyModal from "../components/CopyModal";
import { AuthConsumer } from '../components/AuthContext';
import API from '../utils/API';

class UsersHome extends Component {
  constructor(props, context) {
    super(props, context);

    this.returnData = this.returnData.bind(this);
    this.copyData = this.copyData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateCopyTable = this.updateCopyTable.bind(this);

    this.state = {
      performances: [],
      show: false,
      copyShow: false,
      date: new Date(),
      editId: "",
      editType: "",
      modalData: {},
      copyData: []
    }
  }

  componentWillMount() {
    this.props.handleLogo();
  }

  handleClose() {
    this.setState({
      show: false,
      copyShow: false,
      editId: "",
      modalData: {},
      copyData: []
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

  copyData = (data) => {
    // pushes the data into an array to be used by a Table .map function on CopyTable

    API.getSinglePost(data.editType, data.id)
      .then(res => {
        console.log(res);
        console.log(res.data)
        this.setState({
          copyShow: true,
          editType: data.editType,
          copyData: [...this.state.copyData, res.data],
          modalData: res.data
        })

      })
      .catch(err => console.log(err))
  };

  updateCopyTable = (data) => {
    // updates the array and displays the newly copied event within the table while the user is still editing

    API.getSinglePost(data.editType, data.id)
      .then(res => {
        console.log(res.data)
        this.setState({
          copyData: [...this.state.copyData, res.data]
        })

      })
      .catch(err => console.log(err))
  };

  deleteData = (data) => {
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
              copyData={this.copyData}
              deleteData={this.deleteData}
            />
            <EditModal
              show={this.state.show}
              onHide={this.handleClose}
              modalData={this.state.modalData}
              editType={this.state.editType}
            />
            <CopyModal
              user={user}
              show={this.state.copyShow}
              onHide={this.handleClose}
              copyData={this.state.copyData}
              editType={this.state.editType}
              eventData={this.state.modalData}
              updateCopyTable={this.updateCopyTable}
            />
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default UsersHome;
