import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIsLogin } from "../../modules/auth";

const PrivateRoute = ({
  component: RouteComponent,
  isLogin,
  loginPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={(routeProps) =>
      isLogin ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={loginPath} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isLogin: getIsLogin(state),
});

export default connect(mapStateToProps)(PrivateRoute);
