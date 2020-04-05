import React, { Component } from "react";
import classNames from "classnames";
import {
  Grid,
  Paper,
  Link,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core/";

import "./loginBlock.scss";
const mainClass = "loginBlock";

class LoginBlock extends Component {
  render() {
    const { className, children } = this.props;
    const classes = classNames(className, mainClass);
    return (
      <Paper elevation={1} className={classes}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h1"
                align="left"
                className={`${mainClass}__bottom_30`}
              >
                Войти
              </Typography>
              <Typography component="p" align="left" className={`${mainClass}__register`}>
                Новый пользователь?
                <Link> Зарегистрируйтесь</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                <InputLabel htmlFor="username">Имя пользователя *</InputLabel>
                <Input id="username" required />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                <InputLabel htmlFor="password">Пароль *</InputLabel>
                <Input id="password" type="password" required />
              </FormControl>
            </Grid>
            <Grid item xs={12} align="right">
              <Button type="submit" variant="contained" color="primary">
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default LoginBlock;
