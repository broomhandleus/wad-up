import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paymentContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'inherit'
  }
}));

interface props {
  children: React.ReactNode,
}

export default function PaymentInfo(props: props) {
  const classes = useStyles();

  return (
    <div className={classes.paymentContainer}>
      <Typography component="h1" variant="h5">
        Payment Info
      </Typography>
      <Typography component="h1" variant="subtitle1">
        Nothing yet. Move Along.
      </Typography>
      {props.children}
    </div>
  );
}
