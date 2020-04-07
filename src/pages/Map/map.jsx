import React, { Component } from "react";
import classNames from "classnames";
import mapboxgl from "mapbox-gl";

import Header from "../../components/Header";
import "./map.scss";

const mainClass = "map";

class Map extends Component {
  map = React.createRef();
  map_id = "map_order";

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2F0YW5zZGVlciIsImEiOiJjanAwOGxqYnAyc3J4M3hucmJzaWh4OTg0In0.LSKzagFIJqivwgf4VFjC4Q";
    this.mapbox = new mapboxgl.Map({
      container: this.map_id,
      style: "mapbox://styles/mapbox/light-v10",
      center: [37.61167343575062, 55.75166954492968],
      zoom: 12,
    });
  }

  componentWillUnmount() {
    this.mapbox.remove();
  }

  render() {
    const { onChangePage } = this.props;
    return (
      <div>
        <Header onChangePage={onChangePage}/>
        <div id={this.map_id} className={`${mainClass}`} ref={this.map}></div>
      </div>
    );
  }
}

export default Map;
