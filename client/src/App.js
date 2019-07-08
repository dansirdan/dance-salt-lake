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
import MainNav from "./components/MainNav";
import NoMatch from "./pages/NoMatch";
import AnimateHeight from "react-animate-height";
import LargeLogo from "./components/LargeLogo";
import './App.css';

class App extends Component {

  // declaring state
  state = {
    isAuthenticated: false,
    largeLogo: true,
    userInfo: ""
  }

  // function for toggling the Large Logo on/off
  handleLogo = () => {
    if (window.location.pathname !== "" || "/") {
      this.setState({ largeLogo: false })
    }
    this.handleAnimate();
  }

  // function to toggle Large Logo on and handle animate
  handleShow = () => {
    this.setState({ largeLogo: true })
    this.handleAnimate()
  }

  // function to create height animate with npm react package
  handleAnimate = () => {
    if (this.state.largeLogo) {
      this.setState({ height: 'auto' })
    } else {
      this.setState({ height: 0 })
    }
  }

  // function to save logged in user data
  // TO DO:
  // 1. id first
  // 2. test
  // 3. name, email, etc 
  handleAuth = (bool, emailUser) => {
    this.setState({
      isAuthenticated: bool,
      userInfo: emailUser
    })
  }

  // function to set state to auth: false
  handleLogout = (event) => {
    event.preventDefault();
    this.setState({
      isAuthenticated: false,
      userInfo: ""
    })
  }

  // render function
  render() {
    const {
      largeLogo,
      isAuthenticated,
      userInfo
    } = this.state;

    return (
      <Router>
        <>
          <AnimateHeight
            duration={2000}
            height={largeLogo ? 'auto' : 0}
            easing={'ease'}
          >
            <LargeLogo />
          </AnimateHeight>
          <MainNav
            isAuthed={isAuthenticated}
            tinyLogo={!this.state.largeLogo}
          />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home {...props}
                  isAuthed={isAuthenticated}
                  handleAuth={this.handleAuth}
                  handleShow={this.handleShow}
                />
              )}
            />
            <Route
              exact path="/login"
              render={(props) => (
                isAuthenticated ? (
                  <Redirect to="/usershome" />
                ) : (
                    <Login {...props}
                      isAuthed={isAuthenticated}
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
                isAuthenticated ? (
                  <Redirect to="/usershome" />
                ) : (
                    <Register {...props}
                      isAuthed={isAuthenticated}
                      handleAuth={this.handleAuth}
                      handleLogo={this.handleLogo}
                    />
                  )
              )}
            />
            <Route
              exact path="/usershome"
              render={(props) => (
                isAuthenticated ? (
                  <UsersHome {...props}
                    userInfo={userInfo}
                    isAuthed={isAuthenticated}
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
        </>
      </Router>
    );
  }
}

export default App;
