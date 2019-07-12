import React, { Component } from "react";
import API from "../../utils/"
import { userInfo } from "os";
const AuthContext = React.createContext();

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

  login(userInfo) {
    let { email, password } = this.state.user;
    if (email && password) {
      API.auth("login/", userInfo)
        .then(res => {
          console.log(res);
          setTimeout(() => this.setState({ isAuth: true }))
        })
        .catch(err => {
          console.log("error")
          console.log(err)
        })
    }
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
