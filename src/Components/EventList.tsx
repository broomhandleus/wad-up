import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {event} from '../types';
import EventCard from './EventCard';

const useStyles = makeStyles((theme) => ({
  list: {
    width: "95%"
  }
}));

interface props {
  events: event[];
}

export default function EventList(props: props) {
  const classes = useStyles();
  const events = props.events;
  console.log(events);
  const listEvents = events.map((e) =>
    <EventCard event={e} key={e._id}/>
  )

  return (
    <div className={classes.list}>{listEvents}</div>
  )
}