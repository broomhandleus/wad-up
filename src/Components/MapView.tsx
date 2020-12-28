import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { event } from '../types';
import { Layer, LeafletMouseEventHandlerFn } from 'leaflet';
import { Feature, Geometry } from 'geojson';

const state_outlines = require("../mapData/state_outlines");

const useStyles = makeStyles((theme) => ({
  mapView: {
    height: "100vh"
  },
  states: {
    fillColor: "green"
  }
}));

// need to define an interface for the props if we use it
interface props {
  events: event[];
}

export default function MapView(props: props) {
  const classes = useStyles();
  const events = props.events;
  const [center, setCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [zoomLevel, setZoomLevel] = useState(5);

  const eventMarkers = events.map((e) =>
    <Marker key={e._id} position={[e.location.latitude, e.location.longitude]} riseOnHover={true}>
      <Popup>
        {e.name}
      </Popup>
    </Marker>
  )

  // Adds the ability to zoom to each state area when clicked
  const zoomToFeature: LeafletMouseEventHandlerFn = (e) => {
    const newCenterLat: number = (e.target._bounds._southWest.lat + e.target._bounds._northEast.lat) / 2;
    const newCenterLong: number = (e.target._bounds._southWest.lng + e.target._bounds._northEast.lng) / 2;
    console.log("New Center: " + newCenterLat + ", " + newCenterLong);
    setCenter([newCenterLat, newCenterLong]);
    setZoomLevel(7);
    console.log("Center: " + center);
    console.log("Zoom: " + zoomLevel);
  }
  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on({
      click: zoomToFeature
    });
  }

  // TODO: use the Marker/Popup elements from react-leaflet to show events!
  // TODO: set color of the marker based on the event category like we did with the card border
  // TODO: implement the "set default" function so a user can set their preferred start area
  // Using the tile layer from open street maps as dictated in the react-leaflet docs
  return (
    <MapContainer
      className={classes.mapView}
      center={center}
      zoom={zoomLevel}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={state_outlines} onEachFeature={onEachFeature}></GeoJSON>
      {eventMarkers}
    </MapContainer>
  );
}