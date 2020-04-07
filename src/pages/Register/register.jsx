import React, { Component } from "react";
import classNames from "classnames";
import { Logo } from "loft-taxi-mui-theme";
import { Grid } from "@material-ui/core/";

import LoginBlock from "../../components/LoginBlock/index";
import "./register.scss";
const mainClass = "loginPage";

class Register extends Component {

  render() {
    const { className, onChangePage } = this.props;
    const classes = classNames(className);
    return (
      <div className={classes}>
        <Grid container alignItems="center" justify="center" className={mainClass}>
          <Grid item xs={3}>
            <Logo white />
          </Grid>
          <Grid item xs={3}>
            <LoginBlock onChangePage={onChangePage} isRegister />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Register;
