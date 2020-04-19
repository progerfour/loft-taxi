import React, { Component } from "react";

export const AuthContext = React.createContext({});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  login = (email, password) => {
    this.setState({ isLoggedIn: !!email && !!password });
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          logout: this.logout,
          login: this.login,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
