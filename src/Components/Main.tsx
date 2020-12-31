import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import MapView from './MapView';

// Mock data imports
import { events } from '../mockData/event';
import { LatLngBounds } from 'leaflet';
import { event } from '../types';

const useStyles = makeStyles((theme) => ({
  mapView: {
    height: "100vh"
  },
  listView: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    overflowY: "scroll",
  },
}));

// need to define an interface for the props if we use it
export default function Main() {
  const classes = useStyles();
  const [currentEvents, setCurrentEvents] = useState(events.slice(0, 5));

  const getEvents = (bounds: LatLngBounds) => {
    // TODO: later on this will be an API call to get events that will be handled on the backend.
    // For now I'll do a little logic on the frontend to simulate that
    // It will just show the first 5 events in the area
    let newEvents: event[] = [];
    events.forEach((e) => {
      if (e.location.latitude > bounds.getSouthWest().lat
          && e.location.latitude < bounds.getNorthEast().lat
          && e.location.longitude > bounds.getSouthWest().lng
          && e.location.longitude < bounds.getNorthEast().lng) {
        newEvents.push(e);
      }
    });
    // Set the state here so it will be updated in the children (only first 5)
    setCurrentEvents(newEvents.slice(0, 5));
  }

  // Will need to actually call some API method to get all the events in the end state
  // Use a separate file to control API calls
  // TODO: Paginate the event list on the right? or just load more on scroll?

  return (
    <Grid container spacing={0}>
      <Grid className={classes.mapView} item xs={9}>
        <MapView events={currentEvents} getEvents={getEvents}></MapView>
      </Grid>
      <Grid className={classes.listView} item xs={3}>
        <EventList events={currentEvents}/>
      </Grid>
    </Grid>
  );
}