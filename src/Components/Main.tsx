import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EventList from './EventList';
import MapView from './MapView';

// Mock data imports
import { events } from '../mockData/event';
import { LatLngBounds } from 'leaflet';
import { event } from '../types';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: '#00fa9a',
    color: 'black',
  }
}));

// need to define an interface for the props if we use it
export default function Main() {
  const classes = useStyles();
  const [eventNum, setEventNum] = useState(5);
  const [currentEvents, setCurrentEvents] = useState(events.slice(0, eventNum));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getEvents = (bounds: LatLngBounds) => {
    // TODO: later on this will be an API call to get events that will be handled on the backend. Use separate file to handle API calls
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
    setCurrentEvents(newEvents.slice(0, eventNum));
  }

  // TODO: Paginate the event list on the right? or just load more on scroll?
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              Wad Up
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={9}>
        <MapView events={currentEvents} getEvents={getEvents}></MapView>
      </Grid>
      <Grid item xs={3}>
        <EventList events={currentEvents} eventNum={eventNum} setEventNum={setEventNum}/>
      </Grid>
    </Grid>
  );
}