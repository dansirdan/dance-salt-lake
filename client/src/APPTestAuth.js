import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import Home from "./pages/Home";
import About from "./pages/About";
// import Login from "./pages/Login";
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

import ProtectedRoute from './components/ProtectedRoute'

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
      <div>
        <Router>
          <AuthProvider>
            <AnimateHeight
              duration={2000}
              height={largeLogo ? 'auto' : 0}
              easing={'ease'}
            >
              <LargeLogo />
            </AnimateHeight>
            <MainNav
              tinyLogo={!this.state.largeLogo}
            />
            <Switch>
              <ProtectedRoute
                path="/usershome"
                component={UsersHome}
                handleLogo={this.handleLogo}
              />
              <Route
                path="/"
                component={Home}
                handleLogo={this.handleLogo}
              />
              <Route
                path="/class"
                component={Class}
                handleLogo={this.handleLogo}

              />
              <Route
                path="/audition"
                component={Audition}
                handleLogo={this.handleLogo}

              />
              <Route
                path="/performance"
                component={Performance}
                handleLogo={this.handleLogo}

              />
              <Route
                path="/space"
                component={Space}
                handleLogo={this.handleLogo}

              />
              <Route
                path="/about"
                component={About}
                handleLogo={this.handleLogo}

              />
              <Route
                path="/register"
                component={Register}
                handleLogo={this.handleLogo}

              />
              <Route component={NoMatch}
                handleLogo={this.handleLogo}
              />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    )
  }
}

export default App;
