import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { event } from '../types';
import EventCard from './EventCard';
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  listView: {
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  noEventContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    overflowY: "scroll",
    padding: "0px 8px"
  },
  footer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: "72px"
  },
  eventNumSelect: {
    minWidth: "125px"
  }
}));

interface props {
  events: event[];
  eventNum: number;
  setEventNum: Function;
}

export default function EventList(props: props) {
  const classes = useStyles();
  const events = props.events;
  const eventNum = props.eventNum;
  const setEventNum = props.setEventNum;

  const [page, setPage] = useState(1);

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

  const onEventNumChange = (event: any) => {
    console.log(JSON.stringify(event.target.value));
    setEventNum(event.target.value);
    // Need to reget events as well?
    // and reset to page 0?
  }

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    // this will retrigger getevents as well.
    setPage(value);
  }

  return (
    <div className={classes.listView}>
      <div className={classes.list}>
        {listEvents}
      </div>
      <div className={classes.footer}>
        <FormControl variant="outlined" className={classes.eventNumSelect}>
          <InputLabel id="event-num-label">Events per page</InputLabel>
          <Select
            labelId="event-num-label"
            id="event-num-select"
            value={eventNum}
            onChange={onEventNumChange}
            label="Events per page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Pagination count={10} page={page} onChange={onChangePage} size="small" color="primary" />
      </div>
    </div>
  )
}