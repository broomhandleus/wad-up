import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';

// Mock data imports
import {events} from '../mockData/event';

const useStyles = makeStyles((theme) => ({
  mapView: {
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  listView: {
    display: "flex",
    justifyContent: "center",
    height: "100vh"
  },
}));

// need to define an interface for the props if we use it
export default function Main() {
  const classes = useStyles();

  // Will need to actually call some API method to get all the events in the end state
  // TODO: Paginate the event list on the left? or just load more on scroll?

  return (
    <Grid container spacing={0}>
      <Grid className={classes.mapView} item xs={9}>
        <div>Map view!</div>
      </Grid>
      <Grid className={classes.listView} item xs={3}>
        <EventList events={events}/>
      </Grid>
    </Grid>
  );
}