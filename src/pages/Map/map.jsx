import React, { Component } from "react";
import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Header from "../../components/Header";
import "./map.scss";
import FillData from "./fillData";
import Info from "./info";
import Order from "./order";
import {
  getIsFillProfile,
  getAddress,
  fetchAddressLoad,
} from "../../modules/route";

const mainClass = "mapPage";

class Map extends Component {
  map = null;
  map_id = "map_order";
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2F0YW5zZGVlciIsImEiOiJjanAwOGxqYnAyc3J4M3hucmJzaWh4OTg0In0.LSKzagFIJqivwgf4VFjC4Q";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [37.61167343575062, 55.75166954492968],
      zoom: 12,
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const { addressList, isFillProfile, fetchAddressLoad } = this.props;
    return (
      <div className={`${mainClass}`}>
        <Header />
        <Grid container>
          {isFillProfile && <Order className={`${mainClass}`} />}
          {!isFillProfile && <FillData className={`${mainClass}`} />}
          <div
            id={this.map_id}
            className={`${mainClass}__map`}
            ref={this.mapContainer}
          ></div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFillProfile: getIsFillProfile(state),
  addressList: getAddress(state),
});

const mapDispatchToProps = {
  fetchAddressLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
