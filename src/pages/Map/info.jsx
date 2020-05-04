import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

const Info = ({ className }) => {
  return (
    <Paper className={`${className}__paper`}>
      <Grid item xs={12}>
        <Typography
          className={`${className}__header`}
          component="h1"
          variant="h4"
          align="left"
        >
          Заказ размещён
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={`${className}__text`}>
          Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth>
          Сделать новый заказ
        </Button>
      </Grid>
    </Paper>
  );
};

export default Info;
