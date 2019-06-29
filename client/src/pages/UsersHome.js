import React, { Component } from 'react';
import Jumbotron from "../components/Jumbotron"
import { LogoutBtn } from "../components/Form";

class UsersHome extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-4">Congratulations!</h1>
          <p className="lead">Welcome, {this.props.userInfo}</p>
          <hr className="my-4" />
          <p> If you arrived at this screen then you have successfully logged into this demo react-node-passport-sequlize-GASP-sessions-bcrypt Boilerplate!</p>
          <LogoutBtn
            onClick={this.props.onClick}
          >
            Logout
          </LogoutBtn>
        </Jumbotron>
      </div>
    );
  }
}

export default UsersHome;
