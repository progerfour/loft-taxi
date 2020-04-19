import React, { Component } from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext({});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

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
