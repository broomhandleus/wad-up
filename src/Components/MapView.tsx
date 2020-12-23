import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {event} from '../types';

const useStyles = makeStyles((theme) => ({
  mapView: {
    height: "100vh"
  },
}));

// need to define an interface for the props if we use it
interface props {
  events: event[];
}

export default function MapView(props: props) {
  const classes = useStyles();
  const events = props.events;

  const eventMarkers = events.map((e) =>
    <Marker position={[e.location.latitude, e.location.longitude]}>
      <Popup>
        {e.name}
      </Popup>
    </Marker>
  )

  // TODO: use the Marker/Popup elements from react-leaflet to show events!

  // Using the tile layer from open street maps as dictated in the react-leaflet docs
  return (
    <MapContainer
      className={classes.mapView}
      center={[39.8283, -98.5795]}
      zoom={5}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {eventMarkers}
    </MapContainer>
  );
}