import React from "react";
import classNames from "classnames";
import { Logo } from "loft-taxi-mui-theme";
import { Grid } from "@material-ui/core/";
import PropTypes from "prop-types";

import LoginBlock from "../../components/LoginBlock/index";
import "./login.scss";
const mainClass = "loginPage";

const Login = (props) => {
  const { className, onChangePage } = props;
  const classes = classNames(className);
  return (
    <div className={classes}>
      <Grid container alignItems="center" justify="center" className={mainClass}>
        <Grid item xs={3}>
          <Logo white />
        </Grid>
        <Grid item xs={3}>
          <LoginBlock onChangePage={onChangePage} isRegister={false} />
        </Grid>
      </Grid>
    </div>
  );
};

Login.propTypes = {
  className: PropTypes.string,
  onChangePage: PropTypes.func.isRequired,
};

export default Login;
