import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Header from "../../components/Header";
import "./map.scss";
import FillData from "./fillData";
import Order from "./order";
import Info from "./info";
import { drawRoute } from "./drawRoute";
import {
  getRoute,
  getIsOrder,
  fetchIsOrder,
  fetchOrderClear,
  getIsFillProfile,
} from "../../modules/route";

const mainClass = "mapPage";
let map = null;

const Map = ({
  isFillProfile,
  route,
  isOrder,
  fetchIsOrder,
  fetchOrderClear,
}) => {
  const map_id = "map_order";
  const mapContainer = React.createRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2F0YW5zZGVlciIsImEiOiJjanAwOGxqYnAyc3J4M3hucmJzaWh4OTg0In0.LSKzagFIJqivwgf4VFjC4Q";
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [30.2656504, 59.8029126],
      zoom: 12,
    });
    if (route.length) {
      map.on("load", () => drawRoute(map, route));
    }
    return () => {
      map.remove();
      map = null;
    };
  }, []);

  useEffect(() => {
    if (route.length && map.loaded()) drawRoute(map, route);
  }, [route]);

  const handlerNewOrder = () => {
    fetchIsOrder(false);
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
    fetchOrderClear();
  };

  return (
    <div className={`${mainClass}`}>
      <Header />
      <Grid container>
        {!isFillProfile && !isOrder && <FillData className={`${mainClass}`} />}
        {isFillProfile && !isOrder && <Order className={`${mainClass}`} />}
        {isFillProfile && isOrder && (
          <Info className={`${mainClass}`} handlerNewOrder={handlerNewOrder} />
        )}
        <div
          id={map_id}
          className={`${mainClass}__map`}
          ref={mapContainer}
        ></div>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFillProfile: getIsFillProfile(state),
  route: getRoute(state),
  isOrder: getIsOrder(state),
});

const mapDispatchToProps = {
  fetchIsOrder,
  fetchOrderClear,
};

Map.propTypes = {
  isFillProfile: PropTypes.bool,
  route: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
