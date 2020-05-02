import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIsLogin } from "../../modules/auth";
import { getProfile, fetchProfileLoad } from "../../modules/profile";

const PrivateRoute = ({
  component: RouteComponent,
  isLogin,
  loginPath,
  profile,
  fetchProfileLoad,
  ...rest
}) => {
  if (isLogin && !profile) fetchProfileLoad();
  return (
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
};

const mapStateToProps = (state) => ({
  isLogin: getIsLogin(state),
  profile: getProfile(state),
});

const mapDispatchToProps = {
  fetchProfileLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
