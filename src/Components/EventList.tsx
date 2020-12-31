import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {event} from '../types';
import EventCard from './EventCard';
import { SentimentVeryDissatisfied } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  list: {
    width: "95%",
  },
  noEventContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

interface props {
  events: event[];
}

export default function EventList(props: props) {
  const classes = useStyles();
  const events = props.events;
  let listEvents;
  if (events.length > 0) {
    listEvents = events.map((e) =>
      <EventCard event={e} key={e._id}/>
    )
  } else {
    listEvents = (
      <div className={classes.noEventContainer}>
        <h4>There are no events within this area!</h4>
        <SentimentVeryDissatisfied></SentimentVeryDissatisfied>
      </div>
    );
  }

  return (
    <div className={classes.list}>{listEvents}</div>
  )
}