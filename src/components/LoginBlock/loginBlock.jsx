import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Grid, Paper, Typography, Button } from "@material-ui/core/";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";

import "./loginBlock.scss";
import {
  getIsLogin,
  getError,
  fetchAuthLogin,
  fetchAuthRegister,
} from "../../modules/auth";
import ErrorMessage from "../ErrorMessage";

const mainClass = "loginBlock";

const LoginBlock = (props) => {
  const {
    isRegister,
    fetchAuthLogin,
    fetchAuthRegister,
    isLogin,
    error,
  } = props;
  const className = classNames(mainClass, props.className);
  const header = isRegister ? "Регистрация" : "Войти";
  const question = isRegister ? "Уже зарегистрированы?" : "Новый пользователь?";
  const linkName = isRegister ? "Войти" : "Зарегистрируйтесь";
  const history = useHistory();

  useEffect(() => {
    if (isLogin) history.push("/map");
  }, [isLogin]);

  const handlerSubmitClick = (values) => {
    isRegister
      ? fetchAuthRegister(values)
      : fetchAuthLogin({ email: values.email, password: values.password });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Обязательное поле";
    } else if (!validateEmail(values.email)) {
      errors.email = "Неверный email";
    }
    if (!values.password) {
      errors.password = "Обязательное поле";
    }
    if (isRegister) {
      if (!values.name) {
        errors.name = "Обязательное поле";
      }
      if (!values.surname) {
        errors.surname = "Обязательное поле";
      }
    }
    return errors;
  };

  return (
    <Paper elevation={1} className={className}>
      <Form
        onSubmit={handlerSubmitClick}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
              <Grid item xs={12}>
                <Field
                  name="email"
                  label={
                    isRegister ? "Адрес электронной почты" : "Имя пользователя"
                  }
                  fullWidth={true}
                  component={TextField}
                  required
                />
              </Grid>
              {props.isRegister && (
                <Grid item xs={6}>
                  <Field
                    name="name"
                    label="Имя"
                    fullWidth={true}
                    component={TextField}
                    required
                  />
                </Grid>
              )}
              {props.isRegister && (
                <Grid item xs={6}>
                  <Field
                    name="surname"
                    label="Фамилия"
                    fullWidth={true}
                    component={TextField}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="password"
                  label="Пароль"
                  type="password"
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12} align="right">
                <Button type="submit" variant="contained" color="primary">
                  Войти
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <ErrorMessage errorMessage={error} />
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
