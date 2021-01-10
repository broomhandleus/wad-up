import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { event } from '../types';
import EventCard from './EventCard';
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Paper,
  Grid,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  listView: {
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    overflowY: "scroll",
    padding: "0px 8px"
  },
  headerFooter: {
    display: "flex",
    alignItems: "center",
    minHeight: "80px",
  },
  eventNumSelect: {
    minWidth: "125px"
  },
  categorySelect: {
    minWidth: "250px"
  }
}));

const categoryOptions = [
  "Sporting",
  "Comedy",
  "Music",
  "Other"
]

interface props {
  events: event[];
  eventNum: number;
  eventPage: number;
  totalEventPages: number;
  categories: string[];
  getEvents: Function;
}

export default function EventList(props: props) {
  const classes = useStyles();
  const events = props.events;
  const eventNum = props.eventNum;
  const eventPage = props.eventPage;
  const totalEventPages = props.totalEventPages;
  const getEvents = props.getEvents;
  const categories = props.categories;

  let listEvents;
  if (events.length > 0) {
    listEvents = events.map((e) =>
      <EventCard event={e} key={e._id}/>
    )
  } else {
    listEvents = (
      <div className={classes.justifyCenter}>
        <h4>There are no events within this area!</h4>
        <SentimentVeryDissatisfied></SentimentVeryDissatisfied>
      </div>
    );
  }

  const onEventNumChange = (event: any) => {
    getEvents(undefined, event.target.value);
  }
  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    getEvents(undefined, undefined, value);
  }
  const onCategoryChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
    getEvents(undefined, undefined, undefined, event.target.value);
  }

  return (
    <div className={classes.listView}>
      <Paper elevation={4} square>
        <Grid container className={classes.headerFooter}>
          <Grid item xs={12} className={classes.justifyCenter}>
            <FormControl variant="outlined" className={classes.categorySelect}>
              <InputLabel id="category-label">Categories</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                multiple
                value={categories}
                onChange={onCategoryChanged}
                renderValue={(selected) => (selected as string[]).join(', ')}
                label="Categories"
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={categories.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.list}>
        {listEvents}
      </div>
      <Paper elevation={8}>
        <Grid container className={classes.headerFooter}>
          <Grid item xs={4} className={classes.justifyCenter}>
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
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} className={classes.justifyCenter}>
            <Pagination count={totalEventPages} page={eventPage} onChange={onChangePage} size="small" color="primary" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}