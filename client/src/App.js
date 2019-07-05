import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Class from "./pages/Class";
import Performance from "./pages/Performance";
import Audition from "./pages/Audition";
import Space from "./pages/Space";
import UsersHome from "./pages/UsersHome";
import NavBar from "./components/NavBar";
import NoMatch from "./pages/NoMatch";
import AnimateHeight from "react-animate-height";
import LargeLogo from "./components/LargeLogo";
import './App.css';

class App extends Component {

  state = {
    isAuthenticated: true,
    largeLogo: true,
    userInfo: ""
  }

  handleLogo = () => {

    if (window.location.pathname !== "" || "/") {
      this.setState({ largeLogo: false })
    }
    this.handleAnimate();

  }

  handleShow = () => {
    this.setState({ largeLogo: true })
    this.handleAnimate()
  }

  handleAnimate = () => {
    if (this.state.largeLogo) {
      this.setState({ height: 'auto' })
    } else {
      this.setState({ height: 0 })
    }
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
    const { largeLogo } = this.state;

    return (
      <Router>
        <div>
          <AnimateHeight
            duration={2000}
            height={largeLogo ? 'auto' : 0}
            easing={'ease'}
          >
            <LargeLogo />
          </AnimateHeight>
          <NavBar
            isAuthed={this.state.isAuthenticated}
            tinyLogo={!this.state.largeLogo}
          />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home {...props}
                  isAuthed={this.state.isAuthenticated}
                  handleAuth={this.handleAuth}
                  handleShow={this.handleShow}
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
                      handleLogo={this.handleLogo}
                    />
                  )
              )}
            />
            <Route
              exact path="/class"
              render={(props) => (
                <Class {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact path="/audition"
              render={(props) => (
                <Audition {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact path="/performance"
              render={(props) => (
                <Performance {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact path="/space"
              render={(props) => (
                <Space {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact path="/about"
              render={(props) => (
                <About {...props}
                  handleLogo={this.handleLogo}
                />
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
                      handleLogo={this.handleLogo}
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
                    handleLogo={this.handleLogo}
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
