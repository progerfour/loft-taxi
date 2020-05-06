import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Info from "./info";
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
  isOrder,
}) => {
  const [order, setOrder] = useState({
    begin: "",
    end: "",
    beginList: [],
    endList: [],
  });

  useEffect(() => {
    fetchAddressLoad();
  }, []);

  useEffect(() => {
    setOrder({ ...order, beginList: addressList, endList: addressList });
  }, [addressList]);

  const updateAddressList = (exclude) =>
    addressList.filter((address) => address !== exclude);

  const handlerSubmitClick = (event) => {
    event.preventDefault();
    fetchOrderLoad();
  };

  return (
    <>
      {isOrder && <Info className={`${className}`} />}
      {!isOrder && (
        <form onSubmit={handlerSubmitClick}>
          <Paper className={`${className}__paper`}>
            <Grid item xs={12} className={`${className}__input`}>
              <Autocomplete
                name="begin"
                options={order.beginList}
                onChange={(event, selected) => {
                  if (selected !== null) {
                    setOrder({
                      ...order,
                      endList: updateAddressList(selected),
                      start: selected,
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Откуда" />
                )}
              />
            </Grid>

            <Grid item xs={12} className={`${className}__input`}>
              <Autocomplete
                name="end"
                options={order.endList}
                onChange={(event, selected) => {
                  if (selected !== null) {
                    setOrder({
                      ...order,
                      beginList: updateAddressList(selected),
                      end: selected,
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Куда" />}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Вызвать такси
              </Button>
            </Grid>
          </Paper>
        </form>
      )}
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
