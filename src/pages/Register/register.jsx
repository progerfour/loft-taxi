import React from "react";
import classNames from "classnames";
import { Logo } from "loft-taxi-mui-theme";
import { Grid } from "@material-ui/core/";
import PropTypes from "prop-types";

import LoginBlock from "../../components/LoginBlock/index";
import "./register.scss";
const mainClass = "loginPage";

const Register = ({ className }) => {
  const classes = classNames(className);
  return (
    <div className={classes}>
      <Grid container alignItems="center" justify="center" className={mainClass}>
        <Grid item xs={3}>
          <Logo white />
        </Grid>
        <Grid item xs={3}>
          <LoginBlock isRegister />
        </Grid>
      </Grid>
    </div>
  );
};

Register.propTypes = {
  className: PropTypes.string
};

export default Register;
