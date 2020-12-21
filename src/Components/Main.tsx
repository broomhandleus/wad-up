import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
}));

export default function Main() {
  const classes = useStyles();

  // Will need to actually call some API method to get all the events in the end state
  console.log(events);

  return (
    <Grid container spacing={0}>
      <Grid className={classes.mapView} item xs={9}>
        <div>Map view!</div>
      </Grid>
      <Grid className={classes.listView} item xs={3}>
        <div>Event list view!</div>
      </Grid>
    </Grid>
  );
}