import React, { Component } from "react";
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

import Header from "../../components/Header";
import "./profile.scss";
const mainClass = "profile";

class Profile extends Component {
  onSubmitClick = (event) => {
    event.preventDefault();
    const { onChangePage } = this.props;
    onChangePage("map");
  };

  render() {
    const { className, onChangePage } = this.props;
    const classes = classNames(className);
    return (
      <div>
        <Header onChangePage={onChangePage} />
        <Paper className={mainClass}>
          <Grid container alignItems="center" direction-xs-column>
            <Grid item xs={12}>
              <Paper className={`${mainClass}__form`}>
                <Typography variant="h4" component="h1" align="center">
                  Профиль
                </Typography>
                <Typography component="p" align="center" className={`${mainClass}__subtitle`}>
                  Способ оплаты
                </Typography>
                <form onSubmit={this.onSubmitClick}>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={4}
                        className={`${mainClass}__cards`}
                        justify="center"
                      >
                        <Grid item xs={6}  align="center">
                          <Paper elevation={3} className={`${mainClass}__card`}>
                            <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                              <InputLabel htmlFor="cardNumber">Номер карты *</InputLabel>
                              <Input id="cardNumber" required />
                            </FormControl>
                            <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                              <InputLabel htmlFor="validity">Срок действия *</InputLabel>
                              <Input id="validity" required />
                            </FormControl>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} align="center">
                          <Paper elevation={3} className={`${mainClass}__card`}>
                            <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                              <InputLabel htmlFor="fullname">Имя владельца *</InputLabel>
                              <Input id="fullname" required />
                            </FormControl>
                            <FormControl fullWidth={true} className={`${mainClass}__bottom_30`}>
                              <InputLabel htmlFor="CVS">CVS *</InputLabel>
                              <Input id="CVS" required />
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
  }
}

export default Profile;
