import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { MCIcon } from "loft-taxi-mui-theme";
import {
  Grid,
  Typography,
  Paper,
  Button,
  InputLabel,
  Input,
  Box,
  Card,
} from "@material-ui/core/";
import { DatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header";
import "./profile.scss";
import {
  getProfile,
  getError,
  getSubmitSucceded,
  fetchProfileLoad,
  fetchProfileSave,
  fetchProfileSet,
  fetchProfileSubmitSucceded,
} from "../../modules/profile";

const mainClass = "profile";

const Profile = ({
  className,
  profile,
  error,
  submitSucceded,
  fetchProfileLoad,
  fetchProfileSave,
  fetchProfileSubmitSucceded,
}) => {
  const classes = classNames(className);
  const [values, setValues] = useState({
    cardNumber: "",
    cardName: "",
    cvc: "",
  });
  const [selectedDate, handleDateChange] = useState(new Date());
  const history = useHistory();

  useEffect(() => {
    fetchProfileSubmitSucceded(false);
  }, []);

  useEffect(() => {
    if (profile) {
      setValues(profile);
      handleDateChange(profile.expiryDate);
    }
  }, [profile]);

  const handlerSubmitClick = (event) => {
    event.preventDefault();
    fetchProfileSave({ ...values, expiryDate: selectedDate });
  };

  const handlerDataInput = (inputID) => (event) => {
    setValues({ ...values, [inputID]: event.target.value });
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/map")}
                >
                  Перейти на карту
                </Button>
              </Grid>
            </Grid>
          )}
          {!submitSucceded && (
            <form onSubmit={handlerSubmitClick}>
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
                        <InputLabel htmlFor="cardNumber">
                          Номер карты
                        </InputLabel>
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={values.cardNumber}
                          onChange={handlerDataInput("cardNumber")}
                          autoFocus
                        />
                        <InputLabel htmlFor="expiryDate">
                          Срок действия
                        </InputLabel>
                        <DatePicker
                          id="expiryDate"
                          clearable
                          views={["year", "month"]}
                          format="MM/yy"
                          required
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
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
                        <InputLabel htmlFor="cardName">
                          Имя владельца
                        </InputLabel>
                        <Input
                          id="cardName"
                          type="text"
                          placeholder="Иванов Иван"
                          value={values.name}
                          onChange={handlerDataInput("cardName")}
                        />
                        <InputLabel htmlFor="cvc">CVC</InputLabel>
                        <Input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          value={values.cvc}
                          onChange={handlerDataInput("cvc")}
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
        </Paper>
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
  fetchProfileLoad,
  fetchProfileSave,
  fetchProfileSubmitSucceded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
