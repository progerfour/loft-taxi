import React from "react";
import { Grid, Paper, Button, Input, InputLabel } from "@material-ui/core";

const Order = ({ className }) => {
  return (
    <Paper className={`${className}__paper`}>
      <Grid item xs={12} className={`${className}__input`}>
        <InputLabel htmlFor="startPoint">Откуда</InputLabel>
        <Input id="startPoint" type="text" fullWidth />
      </Grid>

      <Grid item xs={12} className={`${className}__input`}>
        <InputLabel htmlFor="endPoint">Куда</InputLabel>
        <Input id="endPoint" type="text" fullWidth />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth>
          Вызвать такси
        </Button>
      </Grid>
    </Paper>
  );
};

export default Order;
