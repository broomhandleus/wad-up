import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import {event} from '../types';

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
  let current_center: any = [39.8283, -98.5795]; // had to use any type here? gotta be a smarter way
  let zoomLevel: number = 5;

  const eventMarkers = events.map((e) =>
    <Marker key={e._id} position={[e.location.latitude, e.location.longitude]} riseOnHover={true}>
      <Popup>
        {e.name}
      </Popup>
    </Marker>
  )

  const zoomToFeature = (feature: any) => {
    console.log("Clicked on feature: " + JSON.stringify(feature.properties.NAME));
  }

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: zoomToFeature(feature)
    });
  }

  // TODO: use the Marker/Popup elements from react-leaflet to show events!
  // TODO: implement the "set default" function so a user can set their preferred start area
  // Using the tile layer from open street maps as dictated in the react-leaflet docs
  return (
    <MapContainer
      className={classes.mapView}
      center={current_center}
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