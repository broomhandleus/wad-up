import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import EventList from './EventList';
import MapView from './MapView';
import CustomToolbar from './CustomToolbar';

// Mock data imports
import { events } from '../mockData/event';
import L, { LatLngBounds } from 'leaflet';
import { event } from '../types';

// const useStyles = makeStyles((theme) => ({
//   title: {
//     flexGrow: 1,
//   },
//   toolbar: {
//     backgroundColor: '#00fa9a',
//     color: 'black',
//   }
// }));

// need to define an interface for the props if we use it
export default function Main() {
  // const classes = useStyles();
  // TODO: in the future this initial state is to be set by an initial API call
  const [eventMapState, setEventMapState] = useState({
    currentMapBounds: L.latLngBounds(L.latLng(16.0880, -126.9141), L.latLng(57.5630, -70.2246)), // set the bounds around the US first. not even used until a getEvents call
    currentEvents: events.slice(0, 5),
    currentEventNum: 5,
    currentEventPage: 1,
    totalEventPages: 2,
    currentCategories: ["Sporting", "Comedy", "Music", "Other"]
  })

  // method used to update overall state of the map and list
  const getEvents = (bounds?: LatLngBounds, eventNum?: number, eventPage?: number, categories?: string[]) => {
    console.log("Running Get Events!");
    let newEvents: event[] = [];
    const newCategories = categories ? categories : eventMapState.currentCategories;
    // Uses either the updated bounds from MapDetails or the current bounds if none are provided
    if (bounds) {
      events.forEach((e) => {
        if (e.location.latitude > bounds.getSouthWest().lat
            && e.location.latitude < bounds.getNorthEast().lat
            && e.location.longitude > bounds.getSouthWest().lng
            && e.location.longitude < bounds.getNorthEast().lng
            && newCategories.includes(e.category)) {
          newEvents.push(e);
        }
      });
    } else {
      events.forEach((e) => {
        if (e.location.latitude > eventMapState.currentMapBounds.getSouthWest().lat
            && e.location.latitude < eventMapState.currentMapBounds.getNorthEast().lat
            && e.location.longitude > eventMapState.currentMapBounds.getSouthWest().lng
            && e.location.longitude < eventMapState.currentMapBounds.getNorthEast().lng
            && newCategories.includes(e.category)) {
          newEvents.push(e);
        }
      });
    }

    // Uses given parameters to calculate number of pages possible and the current page to show
    const newEventNum = eventNum ? eventNum : eventMapState.currentEventNum;
    const newEventPage = eventPage ? eventPage : eventMapState.currentEventPage;
    const newTotalEventPages = Math.ceil(newEvents.length / newEventNum);
    const indexStart = newEventNum * (newEventPage - 1);
    const indexEnd = (newEventNum * (newEventPage - 1)) + newEventNum;

    // Updates the state correctly based on which values are passed in
    setEventMapState({
      currentMapBounds: bounds ? bounds : eventMapState.currentMapBounds,
      currentEvents: newEvents.slice(indexStart, indexEnd),
      currentEventNum: newEventNum,
      currentEventPage: newEventPage,
      totalEventPages: newTotalEventPages,
      currentCategories: newCategories
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomToolbar/>
      </Grid>
      <Grid item xs={9}>
        <MapView
          events={eventMapState.currentEvents}
          getEvents={getEvents}
        />
      </Grid>
      <Grid item xs={3}>
        <EventList
          events={eventMapState.currentEvents}
          eventNum={eventMapState.currentEventNum}
          eventPage={eventMapState.currentEventPage}
          totalEventPages={eventMapState.totalEventPages}
          categories={eventMapState.currentCategories}
          getEvents={getEvents}
        />
      </Grid>
    </Grid>
  );
}