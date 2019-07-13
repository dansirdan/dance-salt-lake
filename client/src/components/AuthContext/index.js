import React, { Component } from "react";
import API from "../../utils/API"
const AuthContext = React.createContext();
const axios = require("axios");

class AuthProvider extends Component {
  state = {
    isAuth: false,
    user: {}
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.login = this.login.bind(this)
  }

  login(user) {

    API.auth("login", user)
      .then(res => {
        console.log(res);
        API.user()
          .then(dbUser => {
            console.log(dbUser.data)
            setTimeout(() => this.setState({ isAuth: true, user: dbUser.data }), 1000)
          })
      })
      .catch(err => {
        console.log("error")
        console.log(err)
      })

  }

  logout() {
    this.setState({
      isAuth: false,
      user: {}
    })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
