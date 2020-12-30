import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import MapView from './MapView';

// Mock data imports
import {events} from '../mockData/event';

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

  // Will need to actually call some API method to get all the events in the end state
  // Use a separate file to control API calls
  // TODO: Paginate the event list on the right? or just load more on scroll?

  return (
    <Grid container spacing={0}>
      <Grid className={classes.mapView} item xs={9}>
        <MapView events={events}></MapView>
      </Grid>
      <Grid className={classes.listView} item xs={3}>
        <EventList events={events}/>
      </Grid>
    </Grid>
  );
}