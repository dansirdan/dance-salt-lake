import React, { Component } from "react";
const AuthContext = React.createContext()

class AuthProvider extends Component {
  state = { isAuth: false }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.login = this.login.bind(this)
  }

  login() {
    setTimeout(() => this.setState({ isAuth: true }))
  }

  logout() {
    this.setState({ isAuth: false })
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
