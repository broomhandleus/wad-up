import React, { useState } from 'react';
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


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "16px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  emailRow: {
    display: "flex",
    alignItems: "center",
  },
  emailBox: {
    flexGrow: 9
  },
  helpIcon: {
    flexGrow: 1,
    paddingBottom: "16px"
  },
  stepper: {
    width: "95%",
    paddingBottom: "0px"
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

interface basicInfo {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
}

export default function SignUp() {
  const classes = useStyles();
  const [isHost, setIsHost] = useState(false);
  const setIsHostInParent = (isNewHost: boolean) => {
    setIsHost(isNewHost);
  }
  const [activeStep, setActiveStep] = useState(0);
  const steps: string[] = ["User type", "Basic Info", "Payment Info (Event Host only)", "Confirm Info"];

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
  const setBasicInfoInParent = (basicInfo: basicInfo) => {
    setBasicInfo(basicInfo);
  }
  const [disableNext, setDisableNext] = useState(true);
  const setNext = (disabled: boolean) => {
    setDisableNext(disabled);
  }

  // TODO: Complete the confirm info view
  // TODO: skip payment info if not a host - if is host, just put a button on the page for now to move on
  // TODO: confirm view should have back/create user button. then it should take them to Main or back to login?
  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="sm">
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
            <BasicInfo setNext={setNext} setBasicInfo={setBasicInfoInParent} handleNext={handleNext}>
              <div className={classes.buttonRow}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.stepperButtons}
                  type="submit"
                  onClick={handleBack}
                >
                  back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.stepperButtons}
                  type="submit"
                  disabled={disableNext}
                >
                  Next
                </Button>
              </div>
            </BasicInfo>
          }
        </Paper>
      </Container>
    </div>
  );
}