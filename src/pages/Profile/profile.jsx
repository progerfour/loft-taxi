import React, { useEffect } from "react";
import { MCIcon } from "loft-taxi-mui-theme";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  Card,
  InputLabel,
} from "@material-ui/core/";
import { DatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import formatPattern from "format-string-by-pattern";

import Header from "../../components/Header";
import ErrorMessage from "../../components/ErrorMessage";
import "./profile.scss";
import {
  getProfile,
  getError,
  getSubmitSucceded,
  fetchProfileSave,
  fetchProfileSubmitSucceded,
} from "../../modules/profile";

const mainClass = "profile";

const Profile = ({
  profile,
  error,
  submitSucceded,
  fetchProfileSave,
  fetchProfileSubmitSucceded,
}) => {
  useEffect(() => {
    fetchProfileSubmitSucceded(false);
  }, [fetchProfileSubmitSucceded]);

  const validateCardsNumber = (value) => {
    const number = value.replace(/[^\d]/g, "");
    return formatPattern("9999 9999 9999 9999", number);
  };

  const validateCVC = (value) => {
    const number = value.replace(/[^\d]/g, "");
    return formatPattern("999", number);
  };

  const handlerSubmitClick = (values) => {
    fetchProfileSave({ ...values });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.cardNumber) {
      errors.cardNumber = "Обязательное поле";
    } else if (values.cardNumber.length < 19)
      errors.cardNumber = "В номере карты 16 цифр";

    if (!values.cvc) {
      errors.cvc = "Обязательное поле";
    } else if (values.cvc.length < 3) errors.cvc = "CVC состоит из трех цифр";

    if (!values.cardName) {
      errors.cardName = "Обязательное поле";
    }

    if (!values.expiryDate) {
      errors.expiryDate = "Обязательное поле";
    }

    return errors;
  };
  return (
    <>
      <Header />
      <Grid
        container
        className={mainClass}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper className={`${mainClass}__paper`}>
          <Grid item xs={12}>
            <Typography component="header" variant="h4" align="center">
              Профиль
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" className={`${mainClass}__subtitle`}>
              Способ оплаты
            </Typography>
          </Grid>
          {submitSucceded && (
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
                <Typography>
                  Платёжные данные обновлены. Теперь вы можете заказывать такси.
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Button variant="contained" color="primary">
                  <Link to="/map">Перейти на карту</Link>
                </Button>
              </Grid>
            </Grid>
          )}
          {!submitSucceded && (
            <Form
              onSubmit={handlerSubmitClick}
              initialValues={profile}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={4}>
                      <Grid item xs={6}>
                        <Card elevation={3} className={`${mainClass}__card`}>
                          <Box
                            display="flex"
                            height="100%"
                            flexDirection="column"
                            justifyContent="space-around"
                          >
                            <MCIcon />
                            <Field
                              component={TextField}
                              name="cardNumber"
                              label="Номер карты"
                              placeholder="0000 0000 0000 0000"
                              parse={validateCardsNumber}
                              fullWidth={true}
                              required
                            />
                            <Field name="expiryDate" fullWidth={true} required>
                              {(props) => (
                                <>
                                  <InputLabel htmlFor="expiryDate">
                                    Срок действия
                                  </InputLabel>
                                  <DatePicker
                                    name={props.input.name}
                                    clearable
                                    views={["year", "month"]}
                                    format="MM/yy"
                                    required
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                  />
                                </>
                              )}
                            </Field>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card elevation={3} className={`${mainClass}__card`}>
                          <Box
                            display="flex"
                            height="100%"
                            flexDirection="column"
                            justifyContent="space-around"
                          >
                            <Field
                              component={TextField}
                              name="cardName"
                              label="Имя владельца"
                              placeholder="USER NAME"
                              fullWidth={true}
                              required
                            />
                            <Field
                              component={TextField}
                              name="cvc"
                              label="CVC"
                              placeholder="123"
                              parse={validateCVC}
                              fullWidth={true}
                              required
                            />
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                    <Grid align="center">
                      <Button
                        type="submit"
                        className={`${mainClass}__button`}
                        variant="contained"
                        size="medium"
                        color="primary"
                      >
                        Сохранить
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          )}
        </Paper>
        <ErrorMessage errorMessage={error} />
      </Grid>
    </>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  error: getError(state),
  submitSucceded: getSubmitSucceded(state),
});

const mapDispatchToProps = {
  fetchProfileSave,
  fetchProfileSubmitSucceded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
