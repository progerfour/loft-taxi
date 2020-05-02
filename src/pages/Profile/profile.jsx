import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { MCIcon } from "loft-taxi-mui-theme";
import {
  Grid,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core/";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "../../components/Header";
import "./profile.scss";
import {
  getProfile,
  getError,
  fetchProfileLoad,
  fetchProfileSave,
  fetchProfileSet,
} from "../../modules/profile";

const mainClass = "profile";

const Profile = ({
  className,
  profile,
  error,
  fetchProfileLoad,
  fetchProfileSave,
}) => {
  const classes = classNames(className);
  const [values, setValues] = useState({
    cardNumber: "",
    expiryDate: "",
    cardName: "",
    cvc: "",
  });

  useEffect(() => {
    setValues(profile);
  }, [profile]);

  const handlerSubmitClick = (event) => {
    event.preventDefault();
    fetchProfileSave(values);
  };

  const handlerDataInput = (inputID) => (event) => {
    setValues({ ...values, [inputID]: event.target.value });
  };

  return (
    <div className={classes}>
      <Header />
      <Paper className={mainClass}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Paper className={`${mainClass}__form`}>
              <Typography variant="h4" component="h1" align="center">
                Профиль
              </Typography>
              <Typography
                component="p"
                align="center"
                className={`${mainClass}__subtitle`}
              >
                Способ оплаты
              </Typography>
              <form onSubmit={handlerSubmitClick}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Grid
                      container
                      spacing={4}
                      className={`${mainClass}__cards`}
                      justify="center"
                    >
                      <Grid item xs={6} align="center">
                        <Paper elevation={3} className={`${mainClass}__card`}>
                          <FormControl
                            fullWidth={true}
                            className={`${mainClass}__bottom_30`}
                          >
                            <InputLabel htmlFor="cardNumber">
                              Номер карты *
                            </InputLabel>
                            <Input
                              id="cardNumber"
                              value={values.cardNumber}
                              onChange={handlerDataInput("cardNumber")}
                              required
                            />
                          </FormControl>
                          <FormControl
                            fullWidth={true}
                            className={`${mainClass}__bottom_30`}
                          >
                            <InputLabel htmlFor="expiryDate">
                              Срок действия *
                            </InputLabel>
                            <Input
                              id="expiryDate"
                              value={values.expiryDate}
                              onChange={handlerDataInput("expiryDate")}
                              required
                            />
                          </FormControl>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} align="center">
                        <Paper elevation={3} className={`${mainClass}__card`}>
                          <FormControl
                            fullWidth={true}
                            className={`${mainClass}__bottom_30`}
                          >
                            <InputLabel htmlFor="cardName">
                              Имя владельца *
                            </InputLabel>
                            <Input
                              id="cardName"
                              value={values.cardName}
                              onChange={handlerDataInput("cardName")}
                              required
                            />
                          </FormControl>
                          <FormControl
                            fullWidth={true}
                            className={`${mainClass}__bottom_30`}
                          >
                            <InputLabel htmlFor="cvc">CVC *</InputLabel>
                            <Input
                              id="cvc"
                              value={values.cvc}
                              onChange={handlerDataInput("cvc")}
                              required
                            />
                          </FormControl>
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid align="center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={`${mainClass}__btnSave`}
                      >
                        Сохранить
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  error: getError(state),
});

const mapDispatchToProps = {
  fetchProfileLoad,
  fetchProfileSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
