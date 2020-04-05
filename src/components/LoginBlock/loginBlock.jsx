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
  onSubmitClick = (event) => {
    event.preventDefault();
    const { onChangePage } = this.props;
    onChangePage("map");
  };

  changeType = () => {
    const { onChangePage, isRegister } = this.props;
    onChangePage(isRegister ? "login" : "register");
  };

  render() {
    const { className, isRegister } = this.props;
    const classes = classNames(className, mainClass);
    const header = isRegister ? "Регистрация" : "Войти";
    const question = isRegister ? "Уже зарегистрированы?" : "Новый пользователь?";
    const linkName = isRegister ? "Войти" : "Зарегистрируйтесь";
    return (
      <Paper elevation={1} className={classes}>
        <form onSubmit={this.onSubmitClick}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h1"
                align="left"
                className={`${mainClass}__bottom_30`}
              >
                {header}
              </Typography>
              <Typography component="p" align="left" className={`${mainClass}__register`}>
                {question}
                <Link onClick={this.changeType}>{linkName} </Link>
              </Typography>
            </Grid>
            {!isRegister && (
              <Grid item xs={12}>
                <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                  <InputLabel htmlFor="username">Имя пользователя *</InputLabel>
                  <Input id="username" required />
                </FormControl>
              </Grid>
            )}
            {isRegister && (
              <Grid item xs={12}>
                <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                  <InputLabel htmlFor="email">Адрес электронной почты *</InputLabel>
                  <Input id="email" required />
                </FormControl>
              </Grid>
            )}
            {isRegister && (
              <Grid item xs={6}>
                <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                  <InputLabel htmlFor="name">Имя *</InputLabel>
                  <Input id="name" required />
                </FormControl>
              </Grid>
            )}
            {isRegister && (
              <Grid item xs={6}>
                <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                  <InputLabel htmlFor="surname">Фамилия *</InputLabel>
                  <Input id="surname" required />
                </FormControl>
              </Grid>
            )}
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
