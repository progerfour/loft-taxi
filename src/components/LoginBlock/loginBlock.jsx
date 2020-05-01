import React, { useState } from "react";
import classNames from "classnames";
import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core/";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getIsLogin, getError, fetchAuthLogin, fetchAuthRegister } from "../../modules/auth";

import { connect } from "react-redux";

import "./loginBlock.scss";
const mainClass = "loginBlock";

const LoginBlock = (props) => {
  const { isRegister, fetchAuthLogin, fetchAuthRegister } = props;
  const className = classNames(mainClass, props.className);
  const header = isRegister ? "Регистрация" : "Войти";
  const question = isRegister
    ? "Уже зарегистрированы?"
    : "Новый пользователь?";
  const linkName = isRegister ? "Войти" : "Зарегистрируйтесь";

  const [values, setValues] = useState({  
    email: "",
    password: "",
    name: "",
    surname:""
  });

  const handlerSubmitClick = (event) => {
    event.preventDefault();
    isRegister 
    ? fetchAuthRegister(values)
    : fetchAuthLogin({ email: values.email, password: values.password });
  };

  const handlerDataInput = (inputID) => (event) => {
    setValues({ ...values, [inputID]: event.target.value });
  };
  return (
    <Paper elevation={1} className={className}>
      <form onSubmit={handlerSubmitClick}>
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
            <Typography
              component="p"
              align="left"
              className={`${mainClass}__register`}
            >
              {question}
              <Link to={`/${isRegister ? "login" : "register"}`}>
                {linkName}
              </Link>
            </Typography>
          </Grid>
          {!props.isRegister && (
            <Grid item xs={12}>
              <FormControl
                fullWidth={true}
                className={`${mainClass}__bottom_30`}
              >
                <InputLabel htmlFor="username">Имя пользователя *</InputLabel>
                <Input
                  id="email"
                  onChange={handlerDataInput("email")}
                  required
                />
              </FormControl>
            </Grid>
          )}
          {props.isRegister && (
            <Grid item xs={12}>
              <FormControl
                fullWidth={true}
                className={`${mainClass}__bottom_30`}
              >
                <InputLabel htmlFor="email">
                  Адрес электронной почты *
                </InputLabel>
                <Input
                  id="email"
                  onChange={handlerDataInput("email")}
                  required
                />
              </FormControl>
            </Grid>
          )}
          {props.isRegister && (
            <Grid item xs={6}>
              <FormControl
                fullWidth={true}
                className={`${mainClass}__bottom_30`}
              >
                <InputLabel htmlFor="name">Имя *</InputLabel>
                <Input id="name" onChange={handlerDataInput("name")} required />
              </FormControl>
            </Grid>
          )}
          {props.isRegister && (
            <Grid item xs={6}>
              <FormControl
                fullWidth={true}
                className={`${mainClass}__bottom_30`}
              >
                <InputLabel htmlFor="surname">Фамилия *</InputLabel>
                <Input id="surname" onChange={handlerDataInput("surname")} required />
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
              <InputLabel htmlFor="password">Пароль *</InputLabel>
              <Input
                id="password"
                type="password"
                onChange={handlerDataInput("password")}
                required
              />
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
};

LoginBlock.propTypes = {
  className: PropTypes.string,
  isRegister: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogin: getIsLogin(state),
  error: getError(state),
});
const mapDispatchToProps = { fetchAuthLogin, fetchAuthRegister };

export default connect(mapStateToProps, mapDispatchToProps)(LoginBlock);
