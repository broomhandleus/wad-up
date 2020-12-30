import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { event, EventCategory } from '../types';
import { StarBorder, ExpandMore, Share, Star } from '@material-ui/icons';

var faker = require('faker');

const useStyles = makeStyles((myTheme) => ({
  card: {
    margin: "8px 0px",
    elevation: 24,
  },
  sportingEvent: {
    borderLeft: "6px solid orange"
  },
  musicEvent: {
    borderLeft: "6px solid green"
  },
  comedyEvent: {
    borderLeft: "6px solid purple"
  },
  otherEvent: {
    borderLeft: "6px solid gray"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: myTheme.transitions.create('transform', {
      duration: myTheme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  media: {
    height: 0,
    paddingTop: '40%', // 16:9
  },
  filledStar: {
    color: "gold",
  }
}));

interface props {
  event: event;
}

// TODO: add in extra elements to the collapse area
export default function EventCard(props: props) {
  const classes = useStyles();
  const event = props.event;

  // Handles everything with the collapsable window
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let collapseTitle = "Show more"
  if (expanded) {
    collapseTitle = "Show Less";
  }

  // Handles everything with the interested button. will need api call eventually
  const [interested, setInterested] = React.useState(false);
  const handleInterestedClick = () => {
    setInterested(!interested);
  };
  let interestedIcon;
  if (interested) {
    interestedIcon = <Star className={classes.filledStar}/>
  } else {
    interestedIcon = <StarBorder/>
  }

  // There's probably a better way to do those conditional border classes. think on that.
  return (
    <Card className={clsx(classes.card, {
        [classes.sportingEvent]: event.category === EventCategory.sporting,
        [classes.musicEvent]: event.category === EventCategory.music,
        [classes.comedyEvent]: event.category === EventCategory.comedy,
        [classes.otherEvent]: event.category === EventCategory.other,
      })} elevation={4}>
      <CardHeader
        title={event.name}
        subheader={event.datetime}
      />
      <CardMedia
        className={classes.media}
        image={faker.image.image()}
        title="Faked image"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Interested" placement="right">
          <IconButton aria-label="Interested" onClick={handleInterestedClick}>
            {interestedIcon}
          </IconButton>
        </Tooltip>
        <Tooltip title="Share" placement="right">
          <IconButton aria-label="Share">
            <Share/>
          </IconButton>
        </Tooltip>
        <Tooltip title={collapseTitle} placement="left">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore/>
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <Typography variant="body2" component="p">
            Location: {event.locationName}
          </Typography>
          <Typography variant="body2" component="p">
            Event Type: {event.category}
          </Typography>
          <Typography variant="body2" component="p">
            Age Limitations: {event.ageLimit}
          </Typography>
          <Typography variant="body2" component="p">
            Drinking: {event.drinking.toString()}
          </Typography>
          <Typography variant="body2" component="p">
            Smoking: {event.smoking.toString()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}