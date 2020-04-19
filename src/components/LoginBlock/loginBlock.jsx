import React, { useContext, useState } from "react";
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
import PropTypes from "prop-types";

import { AuthContext } from "../../context/authContext";
import "./loginBlock.scss";
const mainClass = "loginBlock";

const LoginBlock = (props) => {
  const { login } = useContext(AuthContext);
  const className = classNames(mainClass, props.className);
  const header = props.isRegister ? "Регистрация" : "Войти";
  const question = props.isRegister ? "Уже зарегистрированы?" : "Новый пользователь?";
  const linkName = props.isRegister ? "Войти" : "Зарегистрируйтесь";

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handlerSubmitClick = (event) => {
    event.preventDefault();
    login(values.username, values.password);
  };

  const changeType = () => {
    const { onChangePage, isRegister } = props;
    typeof onChangePage == "function" && onChangePage(isRegister ? "login" : "register");
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
            <Typography component="p" align="left" className={`${mainClass}__register`}>
              {question}
              <Link onClick={changeType}>{linkName} </Link>
            </Typography>
          </Grid>
          {!props.isRegister && (
            <Grid item xs={12}>
              <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                <InputLabel htmlFor="username">Имя пользователя *</InputLabel>
                <Input id="username" onChange={handlerDataInput("username")} required />
              </FormControl>
            </Grid>
          )}
          {props.isRegister && (
            <Grid item xs={12}>
              <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                <InputLabel htmlFor="email">Адрес электронной почты *</InputLabel>
                <Input id="email" onChange={handlerDataInput("username")} required />
              </FormControl>
            </Grid>
          )}
          {props.isRegister && (
            <Grid item xs={6}>
              <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                <InputLabel htmlFor="name">Имя *</InputLabel>
                <Input id="name" required />
              </FormControl>
            </Grid>
          )}
          {props.isRegister && (
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
  onChangePage: PropTypes.func.isRequired,
};

export default LoginBlock;
