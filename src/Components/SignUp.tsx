import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BasicInfo from './BasicInfo';
import UserType from './UserType';
import PaymentInfo from './PaymentInfo';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "16px",
    height: '650px',
    width: '552px',
    overflowY: 'scroll'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  stepperButtons: {
    margin: theme.spacing(3, 0, 2),
    width: '45%'
  },
  background: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  stepper: {
    width: "95%",
    paddingBottom: "16px"
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
}));

interface BasicInfo {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
}

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [isHost, setIsHost] = useState(false);
  const setIsHostInParent = (isNewHost: boolean) => {
    setIsHost(isNewHost);
  }
  const [activeStep, setActiveStep] = useState(0);
  const steps: string[] = ["User Type", "Basic Info", "Payment Info (Host only)"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const [basicInfo, setBasicInfo] = useState({
    username: '',
    password: '',
    passwordAgain: '',
    email: ''
  });
  // Passed to the children to get necessary information
  const setBasicInfoInParent = (basicInfo: BasicInfo) => {
    setBasicInfo(basicInfo);
  }
  const [disableNext, setDisableNext] = useState(true);
  const setNext = (disabled: boolean) => {
    setDisableNext(disabled);
  }

  let basicInfoButton;
  if (isHost) {
    basicInfoButton = (
      <Button
        variant="contained"
        color="primary"
        className={classes.stepperButtons}
        type="submit"
        disabled={disableNext}
      >
        Next
      </Button>
    )
  } else {
    basicInfoButton = (
      <Button
        variant="contained"
        color="primary"
        className={classes.stepperButtons}
        type="submit"
        disabled={disableNext}
      >
        Create Viewer
      </Button>
    )
  }

  const createUser = () => {
    // TODO: send an API call to post a new user to the DB
    console.log("Basic Info: " + JSON.stringify(basicInfo));
    console.log("Payment Info: Nothing yet!");
    // If API call successful, then go to page.
    history.push("/Main");
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="sm">
        <Slide in direction="left" mountOnEnter unmountOnExit>
          <Paper className={classes.paper} elevation={8}>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label} >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 &&
              <UserType handleNext={handleNext} setIsHost={setIsHostInParent}></UserType>
            }
            {activeStep === 1 &&
              <BasicInfo
                setNext={setNext}
                setBasicInfo={setBasicInfoInParent}
                handleNext={handleNext}
                basicInfo={basicInfo}
                isHost={isHost}
                createUser={createUser}
              >
                <div className={classes.buttonRow}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.stepperButtons}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                  {basicInfoButton}
                </div>
              </BasicInfo>
            }
            {activeStep === 2 &&
              <PaymentInfo>
                <div className={classes.buttonRow}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.stepperButtons}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.stepperButtons}
                    type="submit"
                    onClick={createUser}
                  >
                    Create Host
                  </Button>
                </div>
              </PaymentInfo>
            }
          </Paper>
        </Slide>
      </Container>
    </div>
  );
}