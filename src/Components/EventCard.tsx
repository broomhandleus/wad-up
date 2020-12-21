import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { event } from '../types';
import { StarBorder, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "8px 0px"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

interface props {
  event: event;
}

// TODO: add method to the Interested Button. Change it to filled when interested
// This would trigger an API call to increment the interestShown on that event
// TODO: add in extra elements to the collapse area
// TODO: Different cards somehow based on event type (border maybe?)
export default function EventCard(props: props) {
  const classes = useStyles();
  const event = props.event;

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let collapseTitle = "Show more"
  if (expanded) {
    collapseTitle = "Show Less";
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={event.name}
        subheader={event.datetime}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Interested" placement="right">
          <IconButton aria-label="Interested">
            <StarBorder/>
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