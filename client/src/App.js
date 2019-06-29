import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // withRouter
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersHome from "./pages/UsersHome";
import NavBar from "./components/NavBar";
import NoMatch from "./pages/NoMatch";
import './App.css';

class App extends Component {

  state = {
    isAuthenticated: false,
    userInfo: ""
  }

  handleAuth = (bool, emailUser) => {
    this.setState({
      isAuthenticated: bool,
      userInfo: emailUser
    })
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.setState({
      isAuthenticated: false,
      userInfo: ""
    })
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar
            isAuthed={this.state.isAuthenticated}
          />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home {...props}
                  isAuthed={this.state.isAuthenticated}
                  handleAuth={this.handleAuth}
                />
              )}
            />
            <Route
              exact path="/login"
              render={(props) => (
                this.state.isAuthenticated ? (
                  <Redirect to="/usershome" />
                ) : (
                    <Login {...props}
                      isAuthed={this.state.isAuthenticated}
                      handleAuth={this.handleAuth}
                    />
                  )
              )}
            />
            <Route
              exact path="/register"
              render={(props) => (
                this.state.isAuthenticated ? (
                  <Redirect to="/usershome" />
                ) : (
                    <Register {...props}
                      isAuthed={this.state.isAuthenticated}
                      handleAuth={this.handleAuth}
                    />
                  )
              )}
            />
            <Route
              exact path="/usershome"
              render={(props) => (
                this.state.isAuthenticated ? (
                  <UsersHome {...props}
                    userInfo={this.state.userInfo}
                    isAuthed={this.state.isAuthenticated}
                    handleAuth={this.handleAuth}
                    onClick={this.handleLogout}
                  />
                ) : (
                    <Redirect to="/login" />
                  )
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
