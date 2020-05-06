import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  getAddress,
  fetchAddressLoad,
  getIsOrder,
  fetchOrderLoad,
} from "../../modules/route";

const Order = ({
  className,
  addressList,
  fetchAddressLoad,
  fetchOrderLoad,
}) => {
  const [order, setOrder] = useState({
    begin: "",
    end: "",
    beginList: [],
    endList: [],
  });

  useEffect(() => {
    fetchAddressLoad();
  }, [fetchAddressLoad]);

  useEffect(() => {
    setOrder((order) => ({
      ...order,
      beginList: addressList,
      endList: addressList,
    }));
  }, [addressList]);

  const updateAddressList = (exclude) =>
    addressList.filter((address) => address !== exclude);

  const handlerSubmitClick = (event) => {
    event.preventDefault();
    if (order.begin && order.end)
      fetchOrderLoad({ address1: order.begin, address2: order.end });
  };

  return (
    <>
      <form onSubmit={handlerSubmitClick}>
        <Paper className={`${className}__paper`}>
          <Grid item xs={12} className={`${className}__input`}>
            <Autocomplete
              name="begin"
              options={order.beginList}
              onChange={(event, selected) => {
                setOrder({
                  ...order,
                  endList: updateAddressList(selected),
                  begin: selected,
                });
              }}
              renderInput={(params) => <TextField {...params} label="Откуда" />}
            />
          </Grid>

          <Grid item xs={12} className={`${className}__input`}>
            <Autocomplete
              name="end"
              options={order.endList}
              onChange={(event, selected) => {
                setOrder({
                  ...order,
                  beginList: updateAddressList(selected),
                  end: selected,
                });
              }}
              renderInput={(params) => <TextField {...params} label="Куда" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Вызвать такси
            </Button>
          </Grid>
        </Paper>
      </form>
      )
    </>
  );
};

const mapStateToProps = (state) => ({
  addressList: getAddress(state),
  isOrder: getIsOrder(state),
});

const mapDispatchToProps = {
  fetchAddressLoad,
  fetchOrderLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
