import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { event } from '../types';
import MapDetails from './MapDetails';

const state_outlines = require("../mapData/state_outlines");

const useStyles = makeStyles((theme) => ({
  // Calculated height with padding/height of the toolbar in mind. Probably will change later
  mapView: {
    height: "calc(100vh - 72px)"
  },
  states: {
    fillColor: "green"
  }
}));

// need to define an interface for the props if we use it
interface props {
  events: event[];
  getEvents: Function;
}

export default function MapView(props: props) {
  const classes = useStyles();
  const events = props.events;
  const getEvents = props.getEvents;
  // TODO: set the starting zoom to the defaults of the user if it exists
  const [center] = useState<[number, number]>([39.8283, -98.5795]);
  const [zoomLevel] = useState(5);

  const eventMarkers = events.map((e) =>
    <Marker key={e._id} position={[e.location.latitude, e.location.longitude]} riseOnHover={true}>
      <Popup>
        {e.name}
      </Popup>
    </Marker>
  )

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
      <MapDetails
        states={state_outlines}
        eventMarkers={eventMarkers}
        getEvents={getEvents}
      />
    </MapContainer>
  );
}