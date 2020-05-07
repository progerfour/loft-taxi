import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

const FillData = ({ className }) => {
  return (
    <Paper className={`${className}__paper`}>
      <Grid item xs={12}>
        <Typography
          className={`${className}__header`}
          component="h1"
          variant="h4"
          align="left"
        >
          Заполните платежные данные
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={`${className}__text`}>
          Укажите информацию о банковской карте, чтобы сделать заказ.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" size="medium" color="primary">
          <Link to="/profile">Перейти в профиль</Link>
        </Button>
      </Grid>
    </Paper>
  );
};

export default FillData;
