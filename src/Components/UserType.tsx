import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  userButton: {
    margin: theme.spacing(2, 0, 2),
    minHeight: "48px",
  },
  title: {
    paddingBottom: "16px"
  },
  subtitle: {
    paddingTop: "16px"
  },
  typeContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%'
  },
  bullets: {
    paddingLeft: '20px'
  }
}));

interface props {
  handleNext:  Function,
  setIsHost: Function
}

export default function UserType(props: props) {
  const classes = useStyles();
  const handleNext = props.handleNext;
  const setIsHost = props.setIsHost;

  const onViewerClicked = () => {
    setIsHost(false);
    handleNext();
  }
  const onHostClicked = () => {
    setIsHost(true);
    handleNext();
  }

  return (
    <div className={classes.typeContainer}>
      <Typography className={classes.title} component="h1" variant="h5">
        Which user type would you like to be?
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onViewerClicked}
        className={classes.userButton}
        >
        Viewer
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onHostClicked}
        className={classes.userButton}
      >
        Host
      </Button>
      <Typography className={classes.subtitle} component="h2" variant="h6">
        What's the difference?
      </Typography>
      <ul className={classes.bullets}>
        <li>
          <Typography>
          <em>Viewers</em> use the application to find interesting events
          </Typography>
        </li>
        <li>
          <Typography>
            <em>Hosts</em> have the same ability as viewers to find events,
            with the added benefit of being able to create and post events themselves.
            In order to do so, <em>Hosts</em> must provide payment information which will be used upon event creation.
          </Typography>
        </li>
      </ul>
    </div>
  );
}
