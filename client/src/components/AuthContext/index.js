import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import API from "../../utils/API"
const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isAuth: false,
    loggedOut: false,
    user: {}
  }

  constructor() {
    super()
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.sessions = this.sessions.bind(this)
  }

  sessions() {
    if (this.state.loggedOut) {
      console.log("LOGGED OUT");
    } else {
      console.log("this ran")
      API.user()
        .then(dbUser => {
          // console.log(dbUser.data)
          if (!dbUser.data.email || !dbUser.data.id) {
            console.log("No sessions user");
          } else {
            this.setState({ isAuth: true, user: dbUser.data })
          }
        })
        .catch(err => {
          console.log("error", err)
        })
    }
  }

  login(user, cb) {

    API.auth("login", user)
      .then(res => {
        // console.log(res);
        API.user()
          .then(dbUser => {
            // console.log(dbUser.data)
            this.setState({ isAuth: true, loggedOut: false, user: dbUser.data })
            cb()
            // return (
            //   <Redirect to="/usershome"></Redirect>
            // )
          })
          .catch(err => {
            console.log("error", err)
          })
      })
      .catch(err => {
        console.log("error", err)
      })

  }

  logout() {

    API.user()
      .then((res, req) => {
        // console.log(res)
        this.setState({
          isAuth: false,
          loggedOut: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          sessions: this.sessions
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
