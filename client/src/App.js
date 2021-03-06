import React, { Component } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { AuthProvider, AuthConsumer } from './components/AuthContext'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEdit, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'


import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Class from "./pages/Class";
import Performance from "./pages/Performance";
import Audition from "./pages/Audition";
import Space from "./pages/Space";
import UsersHome from "./pages/UsersHome";
import { MainNav, Footer } from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import AnimateHeight from "react-animate-height";
import LargeLogo from "./components/LargeLogo";
import history from "./history";
import './App.css';

library.add(fab, faEdit, faCopy, faTrash)

class App extends Component {

  state = {
    largeLogo: true,
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

  render() {
    return (
      <Router history={history}>
        <AuthProvider>
          <AnimateHeight
            duration={2000}
            height={this.state.largeLogo ? 'auto' : 0}
            easing={'ease'}
          >
            <LargeLogo />
          </AnimateHeight>
          <MainNav
            tinyLogo={!this.state.largeLogo}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                (
                  <AuthConsumer>
                    {({ sessions }) => (
                      <Home {...props}
                        handleShow={this.handleShow}
                        sessions={sessions}
                      />
                    )}
                  </AuthConsumer>
                )}
            />
            <Route
              exact
              path="/class"
              render={(props) => (
                <Class {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact
              path="/audition"
              render={(props) => (
                <Audition {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact
              path="/performance"
              render={(props) => (
                <Performance {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact
              path="/space"
              render={(props) => (
                <Space {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact
              path="/about"
              render={(props) => (
                <About {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
            <Route
              exact
              path="/usershome"
              render={props => (
                <AuthConsumer>
                  {({ isAuth }) =>
                    (
                      isAuth ?
                        <UsersHome {...props} handleLogo={this.handleLogo} />
                        :
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )}
                </AuthConsumer>
              )}
            />
            <Route
              render={(props) => (
                <NoMatch {...props}
                  handleLogo={this.handleLogo}
                />
              )}
            />
          </Switch>
        </AuthProvider>
        <Footer />
      </Router>
    )
  }
}

export default App;
